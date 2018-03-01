const sql = require('mssql');

const dataConnection = require('../database/index').dataConnection;
const queries = require('../common/queries');
const Player = require('../models/player');
const utils = require('../common/utils');

const checkIfPlayerExists = playerNameLower =>
  new Promise((resolve, reject) => {
    Player.findOne({ playerNameLower }).exec()
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

const getPlayerByName = playerNameLower =>
  new Promise((resolve, reject) => {
    Player.findOne({ playerNameLower }).exec()
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
  checkIfPlayerExists(playerName.toLowerCase())
    .then((exists) => {
      res.json(exists);
    })
    .catch((err) => {
      res.json(err);
    });
};

const handleGetMatchesResponse = matches => matches.map((match) => {
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
  console.log(req.query.playerName, req.query.page);
  console.log(req.headers['x-forwarded-for']);
  console.log(req.connection.remoteAddress);

  const playerName = req.query.playerName ? req.query.playerName.toLowerCase() : '';

  if (typeof playerName === 'undefined' || playerName === null) {
    res.json("No player name provided");
  }

  const page = req.query.page ? req.query.page : 0;

  console.time('mongo call');
  getPlayerByName(playerName.toLowerCase())
    .then((player) => {
      console.timeEnd('mongo call');
      if (player !== null) {
        const playerId = player.playerCode;
        console.time('azure call');
        new sql.Request(dataConnection).query(queries.getCharacterGames(playerId, page))
          .then((matches) => {
            console.timeEnd('azure call');
            console.time('mappings');
            const response = handleGetMatchesResponse(matches.recordset);
            console.timeEnd('mappings');
            res.json(response);
          })
          .catch((err) => {
            console.timeEnd('azure call');
            res.json(err);
          });
      } else {
        res.json("Player doesn't exist");
      }
    })
    .catch((err) => {
      console.timeEnd('mongo call');
      res.json(err);
    });
};

module.exports = {
  checkIfPlayerExistsApi,
  getMatchesApi,
};
