const getChampionWinrateByDate = (year, month, day) => `select * from champion_winrate_date where year=${year} and month=${month} and day=${day}`;
const getCharacterHistory = (playerCode, page) => `select * from get_character_history_page('${playerCode}', ${page});`;
const getCharacterGames = (playerCode, page) => `select c.Id, c.PlayerCode, c.TeamCode, c.AbilityUses, c.DamageDone, c.DamageReceived, c.Deaths, c.DisablesDone, c.DisablesReceived, c.EnergyGained, c.EnergyUsed, c.HealingDone, c.HealingReceived, c.Kills, c.Score, c.TimeAlive, ch.ChampionCode, g.Win, m.IsRanked, m.TeamSize as Mode, m.DateCreated, m.NumberOfRounds, ma.MapId, l.Br1, l.Br2, l.Br3, l.Br4, l.Br5 from dbo.character c, dbo.champion ch, dbo.gameteam g, dbo.match m, dbo.Map ma, dbo.Loadout l where g.matchId = m.Id and c.gameteamId = g.Id and c.championId = ch.Id and m.MapId = ma.Id and c.LoadoutId = l.Id and c.PlayerCode = ${playerCode} order by DateCreated DESC offset ${page * 10} rows fetch next 10 rows only`;

module.exports = {
  getSynergies: "select count(*), ch1.championCode, ch2.championCode, g.win from gameteam g, match m, character c1, character c2, champion ch1, champion ch2 where g.matchId = m.id   and c1.gameteamid = g.id   and c2.gameteamid = g.id   and c1.championId = ch1.id   and c2.championId = ch2.id   and m.teamSize = 2   and m.isRanked = 1   and c1.championId <> c2.championId group by ch2.championCode, ch1.championCode, g.win order by ch2.championCode, win",
  getChampionWinrateByDate,
  getCharacterHistory,
  getCharacterGames,
};
