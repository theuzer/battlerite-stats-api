const mongoose = require('mongoose');

const Stats = require('../models/stats');
const Log = require('../models/log');
const utils = require('../common/utils');

const noResultsFound = {
  response: 'no results found',
};

const getWinsLossesByChampion = (championStats, mode, isRanked) => {
  if (mode === null && isRanked === null) {
    return championStats.reduce((b, c) =>
      ({
        wins: b.wins + c.duoRanked.wins + c.duoNormal.wins + c.trioNormal.wins + c.trioRanked.wins,
        losses: b.losses + c.duoRanked.losses + c.duoNormal.losses + c.trioNormal.losses + c.trioRanked.losses,
        gamesCount: b.gamesCount + c.duoRanked.gamesCount + c.duoNormal.gamesCount + c.trioNormal.gamesCount + c.trioRanked.gamesCount,
        roundsCount: b.roundsCount + c.duoRanked.roundsCount + c.duoNormal.roundsCount + c.trioNormal.roundsCount + c.trioRanked.roundsCount,
        abilityUses: b.abilityUses + c.duoRanked.abilityUses + c.duoNormal.abilityUses + c.trioNormal.abilityUses + c.trioRanked.abilityUses,
        damageDone: b.damageDone + c.duoRanked.damageDone + c.duoNormal.damageDone + c.trioNormal.damageDone + c.trioRanked.damageDone,
        damageReceived: b.damageReceived + c.duoRanked.damageReceived + c.duoNormal.damageReceived + c.trioRanked.damageReceived + c.trioNormal.damageReceived,
        deaths: b.deaths + c.duoRanked.deaths + c.duoNormal.deaths + c.trioRanked.deaths + c.trioNormal.deaths,
        disablesDone: b.disablesDone + c.duoRanked.disablesDone + c.duoNormal.disablesDone + c.trioRanked.disablesDone + c.trioNormal.disablesDone,
        disablesReceived: b.disablesReceived + c.duoRanked.disablesReceived + c.duoNormal.disablesReceived + c.trioRanked.disablesReceived + c.trioNormal.disablesReceived,
        energyGained: b.energyGained + c.duoRanked.energyGained + c.duoNormal.energyGained + c.trioRanked.energyGained + c.trioNormal.energyGained,
        energyUsed: b.energyUsed + c.duoRanked.energyUsed + c.duoNormal.energyUsed + c.trioRanked.energyUsed + c.trioNormal.energyUsed,
        healingDone: b.healingDone + c.duoRanked.healingDone + c.duoNormal.healingDone + c.trioRanked.healingDone + c.trioNormal.healingDone,
        healingReceived: b.healingReceived + c.duoRanked.healingReceived + c.duoNormal.healingReceived + c.trioRanked.healingReceived + c.trioNormal.healingReceived,
        kills: b.kills + c.duoRanked.kills + c.duoNormal.kills + c.trioRanked.kills + c.trioNormal.kills,
        score: b.score + c.duoRanked.score + c.duoNormal.score + c.trioRanked.score + c.trioNormal.score,
        timeAlive: b.timeAlive + c.duoRanked.timeAlive + c.duoNormal.timeAlive + c.trioRanked.timeAlive + c.trioNormal.timeAlive,
      }), { wins: 0, losses: 0, gamesCount: 0, roundsCount: 0, abilityUses: 0, damageDone: 0, damageReceived: 0, deaths: 0, disabledDone: 0, disablesReceived: 0, energyGained: 0, energyUsed: 0, healingDone: 0, healingReceived: 0, kills: 0, score: 0, timeAlive: 0 });
  } else if (mode === null && isRanked === true) {
    return championStats.reduce((b, c) =>
      ({
        wins: b.wins + c.duoRanked.wins + c.trioRanked.wins,
        losses: b.losses + c.duoRanked.losses + c.trioRanked.losses,
      }), { wins: 0, losses: 0 });
  } else if (mode === null && isRanked === false) {
    return championStats.reduce((b, c) =>
      ({
        wins: b.wins + c.duoNormal.wins + c.trioNormal.wins,
        losses: b.losses + c.duoNormal.losses + c.trioNormal.losses,
      }), { wins: 0, losses: 0 });
  } else if (mode === 2 && isRanked === null) {
    return championStats.reduce((b, c) =>
      ({
        wins: b.wins + c.duoNormal.wins + c.duoRanked.wins,
        losses: b.losses + c.duoNormal.losses + c.duoRanked.losses,
      }), { wins: 0, losses: 0 });
  } else if (mode === 3 && isRanked === null) {
    return championStats.reduce((b, c) =>
      ({
        wins: b.wins + c.trioRanked.wins + c.trioNormal.wins,
        losses: b.losses + c.trioRanked.losses + c.trioNormal.losses,
      }), { wins: 0, losses: 0 });
  } else if (mode === 2 && isRanked === true) {
    return championStats.reduce((b, c) =>
      ({
        wins: b.wins + c.duoRanked.wins,
        losses: b.losses + c.duoRanked.losses,
      }), { wins: 0, losses: 0 });
  } else if (mode === 2 && isRanked === false) {
    return championStats.reduce((b, c) =>
      ({
        wins: b.wins + c.duoNormal.wins,
        losses: b.losses + c.duoNormal.losses,
      }), { wins: 0, losses: 0 });
  } else if (mode === 3 && isRanked === true) {
    return championStats.reduce((b, c) =>
      ({
        wins: b.wins + c.trioRanked.wins,
        losses: b.losses + c.trioRanked.losses,
      }), { wins: 0, losses: 0 });
  } else if (mode === 3 && isRanked === false) {
    return championStats.reduce((b, c) =>
      ({
        wins: b.wins + c.trioNormal.wins,
        losses: b.losses + c.trioNormal.losses,
      }), { wins: 0, losses: 0 });
  }
  return null;
};

