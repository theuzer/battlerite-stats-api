const express = require('express');
const https = require('https');

const routes = require('./routes/index');
require('./database/index');

const port = process.env.PORT || 3000;

const app = express();

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/test', (req, res) => {
  res.send('hi');
});

app.use('/', routes);

app.listen(port, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log(`Server listening on port ${port}`);
  }
});

// KEEP APP AWAKE
if (process.env.HEROKU_TIMER_CREATE === 'TRUE') {
  setInterval(() => {
    https.get(process.env.HEROKU_APP_URL);
    https.get(process.env.HEROKU_APP_URL_2);
    console.log('Pinged application');
  }, parseInt(process.env.HEROKU_APP_TIMER, 10));
}

const Player = require('./models/player');
const PlayerIndexed = require('./models/playerIndexed');

app.get('/test2', (req, res) => {
  res.send('a');
  Player.find({}).exec()
    .then((response) => {
      console.log(1);
      console.log(response[0]);
      response.forEach((player) => {
        const newP = new PlayerIndexed();
        newP.playerCode = player.playerCode;
        newP.playerName = player.playerName;
        newP.save((err) => {
          if (err) {
            console.log(err);
          }
        });
      });
    })
    .catch((err) => {
      console.log(err);
    });
});
