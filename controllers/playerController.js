const sql = require('mssql');

const dataConnection = require('../database/index').dataConnection;
const queries = require('../common/queries');
const Player = require('../models/player');
const utils = require('../common/utils');

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

const handleGetMatchesResponse = matches => matches.map((match) => {
  console.log(match);
  const processedMatchInformation = utils.getMatchInformation(match);
  return {
    id: match.Id,
    playerCode: match.PlayerCode,
    teamCode: match.TeamCode,
    champion: processedMatchInformation.champion,
    loadout: processedMatchInformation.loadout,
    map: processedMatchInformation.map,
    win: match.Win,
    isRanked: match.IsRanked,
    mode: match.Mode,
    numberOfRounds: match.NumberOfRounds,
    dateCreated: match.DateCreated,
    stats: {
      abilityUses: match.AbilityUses,
      damageDone: match.DamageDone,
      damageReceived: match.DamageReceived,
      deaths: match.Deaths,
      disablesDone: match.DisablesDone,
      disablesReceived: match.DisablesReceived,
      energyGained: match.EnergyGained,
      energyUsed: match.EnergyUsed,
      healingDone: match.HealingDone,
      healingReceived: match.HealingReceived,
      kills: match.Kills,
      score: match.Score,
      timeAlive: match.TimeAlive,
    },
  };
});

const getMatchesApi = (req, res) => {
  const playerName = req.query.playerName;
  const page = req.query.page ? req.query.page : 0;

  getPlayerByName(playerName)
    .then((player) => {
      if (player !== null) {
        const playerId = player.playerCode;
        new sql.Request(dataConnection).query(queries.getCharacterGames(playerId, page))
          .then((matches) => {
            console.log(matches.recordset);
            const response = handleGetMatchesResponse(matches.recordset);
            res.json(response);
          })
          .catch((err) => {
            res.json(err);
          });
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
  getMatchesApi,
};
