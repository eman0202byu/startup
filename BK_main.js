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

  apiRouter.get('/suspension', (_req, res) => {
    res.send(suspension);
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


// Edge

app.use((_req, res) => {
  res.sendFile('index.html', { root: 'public' });
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});


// Logic

let suspension = 0;
function updateSuspension(newSus){
    suspension = newSus;
    return suspension;
}
let bucks = 0;
function updateBucks(newBucks) {
  bucks = newBucks;
  return bucks;
}
