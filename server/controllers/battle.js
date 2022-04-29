const Character = require("../models/character");
const Monster = require("../models/monster");
const Item = require("../models/item");
const Battle = require("../models/battle");
const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors/customError");

const attack = (ca, ccr, ccd, md, me, mh, cName, mName, logs) => {
  let battleLog = "";
  // 상대의 회피율 확인
  if (Math.floor(Math.random() * 99) + 1 <= me) {
    battleLog += `${mName} 이/가 회피했다.`;
    return mh;
  }

  // 크리티컬 계산
  if (Math.floor(Math.random() * 99) + 1 <= ccr) {
    ca = ca + Math.floor((ca * ccd) / 100);
    battleLog += `${cName} 이/가 크리티컬 공격`;
  } else {
    battleLog += `${cName} 이/가 일반 공격`;
  }
  // 데미지는 나의 공격력 - 상대방의 방어력 * 0.5로 계산한다.
  ca = ca - Math.ceil(md * 0.5);
  ca = ca < 0 ? 0 : ca;
  battleLog += `(${ca})을 했다.`;
  mh = mh - ca >= 0 ? mh - ca : 0;
  battleLog += ` ${mName} HP: ${mh}`;
  logs.push(battleLog);

  return mh;
};

const battle = async (req, res) => {
  const { userId, nickname } = req.user;
  const monster = await Monster.findById(req.params.id);
  let response = {};
  if (!monster) {
    throw CustomError.BadRequest("Monster ID is not existed!");
  }
  let {
    attack: ma,
    defense: md,
    speed: ms,
    evasion: me,
    criticalRate: mcr,
    criticalDamage: mcd,
    hp: mh,
    name: mn,
    exp,
    drops,
  } = monster;

  let {
    attack: ca,
    defense: cd,
    speed: cs,
    evasion: ce,
    criticalRate: ccr,
    criticalDamage: ccd,
    hp: ch,
    inventory,
    exp: currentExp,
    requiredExp,
    level,
  } = await Character.findOne({ userId });

  let currentTurn = 1;
  let logs = [];
  while (ch >= 0 && mh >= 0) {
    // 1. speed를 비교한다.
    if (cs >= ms) {
      // 플레이어 턴
      mh = attack(ca, ccr, ccd, md, me, mh, nickname, mn, logs);
      if (mh <= 0) break;
      // 몬스터 턴
      ch = attack(ma, mcr, mcd, cd, ce, ch, mn, nickname, logs);
      if (ch <= 0) break;
    } else {
      // 몬스터 턴
      ch = attack(ma, mcr, mcd, cd, ce, ch, mn, nickname, logs);
      if (ch <= 0) break;
      // 플레이어 턴
      mh = attack(ca, ccr, ccd, md, me, mh, nickname, mn, logs);
      if (mh <= 0) break;
    }
    currentTurn++;
  }
  // 몬스터 사망 시
  if (mh <= 0) {
    // 해당 몬스터의 경험치를 획득한다.
    logs.push(`${exp} exp 획득!`);
    currentExp += exp;
    response = { ...response, levelUp: false };

    //레벨업할때
    if (currentExp >= requiredExp) {
      currentExp -= requiredExp;
      requiredExp += 100;
      level++;
      response = { ...response, levelUp: true };
    }
    let dropped = [];
    // 각 아이템의 드랍률을 확인해서 플레이어에게 지급
    for (let i = 0; i < drops.length; i++) {
      const item = await Item.findById(drops[i]);
      if (item) {
        if (Math.floor(Math.random() * 99) + 1 <= item.dropRate) {
          logs.push(`${item.name} 을/를 획득!`);
          // if(inventory.includes(dropItem)){
          //   // 아이템의 수량을 증가
          // }
          dropped.push({ id: drops[i], name: item.name });
          inventory.push(drops[i]);
        }
      }
    }
    response = { ...response, item: dropped };
    await Character.findOneAndUpdate(
      { userId },
      { inventory, exp: currentExp, requiredExp, level }
    );
    response = { ...response, exp, result: "win" };
  }

  // 플레이서 사망 시
  if (ch <= 0) {
    response = { ...response, exp: 0, result: "lose" };
  }

  response = { ...response, logs };
  res.status(StatusCodes.OK).json({ ...response });
};

