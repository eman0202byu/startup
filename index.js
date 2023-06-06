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
////////////////////////////////////////////////////////////////////////////////////////////////

(async function testConnection() {
  await client.connect();
  await db.command({ ping: 1 });
})().catch((ex) => {
  console.log(`Unable to connect to database with ${dbURL} because ${ex.message}`);
  process.exit(1);
});

async function addEverything(curJSON) {
  const result = await totalCollection.insertOne(curJSON);
  return result;
}

async function checkEverything(curJSON){
  let curObj = JSON.parse(curJSON);
  let check = curObj.name;
  let query = {name: `${check}`};
  let options = {};
  const result = await totalCollection.findOne(query, options);

  if(result== EXIST){
    return 'USER_EXIST';
  }
  else{
    return addEverything(curJSON);
  }
}

async function findEverything(curJSON){
  let curObj = JSON.parse(curJSON);
  let check = curObj.name;
  let query = {name: `${check}`};
  let options = {};
  const result = await totalCollection.findOne(query, options);

  if(result== EXIST){
    return true;
  }
  else{
    return false;
  }
}

async function updateEverything(curJSON){
  let curObj = JSON.parse(curJSON);
  let check = curObj.name;
  let query = {name: `${check}`};
  let options = {};
  const result = await totalCollection.findOne(query, options);

  if(result !== null){
    ////update result
    return result;
  }
  else{
    return addEverything(curJSON);
  }
}

async function getEverything(curJSON){
  let curObj = JSON.parse(curJSON);
  let check = curObj.name;
  let query = {name: `${check}`};
  let options = {};
  const result = await totalCollection.findOne(query, options);
  result = JSON.stringify(result);
  return result;
}

async function getBucks(curJSON){
  let curObj = JSON.parse(curJSON);
  let check = curObj.name;
  let query = {name: `${check}`};
  let options = {};
  const result = await totalCollection.findOne(query, options);
  result = JSON.stringify(result);
  return result;
}

function getHighScores() {
  const query = { val: { $gt: 0, $lt: MAX_SAFE_INTEGER} };
  const options = {
    sort: { val: -1 },
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

apiRouter.get('/scoreboards', async (_req, res) => {
  let SB = await getHighScores();
  res.send(SB);
});

apiRouter.get('/dbs', async (_req, res) => {
  ////Somehow magically know what user exists and then put their JSON into getEverything() /// Use cookies to create user login.
  const userJSON = await getEverything();
  res.send(userJSON);
});

apiRouter.post('/login', async (req, res) => {
  let result = await findEverything(req);
  res.send(result);
});

// Setters
apiRouter.post('/db', async (req, res) => {
  let result = await updateEverything(req.body);
  res.send(result);
});

apiRouter.post('/register', async (req, res) => {
  let curObj = JSON.parse(req.body);
  let userName = curObj.name;
  let userPass = curObj.password
  let newUser = {
    name: userName,
    pass: userPass,
    status: 0,
    val: 0,
  }
  let userJSON = JSON.stringify(newUser);
  let result = await checkEverything(userJSON);
  if(result !== 'USER_EXIST'){
    res.send(userJSON);
  }else{
    res.send('USER_EXIST');
  }
});

// Edge

app.use((_req, res) => {
  res.sendFile('index.html', { root: 'public' });
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});