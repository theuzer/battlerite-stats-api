const sql = require('mssql');

const Player = require('../models/player');

const checkIfPlayerExists = playerName =>
  new Promise((resolve, reject) => {
    Player.findOne({ playerName }).exec()
      .then((player) => {
        if (player !== null) {
          resolve(true);
        } else {
          resolve(null);
        }
      })
      .catch((err) => {
        reject(err);
      });
  });

const getPlayerByName = playerName =>
  new Promise((resolve, reject) => {
    Player.findOne({ playerName }).exec()
      .then((player) => {
        if (player !== null) {
          resolve(player);
        } else {
          resolve(null);
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

const getMatches = (req, res) => {
  const playerName = req.query.playerName;
  const offset = req.query.page;

  getPlayerByName(playerName)
    .then((response) => {
      if (response !== null) {
        const playerId = response.playerCode;
        res.json(playerId);
      } else {
        res.json("Player doesn't exist");
      }
    })
    .catch((err) => {
      res.json(err);
    });
};

module.exports = {
  checkIfPlayerExistsApi,
  getMatches,
};
