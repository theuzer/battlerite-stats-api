const mongoose = require('mongoose');

const Stats = require('../models/stats');
const Log = require('../models/log');
const utils = require('../common/utils');
const statsMapper = require('./statsMapper');

const noResultsFound = {
  response: 'no results found',
};

const handleStats = (dataIn, mode, isRanked) => {
  const champions = utils.getChampionList(dataIn);
  champions.forEach((champion, i) => {
    const nameAndIcon = utils.getChampionNameAndIcon(champion.championCode);
    const championRawStats = dataIn.filter(x => x.championCode === champion.championCode);

    console.time('mapper');
    const stats = statsMapper.getWinsLossesByChampion(championRawStats, mode, isRanked);
    console.timeEnd('mapper');
    stats.winRate = stats.wins / stats.gamesCount;

    champions[i].championName = nameAndIcon.name;
    champions[i].iconId = nameAndIcon.iconId;
    champions[i].stats = stats;
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
