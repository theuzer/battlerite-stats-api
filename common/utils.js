const gameplay = require('../static/assets/gameplay.json');

exports.getChampionIconId = championCode => gameplay.characters.filter(x => x.typeID === championCode)[0].icon;

exports.getTimePeriodFilter = (timePeriodFilter) => {
  switch (timePeriodFilter) {
    case '0':
      return 0;
    case '1':
      return 1;
    case '2':
      return 2;
    case '3':
      return 3;
    default:
      return 0;
  }
};

exports.getRankedFilter = (ranked) => {
  switch (ranked) {
    case 'true':
      return true;
    case 'false':
      return false;
    default:
      return null;
  }
};

exports.getLeagueFilter = (league) => {
  switch (league) {
    case '0':
      return 0;
    case '1':
      return 1;
    case '2':
      return 2;
    case '3':
      return 3;
    case '4':
      return 4;
    case '5':
      return 5;
    case '6':
      return 6;
    default:
      return null;
  }
};

exports.getModeFilter = (mode) => {
  switch (mode) {
    case '2':
      return 2;
    case '3':
      return 3;
    default:
      return null;
  }
};
