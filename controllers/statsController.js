const mongoose = require('mongoose');

const Stats = require('../models/stats');
const Log = require('../models/log');
const utils = require('../common/utils');

const noResultsFound = {
  response: 'no results found',
};

const handleUnfilteredResponse = (dataIn) => {
  const champions = utils.getChampionList(dataIn);
  champions.forEach((champion, i) => {
    champions[i].championName = utils.getChampionName(champion.championCode);
    const a = dataIn.filter(x => x.championCode === champion.championCode);
    const stats = a.reduce((b, c) =>
      ({
        wins: b.wins + c.duoRanked.wins + c.duoNormal.wins + c.trioNormal.wins + c.trioRanked.wins,
        losses: b.losses + c.duoRanked.losses + c.duoNormal.losses + c.trioNormal.losses + c.trioRanked.losses,
      }), { wins: 0, losses: 0 });

    champions[i].wins = stats.wins;
    champions[i].losses = stats.losses;
    champions[i].totalGames = stats.wins + stats.losses;
    champions[i].winRate = stats.wins / (stats.wins + stats.losses);
  });
  return champions;
};

const handleStats = (dataIn, isRanked, league, mode) => {
  if (isRanked === null && league === null && mode === null) {
    return handleUnfilteredResponse(dataIn);
  }
  return 1;
};

exports.getStats = (req, res) => {
  const type = utils.getTimePeriodFilter(req.query.timePeriod);
  const isRanked = utils.getRankedFilter(req.query.ranked);
  const league = utils.getLeagueFilter(req.query.league);
  const mode = utils.getModeFilter(req.query.mode);

  Log.findOne({ type }).exec()
    .then((log) => {
      if (log !== null) {
        Stats.find({ log: mongoose.Types.ObjectId(log._id) }).lean().exec()
          .then((stats) => {
            res.json(handleStats(stats, isRanked, league, mode));
          });
      } else {
        res.json(noResultsFound);
      }
    })
    .catch((err) => {
      res.json(err);
    });
};
