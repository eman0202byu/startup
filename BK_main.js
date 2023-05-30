const express = require('express');
const app = express();

app.use(express.static('public'));

app.listen(8080, () => console.log("alive"));



// ROUTING
// app.get('/store/:id/:time', (req, res) => {
//     res.send({ id: req.params.id, time: req.params.time });
//    });
   
//    app.put('/*/:id', (req, res) => {
//     res.send({ update: req.params.id })
//    });
   
//    app.delete(/\/store\/(.+)/, (req, res) => {
//     res.send({ delete: req.params[0] })
//    });

// const userRouter = express.Router();
// app.use('/user', userRouter);

// userRouter.get('/:id', (req, res) => {
// res.send('User Page')
// });



// ORDER MATTERS
// app.use(function (req, res, next) {
//     console.log('taco');
//     next();
//    });
   
//    app.get('/store/:id', (req, res, next) => {
//     console.log(req.params.id);
//    });
   
//    app.get('/*', (req, res) => {
//     console.log('burger');
//    });
   
// ERROR HANDLING
// app.get('/', (req, res) => {
//     throw new Error('Help!');
//    });
   
//    app.use(function (err, req, res, next) {
//     console.error(err.stack);
//     res.status(500).send('Trouble!');
//    });

// RESPONSES
// res.send('simple text')

// res.send({ x: '3', y: 4 })

// res.send('<p>Some <b>html</b></p>')

// res.redirect(301, 'https://cs260.click')}

// res.sendFile('public/hello.html')}

// res.status(400).send('trouble in River City')}

// Daemons
// pm2 ls
// cd ~/services/appname
// pm2 start index.js -n appname -- 5501
// pm2 save