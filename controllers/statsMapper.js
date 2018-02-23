exports.getWinsLossesByChampion = (championStats, mode, isRanked) => {
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
      }), { wins: 0, losses: 0, gamesCount: 0, roundsCount: 0, abilityUses: 0, damageDone: 0, damageReceived: 0, deaths: 0, disablesDone: 0, disablesReceived: 0, energyGained: 0, energyUsed: 0, healingDone: 0, healingReceived: 0, kills: 0, score: 0, timeAlive: 0 });
  } else if (mode === null && isRanked === true) {
    return championStats.reduce((b, c) =>
      ({
        wins: b.wins + c.duoRanked.wins + c.trioRanked.wins,
        losses: b.losses + c.duoRanked.losses + c.trioRanked.losses,
        gamesCount: b.gamesCount + c.duoRanked.gamesCount + c.trioRanked.gamesCount,
        roundsCount: b.roundsCount + c.duoRanked.roundsCount + c.trioRanked.roundsCount,
        abilityUses: b.abilityUses + c.duoRanked.abilityUses + c.trioRanked.abilityUses,
        damageDone: b.damageDone + c.duoRanked.damageDone + c.trioRanked.damageDone,
        damageReceived: b.damageReceived + c.duoRanked.damageReceived + c.trioRanked.damageReceived,
        deaths: b.deaths + c.duoRanked.deaths + c.trioRanked.deaths,
        disablesDone: b.disablesDone + c.duoRanked.disablesDone + c.trioRanked.disablesDone,
        disablesReceived: b.disablesReceived + c.duoRanked.disablesReceived + c.trioRanked.disablesReceived,
        energyGained: b.energyGained + c.duoRanked.energyGained + c.trioRanked.energyGained,
        energyUsed: b.energyUsed + c.duoRanked.energyUsed + c.trioRanked.energyUsed,
        healingDone: b.healingDone + c.duoRanked.healingDone + c.trioRanked.healingDone,
        healingReceived: b.healingReceived + c.duoRanked.healingReceived + c.trioRanked.healingReceived,
        kills: b.kills + c.duoRanked.kills + c.trioRanked.kills,
        score: b.score + c.duoRanked.score + c.trioRanked.score,
        timeAlive: b.timeAlive + c.duoRanked.timeAlive + c.trioRanked.timeAlive,
      }), { wins: 0, losses: 0, gamesCount: 0, roundsCount: 0, abilityUses: 0, damageDone: 0, damageReceived: 0, deaths: 0, disablesDone: 0, disablesReceived: 0, energyGained: 0, energyUsed: 0, healingDone: 0, healingReceived: 0, kills: 0, score: 0, timeAlive: 0 });
  } else if (mode === null && isRanked === false) {
    return championStats.reduce((b, c) =>
      ({
        wins: b.wins + c.duoNormal.wins + c.trioNormal.wins,
        losses: b.losses + c.duoNormal.losses + c.trioNormal.losses,
        gamesCount: b.gamesCount + c.duoNormal.gamesCount + c.trioNormal.gamesCount,
        roundsCount: b.roundsCount + c.duoNormal.roundsCount + c.trioNormal.roundsCount,
        abilityUses: b.abilityUses + c.duoNormal.abilityUses + c.trioNormal.abilityUses,
        damageDone: b.damageDone + c.duoNormal.damageDone + c.trioNormal.damageDone,
        damageReceived: b.damageReceived + c.duoNormal.damageReceived + c.trioNormal.damageReceived,
        deaths: b.deaths + c.duoNormal.deaths + c.trioNormal.deaths,
        disablesDone: b.disablesDone + c.duoNormal.disablesDone + c.trioNormal.disablesDone,
        disablesReceived: b.disablesReceived + c.duoNormal.disablesReceived + c.trioNormal.disablesReceived,
        energyGained: b.energyGained + c.duoNormal.energyGained + c.trioNormal.energyGained,
        energyUsed: b.energyUsed + c.duoNormal.energyUsed + c.trioNormal.energyUsed,
        healingDone: b.healingDone + c.duoNormal.healingDone + c.trioNormal.healingDone,
        healingReceived: b.healingReceived + c.duoNormal.healingReceived + c.trioNormal.healingReceived,
        kills: b.kills + c.duoNormal.kills + c.trioNormal.kills,
        score: b.score + c.duoNormal.score + c.trioNormal.score,
        timeAlive: b.timeAlive + c.duoNormal.timeAlive + c.trioNormal.timeAlive,        
      }), { wins: 0, losses: 0, gamesCount: 0, roundsCount: 0, abilityUses: 0, damageDone: 0, damageReceived: 0, deaths: 0, disablesDone: 0, disablesReceived: 0, energyGained: 0, energyUsed: 0, healingDone: 0, healingReceived: 0, kills: 0, score: 0, timeAlive: 0 });
  } else if (mode === 2 && isRanked === null) {
    return championStats.reduce((b, c) =>
      ({
        wins: b.wins + c.duoRanked.wins + c.duoNormal.wins,
        losses: b.losses + c.duoRanked.losses + c.duoNormal.losses,
        gamesCount: b.gamesCount + c.duoRanked.gamesCount + c.duoNormal.gamesCount,
        roundsCount: b.roundsCount + c.duoRanked.roundsCount + c.duoNormal.roundsCount,
        abilityUses: b.abilityUses + c.duoRanked.abilityUses + c.duoNormal.abilityUses,
        damageDone: b.damageDone + c.duoRanked.damageDone + c.duoNormal.damageDone,
        damageReceived: b.damageReceived + c.duoRanked.damageReceived + c.duoNormal.damageReceived,
        deaths: b.deaths + c.duoRanked.deaths + c.duoNormal.deaths,
        disablesDone: b.disablesDone + c.duoRanked.disablesDone + c.duoNormal.disablesDone,
        disablesReceived: b.disablesReceived + c.duoRanked.disablesReceived + c.duoNormal.disablesReceived,
        energyGained: b.energyGained + c.duoRanked.energyGained + c.duoNormal.energyGained,
        energyUsed: b.energyUsed + c.duoRanked.energyUsed + c.duoNormal.energyUsed,
        healingDone: b.healingDone + c.duoRanked.healingDone + c.duoNormal.healingDone,
        healingReceived: b.healingReceived + c.duoRanked.healingReceived + c.duoNormal.healingReceived,
        kills: b.kills + c.duoRanked.kills + c.duoNormal.kills,
        score: b.score + c.duoRanked.score + c.duoNormal.score,
        timeAlive: b.timeAlive + c.duoRanked.timeAlive + c.duoNormal.timeAlive,        
      }), { wins: 0, losses: 0, gamesCount: 0, roundsCount: 0, abilityUses: 0, damageDone: 0, damageReceived: 0, deaths: 0, disablesDone: 0, disablesReceived: 0, energyGained: 0, energyUsed: 0, healingDone: 0, healingReceived: 0, kills: 0, score: 0, timeAlive: 0 });
  } else if (mode === 3 && isRanked === null) {
    return championStats.reduce((b, c) =>
      ({
        wins: b.wins + c.trioRanked.wins + c.trioNormal.wins,
        losses: b.losses + c.trioRanked.losses + c.trioNormal.losses,
        gamesCount: b.gamesCount + c.trioRanked.gamesCount + c.trioNormal.gamesCount,
        roundsCount: b.roundsCount + c.trioRanked.roundsCount + c.trioNormal.roundsCount,
        abilityUses: b.abilityUses + c.trioRanked.abilityUses + c.trioNormal.abilityUses,
        damageDone: b.damageDone + c.trioRanked.damageDone + c.trioNormal.damageDone,
        damageReceived: b.damageReceived + c.trioRanked.damageReceived + c.trioNormal.damageReceived,
        deaths: b.deaths + c.trioRanked.deaths + c.trioNormal.deaths,
        disablesDone: b.disablesDone + c.trioRanked.disablesDone + c.trioNormal.disablesDone,
        disablesReceived: b.disablesReceived + c.trioRanked.disablesReceived + c.trioNormal.disablesReceived,
        energyGained: b.energyGained + c.trioRanked.energyGained + c.trioNormal.energyGained,
        energyUsed: b.energyUsed + c.trioRanked.energyUsed + c.trioNormal.energyUsed,
        healingDone: b.healingDone + c.trioRanked.healingDone + c.trioNormal.healingDone,
        healingReceived: b.healingReceived + c.trioRanked.healingReceived + c.trioNormal.healingReceived,
        kills: b.kills + c.trioRanked.kills + c.trioNormal.kills,
        score: b.score + c.trioRanked.score + c.trioNormal.score,
        timeAlive: b.timeAlive + c.trioRanked.timeAlive + c.trioNormal.timeAlive,        
      }), { wins: 0, losses: 0, gamesCount: 0, roundsCount: 0, abilityUses: 0, damageDone: 0, damageReceived: 0, deaths: 0, disablesDone: 0, disablesReceived: 0, energyGained: 0, energyUsed: 0, healingDone: 0, healingReceived: 0, kills: 0, score: 0, timeAlive: 0 });
  } else if (mode === 2 && isRanked === true) {
    return championStats.reduce((b, c) =>
      ({
        wins: b.wins + c.duoRanked.wins,
        losses: b.losses + c.duoRanked.losses,
        gamesCount: b.gamesCount + c.duoRanked.gamesCount,
        roundsCount: b.roundsCount + c.duoRanked.roundsCount,
        abilityUses: b.abilityUses + c.duoRanked.abilityUses,
        damageDone: b.damageDone + c.duoRanked.damageDone,
        damageReceived: b.damageReceived + c.duoRanked.damageReceived,
        deaths: b.deaths + c.duoRanked.deaths,
        disablesDone: b.disablesDone + c.duoRanked.disablesDone,
        disablesReceived: b.disablesReceived + c.duoRanked.disablesReceived,
        energyGained: b.energyGained + c.duoRanked.energyGained,
        energyUsed: b.energyUsed + c.duoRanked.energyUsed,
        healingDone: b.healingDone + c.duoRanked.healingDone,
        healingReceived: b.healingReceived + c.duoRanked.healingReceived,
        kills: b.kills + c.duoRanked.kills,
        score: b.score + c.duoRanked.score,
        timeAlive: b.timeAlive + c.duoRanked.timeAlive,        
      }), { wins: 0, losses: 0, gamesCount: 0, roundsCount: 0, abilityUses: 0, damageDone: 0, damageReceived: 0, deaths: 0, disablesDone: 0, disablesReceived: 0, energyGained: 0, energyUsed: 0, healingDone: 0, healingReceived: 0, kills: 0, score: 0, timeAlive: 0 });
  } else if (mode === 2 && isRanked === false) {
    return championStats.reduce((b, c) =>
      ({
        wins: b.wins + c.duoNormal.wins,
        losses: b.losses + c.duoNormal.losses,
        gamesCount: b.gamesCount + c.duoNormal.gamesCount,
        roundsCount: b.roundsCount + c.duoNormal.roundsCount,
        abilityUses: b.abilityUses + c.duoNormal.abilityUses,
        damageDone: b.damageDone + c.duoNormal.damageDone,
        damageReceived: b.damageReceived + c.duoNormal.damageReceived,
        deaths: b.deaths + c.duoNormal.deaths,
        disablesDone: b.disablesDone + c.duoNormal.disablesDone,
        disablesReceived: b.disablesReceived + c.duoNormal.disablesReceived,
        energyGained: b.energyGained + c.duoNormal.energyGained,
        energyUsed: b.energyUsed + c.duoNormal.energyUsed,
        healingDone: b.healingDone + c.duoNormal.healingDone,
        healingReceived: b.healingReceived + c.duoNormal.healingReceived,
        kills: b.kills + c.duoNormal.kills,
        score: b.score + c.duoNormal.score,
        timeAlive: b.timeAlive + c.duoNormal.timeAlive,        
      }), { wins: 0, losses: 0, gamesCount: 0, roundsCount: 0, abilityUses: 0, damageDone: 0, damageReceived: 0, deaths: 0, disablesDone: 0, disablesReceived: 0, energyGained: 0, energyUsed: 0, healingDone: 0, healingReceived: 0, kills: 0, score: 0, timeAlive: 0 });
  } else if (mode === 3 && isRanked === true) {
    return championStats.reduce((b, c) =>
      ({
        wins: b.wins + c.trioRanked.wins,
        losses: b.losses + c.trioRanked.losses,
        gamesCount: b.gamesCount + c.trioRanked.gamesCount,
        roundsCount: b.roundsCount + c.trioRanked.roundsCount,
        abilityUses: b.abilityUses + c.trioRanked.abilityUses,
        damageDone: b.damageDone + c.trioRanked.damageDone,
        damageReceived: b.damageReceived + c.trioRanked.damageReceived,
        deaths: b.deaths + c.trioRanked.deaths,
        disablesDone: b.disablesDone + c.trioRanked.disablesDone,
        disablesReceived: b.disablesReceived + c.trioRanked.disablesReceived,
        energyGained: b.energyGained + c.trioRanked.energyGained,
        energyUsed: b.energyUsed + c.trioRanked.energyUsed,
        healingDone: b.healingDone + c.trioRanked.healingDone,
        healingReceived: b.healingReceived + c.trioRanked.healingReceived,
        kills: b.kills + c.trioRanked.kills,
        score: b.score + c.trioRanked.score,
        timeAlive: b.timeAlive + c.trioRanked.timeAlive,        
      }), { wins: 0, losses: 0, gamesCount: 0, roundsCount: 0, abilityUses: 0, damageDone: 0, damageReceived: 0, deaths: 0, disablesDone: 0, disablesReceived: 0, energyGained: 0, energyUsed: 0, healingDone: 0, healingReceived: 0, kills: 0, score: 0, timeAlive: 0 });
  } else if (mode === 3 && isRanked === false) {
    return championStats.reduce((b, c) =>
      ({
        wins: b.wins + c.trioNormal.wins,
        losses: b.losses + c.trioNormal.losses,
        gamesCount: b.gamesCount + c.trioNormal.gamesCount,
        roundsCount: b.roundsCount + c.trioNormal.roundsCount,
        abilityUses: b.abilityUses + c.trioNormal.abilityUses,
        damageDone: b.damageDone + c.trioNormal.damageDone,
        damageReceived: b.damageReceived + c.trioNormal.damageReceived,
        deaths: b.deaths + c.trioNormal.deaths,
        disablesDone: b.disablesDone + c.trioNormal.disablesDone,
        disablesReceived: b.disablesReceived + c.trioNormal.disablesReceived,
        energyGained: b.energyGained + c.trioNormal.energyGained,
        energyUsed: b.energyUsed + c.trioNormal.energyUsed,
        healingDone: b.healingDone + c.trioNormal.healingDone,
        healingReceived: b.healingReceived + c.trioNormal.healingReceived,
        kills: b.kills + c.trioNormal.kills,
        score: b.score + c.trioNormal.score,
        timeAlive: b.timeAlive + c.trioNormal.timeAlive,        
      }), { wins: 0, losses: 0, gamesCount: 0, roundsCount: 0, abilityUses: 0, damageDone: 0, damageReceived: 0, deaths: 0, disablesDone: 0, disablesReceived: 0, energyGained: 0, energyUsed: 0, healingDone: 0, healingReceived: 0, kills: 0, score: 0, timeAlive: 0 });
  }
  return null;
};
