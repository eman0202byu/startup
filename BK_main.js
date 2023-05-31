const express = require('express');
const app = express();

const port = process.argv.length > 2 ? process.argv[2] : 3000;

app.use(express.static('public'));

app.use(express.json());

const apiRouter = express.Router();
app.use(`/api`, apiRouter);


//Getters

apiRouter.get('/bucks', (_req, res) => {
    res.send(bucks);
  });

  apiRouter.get('/suspensions', (_req, res) => {
    res.send(suspension);
  });

  apiRouter.get('/scoreboards', (_req, res) => {
    updateSB_BK(null); //To be replaced when DB exists
    res.send(SB);
  });


// Setters

apiRouter.post('/buck', (req, res) => {
  scores = updateBucks(req.body);
  res.send(bucks);
});

apiRouter.post('/suspended', (req, res) => {
    scores = updateSuspension(req.body);
    res.send(suspension);
  });

apiRouter.post('/scoreboard', (req, res) => {
  scores = updateSB(req.body);
  res.send(SB);
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
    suspension = newSus;
    return suspension;
}
let bucks = [];
function updateBucks(newBucks) {
  bucks = newBucks;
  return bucks;
}

let SB = []; //ScoreBoard will be pull from database and list top 10, the values below are filler
function updateSB_BK(SBobj){
  SB = SBobj;
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