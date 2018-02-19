const Player = require('../models/player');

exports.checkIfPlayerExists = playerCode =>
  new Promise((resolve, reject) => {
    Player.findOne({ playerCode }).exec()
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

exports.getAllPlayers = () =>
  new Promise((resolve, reject) => {
    Player.find().exec()
      .then((players) => {
        resolve(players);
      })
      .catch((err) => {
        reject(err);
      });
  });
