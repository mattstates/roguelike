import { randomizer } from './helpers.js';

function Enemy(name, baseHP, baseXP, basePower) {
  this.name = name;
  this.baseHP = baseHP
  this.baseXP = baseXP;
  this.basePower = basePower;
}

Enemy.prototype.attack = function(dungeonFloor) {
  return Math.floor( (this.basePower * (dungeonFloor / 4)) * ( (Math.floor(Math.random() * 5 + 8)) / 10 ) )
} //return a value of basePower * %complete of the dungeons (.25 - 100) with a multiplier of .8 - 1.2. EX Floor 1 enemy with 100 basePower will do 20-30 damage.

Enemy.prototype.XP = function(dungeonFloor) {
  return Math.floor( (this.XP * (dungeonFloor / 4)) * ( (Math.floor(Math.random() * 4 + 9)) / 10 ) )
}

const enemies = {
  goblin: new Enemy('Goblin', 10, 10, 10),
  rogue: new Enemy('Rogue', 12, 12, 12),
  nymph: new Enemy('Nymph', 7, 14, 16),
  demon: new Enemy('Demon', 20, 20, 18),
  beast: new Enemy('Beast', 30, 25, 20),
  shadow: new Enemy('Shadow', 20, 25, 25),
  wraith: new Enemy('Wraith', 20, 30, 30),
  darkElf: new Enemy('Dark Elf', 18, 14, 14)
}

function Weapon(nameStr, xpBonusNum, basePowerNum, frequencyNum) {
  this.name = nameStr;
  this.xpBonus = xpBonusNum;
  this.basePower = basePowerNum;
  this.frequency = frequencyNum;
}

Weapon.prototype.weaponRandomizer = function() {
  const min = Math.floor(this.basePower * .9)
  const max = Math.ceil(this.basePower * 1.1)
  // this.basePower = Math.floor( Math.random() * (max - min + 1) ) + min;
  const outputPower = randomizer(max, min)
  this.basePower = outputPower
}

const weapons = {
  excalibur: new Weapon('Excalibur', 2, 120, 1),
  woodSword: new Weapon('wooden sword', 1, 13, 12),
  dagger: new Weapon('dagger', 1, 17, 8),
  whip: new Weapon('whip', 1, 22, 8),
  broadSword: new Weapon('broad sword', 1, 27, 5),
  axe: new Weapon('axe', 1, 50, 4),
  faerieWand: new Weapon('Faerie Wand', 4, 20, 1),
  stick: new Weapon('stick', 1, 5, 1)
}

// -TODO- use this, its properties are not being used.
const heart = {
  healthBonus: 30,
  modifier: function() {
    this.healthBonus = Math.ceil(this.healthBonus * Math.random()) + 15;
    return;
  }
}

function nameGenerator() {
  const heroNames = ['Dirk', 'Erdrik', 'Link', 'Karak', 'Olaf', 'Mario', 'Grima', 'Gurgi', 'Kain', 'Brandt', 'Eilonwy', 'Terra', 'Orwen', 'Freyja', 'Garnet', 'Rosa', 'Ren', 'Sir Ector', 'Mim', 'Eleanor', 'Fauna', 'Robin', 'Caxton', 'Cade', 'Willow', 'Carac', 'Thea', 'Arabell', 'Hildegard', 'Guinevere', 'Janice from Accounting', 'Guy', 'Ferdinand', 'Faye', 'Halflar', 'Alyndra', 'Aravae', 'Eae', 'Ariuk', 'Sidriel', 'Tearney', 'Elyon', 'Grirosb', 'Vicar', 'Emeline', 'Sari', 'Reeve', 'Matheld', 'Podaria', 'Pelham', 'Evmorn', 'Rey', 'Cid', 'Baldur', 'Torvex', 'Rooibos', 'Arthur', 'Ruth', 'Qalif', 'Melisma', 'Lufia', 'Mooch', 'Maximus']

  const traits = ['Brave', 'Smarmy', 'Proud', 'Rude', 'Tenacious', 'Dainty', 'Courageous', 'Stout', 'Stubborn', 'Beautiful', 'Sniveling', 'Vain', 'Horrible', 'Courteous', 'Friendly', 'Powerful', 'Wise', 'Gracious', 'Humble', 'Strong', 'Inebriated', 'Compelling', 'Forceful', 'Ugly', '"Meh"', 'Average', 'Able-Bodied', 'Mighty', 'Rugged', 'Uncaring', 'Inept', 'Ethereal', 'Repulsive', 'Dismissive', 'Pitiful', 'Bold', 'Amicable', 'Agreeable', 'Daring', 'Brash', 'Bumbling', 'Virtuous', 'Lawful', 'Conquering', 'Lying', 'Contrite', 'Heckling', 'Sullen', 'Fierce', 'Fearful', 'Whimsical', 'Ungrateful', 'Stern', 'Gentle', 'Calvalier', 'Personable', 'Wandering', 'Roguelike', 'Sneaky', 'Argumentative', 'Cantankerous', 'Miserable', 'Fortunate', 'Loathsome', 'Belligerent', 'Meager']

  const occupations = ['King', 'Queen', 'Joker', 'Noble', 'Warrior', 'Wizard', 'Conjurer', 'Adventurer', 'Cartographer', 'Slave', 'Peasant', 'Jedi', 'Lord', 'Knight', 'Fighter', 'Conquerer', 'Alchemist', 'Shapeshifter', 'Janitor', 'Prognosticator', 'Hero', 'Guard', 'Shepherd', 'Farmhand', 'Barrister', 'Hunter', 'Blacksmith', 'Armorsmith', 'Thief', 'Elf', 'Soldier', 'Officer', 'Cultist', 'Abbot', 'Cantor', 'Spy', 'Scout', 'Admiral', 'Canoneer', 'Bowmaster', 'Captain', 'Pickpocket', 'Cobbler', 'Bard', 'Warlock', 'Vagabond', 'Mercenary', 'Marshall', 'Squire', 'Viking', 'Archer', 'Swordmaster', 'Gypsy', 'Nomad', 'Ruler', 'Paladin', 'Crusader', 'Necromancer', 'Druid', 'Assassin', 'Gambler', 'Rogue', 'Ninja', 'Contrarian', 'Bandit', 'Miser', 'Ranger', 'Pirate', 'Monk', 'Gunslinger', 'Golem', 'Dignitary']

  return heroNames[randomizer(heroNames.length - 1)] + ', the ' + traits[randomizer(traits.length - 1)] + ' ' + occupations[randomizer(occupations.length - 1)]
}

const hero = {
  name: nameGenerator(),
  level: 0,
  XP: 0,
  basePower: 1,
  weapon: 'none',
  HP: 30,
  position: [60,60], //gets overidden to random on the default state in the reducer.
  floor: 0,
  light: false
}

export default {
          hero: hero,
          heart: heart,
          weapons: weapons,
          enemies: enemies
        }
