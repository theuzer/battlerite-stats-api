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
        totalGames: b.gamesCount + c.duoRanked.gamesCount + c.duoNormal.gamesCount + c.trioNormal.gamesCount + c.trioRanked.gamesCount,
        totalRounds: b.roundsCount + c.duoRanked.roundsCount + c.duoNormal.roundsCount + c.trioNormal.roundsCount + c.trioRanked.roundsCount,
        abilityUses: b.abilityUses + c.duoRanked.abilityUses + c.duoNormal.abilityUses + c.trioNormal.abilityUses + c.trioRanked.abilityUses,
        damageDone: b.damageDone + c.duoRanked.damageDone + c.duoNormal.damageDone + c.trioNormal.damageDone + c.trioRanked.damageDone,

      }), { wins: 0, losses: 0, totalGames: 0, totalRounds: 0, abilityUses: 0, damageDone: 0 });
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
    champions[i].totalGames = stats.totalGames;
    champions[i].totalRounds = stats.totalRounds;
    champions[i].winRate = stats.wins / stats.totalGames;
    champions[i].abilityUses = stats.abilityUse;
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
