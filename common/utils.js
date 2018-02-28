const iniparser = require('iniparser');

const gameplay = require('../static/assets/gameplay.json');
const map = require('../static/assets/map.json');
const stackables = require('../static/assets/stackables.json');

const english = iniparser.parseSync('./static/assets/English.ini');

const getBattleriteInfo = (battleriteCode, championInfo) => championInfo.battlerites.filter(x => x.typeID === battleriteCode)[0];

exports.getMatchInformation = (match) => {
  try {
    const mapInfo = stackables.Mappings.filter(x => x.LocalizedName === map.filter(y => y.mapLogId === match.MapId)[0].mapStackablesId)[0];
    const championInfo = gameplay.characters.filter(x => x.typeID === match.ChampionCode)[0];
    const battlerite1Info = getBattleriteInfo(match.Br1, championInfo);
    const battlerite2Info = getBattleriteInfo(match.Br2, championInfo);
    const battlerite3Info = getBattleriteInfo(match.Br3, championInfo);
    const battlerite4Info = getBattleriteInfo(match.Br4, championInfo);
    console.log(battlerite4Info);
    const battlerite5Info = getBattleriteInfo(match.Br5, championInfo);

    return {
      map: {
        iconId: mapInfo.Image,
        name: english[mapInfo.LocalizedName],
      },
      champion: {
        iconId: championInfo.icon,
        name: english[championInfo.name],
      },
      loadout: [{
        iconId: battlerite1Info.icon,
        name: english[battlerite1Info.name],
      }, {
        iconId: battlerite2Info.icon,
        name: english[battlerite2Info.name],
      }, {
        iconId: battlerite3Info.icon,
        name: english[battlerite3Info.name],
      }, {
        iconId: battlerite4Info.icon,
        name: english[battlerite4Info.name],
      }, {
        iconId: battlerite5Info.icon,
        name: english[battlerite5Info.name],
      }],
    };
  } catch (e) {
    console.log(e);
    return e;
  }
};

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