const handleStats = (dataIn, mode, isRanked) => {
  const champions = utils.getChampionList(dataIn);
  champions.forEach((champion, i) => {
    const nameAndIcon = utils.getChampionNameAndIcon(champion.championCode);
    const championRawStats = dataIn.filter(x => x.championCode === champion.championCode);

    const stats = getWinsLossesByChampion(championRawStats, mode, isRanked);

    champions[i].championName = nameAndIcon.name;
    champions[i].iconId = nameAndIcon.iconId;
    champions[i].wins = stats.wins;
    champions[i].losses = stats.losses;
    champions[i].totalGames = stats.gamesCount;
    champions[i].totalRounds = stats.roundsCount;
    champions[i].winRate = stats.wins / stats.gamesCount;
    champions[i].abilityUses = stats.abilityUses;
    champions[i].damageDone = stats.damageDone;
  });
  return champions;
};

exports.getStats = (req, res) => {
  const type = utils.getTimePeriodFilter(req.query.timePeriod);
  const isRanked = utils.getRankedFilter(req.query.ranked);
  const league = utils.getLeagueFilter(req.query.league);
  const mode = utils.getModeFilter(req.query.mode);

  if (league === null) {
    Log.findOne({ type }).exec()
      .then((log) => {
        if (log !== null) {
          Stats.find({ log: mongoose.Types.ObjectId(log._id) }).lean().exec()
            .then((stats) => {
              const response = handleStats(stats, mode, isRanked);
              res.json(response);
            });
        } else {
          res.json(noResultsFound);
        }
      })
      .catch((err) => {
        res.json(err);
      });
  } else {
    Log.findOne({ type }).exec()
      .then((log) => {
        if (log !== null) {
          Stats.find({ log: mongoose.Types.ObjectId(log._id), league }).lean().exec()
            .then((stats) => {
              const response = handleStats(stats, mode, isRanked);
              res.json(response);
            });
        } else {
          res.json(noResultsFound);
        }
      })
      .catch((err) => {
        res.json(err);
      });
  }
};
