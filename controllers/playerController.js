const Player = require('../models/player');

const checkIfPlayerExists = playerName =>
  new Promise((resolve, reject) => {
    Player.findOne({ playerName }).exec()
      .then((player) => {
        if (player !== null) {
          resolve(true);
        } else {
          resolve(false);
        }
      })
      .catch((err) => {
        reject(err);
      });
  });

const checkIfPlayerExistsApi = (req, res) => {
  const playerName = req.query.playerName;
  checkIfPlayerExists(playerName)
    .then((exists) => {
      res.json(exists);
    })
    .catch((err) => {
      res.json(err);
    });
};

module.exports = {
  checkIfPlayerExistsApi,
};
