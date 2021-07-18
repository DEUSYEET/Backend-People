const express = require('express');
const app = express();
const port = 3001;

app.get('/', (req, res) => {
    res.send('Nope. Use /api');
});

app.use(function(req, res, next) {
    // console.log(req.headers)
    //NOTE: DO NOT PUT '/' AT END OF URL
    res.header("Access-Control-Allow-Origin", "http://localhost:4200");
    // res.header("Access-Control-Allow-Origin", "http://localhost:3001/");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

const routes = require("./routes");

routes(app);

app.listen(3001, () => {
    console.log('App listening on port 3001!');
});