const express = require('express');
const app = express();
const { MongoClient } = require('mongodb');
const cfg = require('./dbConfig.json');
const dbURL = `mongodb+srv://${cfg.userName}:${cfg.password}@${cfg.hostname}`;
const client = new MongoClient(dbURL);
const db = client.db('startup');
const total = 'everything';
const totalCollection = db.collection(total);
const port = 4000;
const MAX_SAFE_INTEGER = 9007199254740991;
////////////////////////////////////////////////////////////////////////////////////////////////

(async function testConnection() {
  await client.connect();
  await db.command({ ping: 1 });
})().catch((ex) => {
  console.log(`Unable to connect to database with ${url} because ${ex.message}`);
  process.exit(1);
});

async function addEverything(obj) {
  const result = await totalCollection.insertOne(obj);
  return result;
}

async function getBucks(curJSON){
  let curObj = JSON.parse(curJSON);
  let check = curObj.name;
  let query = {name: '${check}'};
  let options = {};
  ///// ERROR, check and query are not binding
  const result = await totalCollection.findOne( query, options);
  result = JSON.stringify(result);
  return result;
}

function getHighScores() {
  const query = { bucks: { $gt: 0, $lt: MAX_SAFE_INTEGER} };
  const options = {
    sort: { score: -1 },
    limit: 10,
  };
  const cursor = scoreCollection.find(query, options);
  return cursor.toArray();
}

////////////////////////////////////////////////////////////////////////////////////////////////

app.use(express.static('public'));

app.use(express.json());

const apiRouter = express.Router();
app.use(`/api`, apiRouter);


//Getters

apiRouter.get('/bucks', async (_req, res) => {
  //Somehow get user's specific userName
  //const bucks = await DB.getBucks();
  res.send(bucks);
});

apiRouter.get('/suspensions', (_req, res) => {
  res.send(suspension);
});

apiRouter.get('/scoreboards', (_req, res) => {
  updateSB_BK(null); //To be replaced when DB exists
  res.send(SB);
});

apiRouter.get('/dbs', async (_req, res) => {
  const bucks = await DB.getHighScores();
  res.send(bucks);
});

// Setters

apiRouter.post('/buck', async (req, res) => {
  let curJSON = await db.getBucks(req.body);
  let bucks = updateBucks(req.body);
  let curObj = JSON.parse(curJSON);
  curObj.val = bucks.val;
  curJSON = JSON.stringify(curObj);

  res.send(curJSON);
});

apiRouter.post('/suspended', (req, res) => {
    let scores = updateSuspension(req.body);
    res.send(suspension);
  });

apiRouter.post('/scoreboard', (req, res) => {
  let scores = updateSB(req.body);
  res.send(SB);
});

apiRouter.post('/register', (req, res) => {
  let user = addUser(req.body);
  res.send(req.body);
});

// Edge

app.use((_req, res) => {
  res.sendFile('index.html', { root: 'public' });
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});


// Logic

let suspension = [];
function updateSuspension(newSus){
    let suspension = newSus;
    return suspension;
}
let bucks = [];
function updateBucks(newBucks) {
  let bucks = newBucks;
  return bucks;
}

let SB = []; //ScoreBoard will be pull from database and list top 10, the values below are filler
function updateSB_BK(SBobj){
  let SB = SBobj;
  ///The following code is filler
  SB = {
    user1: [99999, "Alpha"],
    user2: [99998, "Beta"],
    user3: [99997, "Gamma"],
    user4: [99996, "Delta"],
    user5: [99995, "Epsilon"],
    user6: [99994, "Zeta"],
    user7: [99993, "Eta"],
    user8: [99992, "Theta"],
    user9: [99991, "Iota"],
    user0: [99990, "Kappa"],
 }
 return JSON.stringify(SB);
}


let user = [];
function addUser(userObj){
  let user1 = userObj;
  return user1;
}