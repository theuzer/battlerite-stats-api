const utils = require('../common/utils');
const Stats = require('../models/stats');

const handleResponse = champions => champions.map(champion => ({
  championCode: champion.championCode,
  championName: champion.championName,
  championIcon: utils.getChampionIconId(champion.championCode),
  stats: champion.stats,
}));

exports.getStats = (req, res) => {
  const timePeriod = utils.getTimePeriodFilter(req.query.timePeriod);
  const isRanked = utils.getRankedFilter(req.query.ranked);
  const league = utils.getLeagueFilter(req.query.league);
  const mode = utils.getModeFilter(req.query.mode);

  Stats.find({
    timePeriod,
    isRanked,
    league,
    mode,
  }).lean().exec()
    .then((champions) => {
      const response = handleResponse(champions);
      res.json(response);
    })
    .catch((err) => {
      res.json(err);
    });
};