const manualBattle = async (req, res) => {
  const { skillName, battleID } = req.body;
  const { userId, nickname } = req.user;
  let ma, md, ms, me, mcr, mcd, mh, mn, exp, drops, mSkills;
  let ca,
    cd,
    cs,
    ce,
    ccr,
    ccd,
    ch,
    currentExp,
    requiredExp,
    level,
    inventory,
    cSkills;
  let response = {};
  let monsterObj = {};
  let characterObj = {};
  const battle = await Battle.findOne({ id: battleID });
  // Battle db에 전투 상황을 저장함
  // 만약 Battle db에 현재 전투가 존재한다면 거기서 캐릭터와 몬스터의 정보를 가져옴
  // 아니면 각 db에서 가져온 다음 Battle db에 저장함
  if (battle) {
    monsterObj = battle.monster;
    ma = monsterObj.attack;
    md = monsterObj.defense;
    ms = monsterObj.speed;
    me = monsterObj.evasion;
    mcr = monsterObj.criticalRate;
    mcd = monsterObj.criticalDamage;
    mh = monsterObj.hp;
    mn = monsterObj.name;
    exp = monsterObj.exp;
    drops = monsterObj.drops;
    mSkills = monsterObj.skills;

    characterObj = battle.character;
    ca = characterObj.attack;
    cd = characterObj.defense;
    cs = characterObj.speed;
    ce = characterObj.evasion;
    ccr = characterObj.criticalRate;
    ccd = characterObj.criticalDamage;
    ch = characterObj.hp;
    currentExp = characterObj.currentExp;
    requiredExp = characterObj.requiredExp;
    level = characterObj.level;
    inventory = characterObj.inventory;
    cSkills = characterObj.skills;
  } else {
    const monster = await Monster.findById(req.params.id);
    const character = await Character.findOne({ userId });
    if (!monster) {
      throw CustomError.BadRequest("Monster ID is not existed!");
    }
    ma = monster.attack;
    md = monster.defense;
    ms = monster.speed;
    me = monster.evasion;
    mcr = monster.criticalRate;
    mcd = monster.criticalDamage;
    mh = monster.hp;
    mn = monster.name;
    exp = monster.exp;
    drops = monster.drops;
    mSkills = monster.skills;
    monsterObj = {
      hp: mh,
      attack: ma,
      defense: md,
      speed: ms,
      evasion: me,
      criticalRate: mcr,
      criticalDamage: mcd,
      name: mn,
      exp,
      drops,
      skills: mSkills,
    };

    ca = character.attack;
    cd = character.defense;
    cs = character.speed;
    ce = character.evasion;
    ccr = character.criticalRate;
    ccd = character.criticalDamage;
    ch = character.hp;
    currentExp = character.exp;
    requiredExp = character.requiredExp;
    level = character.level;
    inventory = character.inventory;
    cSkills = character.skills;
    characterObj = {
      hp: ch,
      attack: ca,
      defense: cd,
      speed: cs,
      evasion: ce,
      criticalRate: ccr,
      criticalDamage: ccd,
      currentExp,
      requiredExp,
      level,
      inventory,
      skills: cSkills,
    };
    await Battle.create({
      id: battleID,
      character: { ...characterObj },
      monster: { ...monsterObj },
    });
  }

  let logs = [];

  // 1. speed를 비교한다.
  if (cs >= ms) {
    // 플레이어 턴
    if (skillName === "basic") {
      mh = attack(ca, ccr, ccd, md, me, mh, nickname, mn, logs);
    }
    if (mh > 0) {
      ch = attack(ma, mcr, mcd, cd, ce, ch, mn, nickname, logs);
    }
  } else {
    // 몬스터 턴
    ch = attack(ma, mcr, mcd, cd, ce, ch, mn, nickname, logs);
    if (ch > 0) {
      // 플레이어 턴
      if (skillName === "basic") {
        mh = attack(ca, ccr, ccd, md, me, mh, nickname, mn, logs);
      }
    }
  }
  monsterObj = { ...monsterObj, hp: mh };
  characterObj = { ...characterObj, hp: ch };

  if (mh <= 0) {
    // 해당 몬스터의 경험치를 획득한다.
    logs.push(`${exp} exp 획득!`);
    currentExp += exp;
    response = { ...response, levelUp: false };

    //레벨업할때
    if (currentExp >= requiredExp) {
      currentExp -= requiredExp;
      requiredExp += 100;
      level++;
      response = { ...response, levelUp: true };
    }
    let dropped = [];
    // 각 아이템의 드랍률을 확인해서 플레이어에게 지급
    for (let i = 0; i < drops.length; i++) {
      const item = await Item.findById(drops[i]);
      if (item) {
        if (Math.floor(Math.random() * 99) + 1 <= item.dropRate) {
          logs.push(`${item.name} 을/를 획득!`);
          // if(inventory.includes(dropItem)){
          //   // 아이템의 수량을 증가
          // }
          dropped.push(item);
          inventory.push(drops[i]);
        }
      }
    }
    response = { ...response, item: dropped };
    await Character.findOneAndUpdate(
      { userId },
      { inventory, exp: currentExp, requiredExp, level }
    );
    response = {
      ...response,
      exp,
      characterHP: ch,
      monsterHP: mh,
      result: "win",
      logs,
    };

    return res.status(StatusCodes.OK).json({ ...response });
  }

  // 플레이서 사망 시
  if (ch <= 0) {
    response = {
      ...response,
      exp: 0,
      characterHP: ch,
      monsterHP: mh,
      result: "lose",
      logs,
    };

    return res.status(StatusCodes.OK).json({ ...response });
  }

  response = {
    ...response,
    result: "ongoing",
    characterHP: ch,
    monsterHP: mh,
    logs,
  };
  await Battle.findOneAndUpdate(
    { id: battleID },
    {
      character: { ...characterObj },
      monster: { ...monsterObj },
    }
  );
  return res.status(StatusCodes.OK).json({ ...response });
};

module.exports = {
  battle,
  manualBattle,
};
