const express = require('express');
const app = express();

const port = process.argv.length > 2 ? process.argv[2] : 3000;

app.use(express.static('public'));

app.use(express.json());

var apiRouter = express.Router();
app.use(`/api`, apiRouter);

apiRouter.get('/bucks', (_req, res) => {
    res.send(bucks);
  });


apiRouter.post('/buck', (req, res) => {
  scores = updateBucks(req.body, scores);
  res.send(bucks);
});


app.use((_req, res) => {
  res.sendFile('index.html', { root: 'public' });
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});


let bucks = 0;
function updateBucks(newBucks) {
  bucks = newBucks;
}
