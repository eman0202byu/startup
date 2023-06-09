const express = require('express');
const app = express();
const { MongoClient } = require('mongodb');
const cfg = require('./dbConfig.json');
const dbURL = `mongodb+srv://${cfg.userName}:${cfg.password}@${cfg.hostname}`;
const client = new MongoClient(dbURL);
const db = client.db('startup');
const total = 'total';
const totalCollection = db.collection(total);
const port = 4000;
const MAX_SAFE_INTEGER = 9007199254740991;
const cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt');
const authCookieName = 'token';
const uuid = require('uuid');
const { WebSocketServer } = require('ws');
////////////////////////////////////////////////////////////////////////////////////////////////

(async function testConnection() {
  await client.connect();
  await db.command({ ping: 1 });
})().catch((ex) => {
  console.log(`Unable to connect to database with ${dbURL} because ${ex.message}`);
  process.exit(1);
});

async function addEverything(curJSON) {
  curObj = JSON.parse(curJSON);
  const result = await totalCollection.insertOne(curObj);
  return result;
}

async function checkEverything(curJSON){
  let curObj = JSON.parse(curJSON);
  let check = curObj.name;
  let query = {name: `${check}`};
  let options = {};
  const result = await totalCollection.findOne(query, options);
  if(result !== null){
    return 'USER_EXIST';
  }
  else{
    addEverything(curJSON)
    return curJSON;
  }
}

async function findEverything(curObj){
  let check = curObj.name;
  let query = {name: `${check}`};
  let options = {};
  const result = await totalCollection.findOne(query, options);
  if(result !== null){
    return result;
  }
  else{
    return null;
  }
}

async function updateEverything(curObj){
  let check = curObj.token;
  let query = {token: `${check}`};
  let options = {};

  // ///////////////////////// WebSocket
  // if(curObj.status == 1){
  //   playerSuspended((JSON.stringify(curObj)));
  // }
  // ////////////////////////

  const result = await totalCollection.findOne(query, options);
  if(result !== null){
    const updateDoc = {
      $set: {
        status: curObj.status,
        val: curObj.val,
      },
    };
    const result2 = await totalCollection.updateOne(query, updateDoc)
    return curObj;
  }
  else{
    console.log("ERROR HAS OCCOURED WITH updateEverything");
    //return addEverything(curJSON);
  }
}

async function getEverything(curObj){
  let check = curObj.token;
  let query = {token: `${check}`};
  let options = {};
  const result = await totalCollection.findOne(query, options);
  //result = JSON.stringify(result);
  return result;
}

function getHighScores() {
  const query = { val: { $gt: 0, $lt: MAX_SAFE_INTEGER}, status: { $not: { $eq: 1 } } };
  const options = {
    sort: { val: -1 },
    limit: 10,
  };
  const cursor = totalCollection.find(query, options);
  return cursor.toArray();
}

////////////////////////////////////////////////////////////////////////////////////////////////

app.use(express.static('public'));

app.use(express.json());

app.use(cookieParser());

const apiRouter = express.Router();
app.use(`/api`, apiRouter);

//Getters

apiRouter.get('/scoreboards', async (_req, res) => {
  let SB = await getHighScores();
  res.send(SB);
});

apiRouter.get('/dbs', async (_req, res) => {
  const userJSON = await getEverything(_req.cookies.token);
  res.send(userJSON);
});

apiRouter.post('/login', async (req, res) => {
  let result = await findEverything(req.body);
  if(result != null){
  if (await bcrypt.compare(req.body.pass, result.pass)) {
    setAuthCookie(res, result);
    res.send(result);
    return;
  }
}
  res.status(401).send({ msg: 'Unauthorized' });
});

// Setters
apiRouter.post('/db', async (req, res) => {
  let result = await updateEverything(req.body);
  res.send(result);
});

apiRouter.post('/register', async (req, res) => {
  let curObj = req.body;
  let userName = curObj.name;
  const passwordHash = await bcrypt.hash(curObj.pass, 10);
  let newUser = {
    name: userName,
    pass: passwordHash,
    status: 0,
    val: 0,
    token: uuid.v4(),
  }
  let userJSON = JSON.stringify(newUser);
  let result = await checkEverything(userJSON);
  if(result !== 'USER_EXIST'){
    setAuthCookie(res, newUser);
    res.send(userJSON);
  }else{
    res.send('USER_EXIST');
  }
});

// Edge

function setAuthCookie(res, authToken) {
  res.cookie(authCookieName, authToken, {
    secure: true,
    httpOnly: true,
    sameSite: 'strict',
  });
}


/////////////////////////////////////////////////////////////

app.use((_req, res) => {
  res.sendFile('index.html', { root: 'public' });
});

const httpsService = app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});


////WebSocket

function peerProxy(httpServer) {
  // Create a websocket object
  const wss = new WebSocketServer({ noServer: true });

  // Handle the protocol upgrade from HTTP to WebSocket
  httpServer.on('upgrade', (request, socket, head) => {
    wss.handleUpgrade(request, socket, head, function done(ws) {
      wss.emit('connection', ws, request);
    });
  });

  // Keep track of all the connections so we can forward messages
  let connections = [];

  wss.on('connection', (ws) => {
    const connection = { id: uuid.v4(), alive: true, ws: ws };
    connections.push(connection);

    // Forward messages to everyone except the sender
    ws.on('message', function message(data) {
      connections.forEach((c) => {
        if (c.id !== connection.id) {
          c.ws.send(data);
        }
      });
    });

    // Remove the closed connection so we don't try to forward anymore
    ws.on('close', () => {
      connections.findIndex((o, i) => {
        if (o.id === connection.id) {
          connections.splice(i, 1);
          return true;
        }
      });
    });

    // Respond to pong messages by marking the connection alive
    ws.on('pong', () => {
      connection.alive = true;
    });
  });

  // Keep active connections alive
  setInterval(() => {
    connections.forEach((c) => {
      // Kill any connection that didn't respond to the ping last time
      if (!c.alive) {
        c.ws.terminate();
      } else {
        c.alive = false;
        c.ws.ping();
      }
    });
  }, 10000);

}
peerProxy(httpsService);