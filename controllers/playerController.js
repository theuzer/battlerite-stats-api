const sql = require('mssql');

const dataConnection = require('../database/index').dataConnection;
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
        new sql.Request(dataConnection).query("select * from character where playerCode ="+playerId)
          .then((response) => {
            res.json(response);
          })
          .catch((err) => {
            res.json(err);
          })
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
