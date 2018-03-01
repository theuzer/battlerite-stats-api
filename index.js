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

const ontime = require('ontime');
const sql = require('mssql');
const Player = require('./models/player');
const dataConnection = require('./database/index').dataConnection;
const queries = require('./common/queries');

ontime({
  cycle: ['0', '10', '20', '30', '40', '50'],
}, (ot) => {
  Player.count().exec((err, count) => {
    const random = Math.floor(Math.random() * count);

    Player.findOne().skip(random).exec()
      .then((result) => {
        console.log('test api', result.playerCode, result.playerName);
        console.time('test api');
        const q = queries.getCharacterGames(result.playerCode, 0);
        new sql.Request(dataConnection).query(q)
          .then(() => {
            console.log('test api', 1);
            console.timeEnd('test api');
          })
          .catch(() => {
            console.log('test api', 2);
            console.timeEnd('test api');
          });
      });
  });
  ot.done();
});
