//900 * 600 / 30 = 30 x 20
import gameObjects from './gameobjects.js'
import { randomizer } from './helpers.js';

const cellWidth = 30;

function TileType(walkableBool, nameStr) {
  this.walkable = walkableBool;
  this.name = nameStr;
};

const wall = new TileType(false, 'wall');

const enemy = new TileType(false, 'enemy');

const item = new TileType(true, 'item');

const heart = new TileType(true, 'heart');

const floor = new TileType(true, 'floor');

const stair = new TileType(true, 'stair');

//Tile is unused at the moment.
/*function Tile(xPos, yPos, id, tileTypeObj) {
  this.xPos = xPos;
  this.yPos = yPos;
  this.id = id;
  this.tileType = tileTypeObj === undefined ? wall : tileTypeObj;
};*/

let weapons = [];

function pushWeapons(weaponObj) {
  for(let weapon in weaponObj) {
    for(let ii = 0; ii < weaponObj[weapon].frequency; ii++) {
      weaponObj[weapon].weaponRandomizer()
      weapons.push({
        name: weaponObj[weapon].name,
        xpBonus: weaponObj[weapon].xpBonus,
        basePower: weaponObj[weapon].basePower
      })
    }
  }
}
//add weapon objects into the weapons array.
pushWeapons(gameObjects.weapons)
//randomize the weapons array.
weapons = randomizeArr(weapons)

//Used to randomize the weapons array.
function randomizeArr(array) {
  const output = [];
  for(let ii = array.length; ii >= 0; ii--) {
    output.push(array.splice(randomizer(ii, 0), 1))
  }
  return output.reduce((previous, current) => {return previous.concat(current)}, [])
}

const options = {
  floorOne: {
    weapons: weapons.splice(0, weapons.length / 6),
    hearts: 3,
    enemies: [
      gameObjects.enemies.beast,
      gameObjects.enemies.darkElf,
      gameObjects.enemies.nymph,
      gameObjects.enemies.goblin,
      gameObjects.enemies.beast,
      gameObjects.enemies.nymph,
      gameObjects.enemies.goblin,
    ],
    stairs: 1
  },
  floorTwo: {
    weapons: weapons.splice(0, weapons.length / 3),
    hearts: 3,
    enemies: [
      gameObjects.enemies.demon,
      gameObjects.enemies.darkElf,
      gameObjects.enemies.rogue,
      gameObjects.enemies.demon,
      gameObjects.enemies.beast,
      gameObjects.enemies.nymph,
      gameObjects.enemies.goblin,
    ],
    stairs: 1
  },
  floorThree: {
    weapons: weapons.splice(0, weapons.length / 2),
    hearts: 3,
    enemies: [
      gameObjects.enemies.demon,
      gameObjects.enemies.darkElf,
      gameObjects.enemies.rogue,
      gameObjects.enemies.demon,
      gameObjects.enemies.shadow,
      gameObjects.enemies.darkElf,
      gameObjects.enemies.wraith,
    ],
    stairs: 1
  },
  floorFour: {
    weapons: weapons.splice(0, weapons.length / 2),
    hearts: 2,
    enemies: [
      gameObjects.enemies.wraith,
      gameObjects.enemies.shadow,
      gameObjects.enemies.shadow,
      gameObjects.enemies.demon,
      gameObjects.enemies.shadow,
      gameObjects.enemies.darkElf,
      gameObjects.enemies.wraith,
    ],
    stairs: 0
  },
}

function addOptions(optionsObj) {
  const output = [];

  optionsObj.weapons.forEach((weapon) => {output.push(item)});
  optionsObj.enemies.forEach((badguy) => {output.push(enemy)});

  for (let ii = 0; ii < optionsObj.hearts; ii++) {
    output.push(heart)//pushes a heart tileType each time.
  }
  if(optionsObj.stairs) {
    output.push(stair)//pushes a stair tileType
  }
  return output
}

const floorOneThings = addOptions(options.floorOne);
const floorTwoThings = addOptions(options.floorTwo);
const floorThreeThings = addOptions(options.floorThree);
const floorFourThings = addOptions(options.floorFour);

const maps = {
  floorOne: [
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],

    [0,1,1,1,1,1,0,1,1,1,0,0,0,0,1,1,1,1,1,0,0,0,0,0,0,1,0,0,0,0],
    [0,1,1,1,1,0,0,1,0,1,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0],
    [0,1,1,1,1,1,1,1,0,1,0,0,0,0,1,1,1,1,1,0,0,0,0,0,0,1,0,1,1,0],
    [0,0,1,1,1,0,0,0,1,1,1,1,1,1,1,0,0,0,1,1,0,0,0,0,0,1,0,0,1,0],
    [0,0,0,1,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,0],
    [0,1,1,1,1,1,1,0,1,0,0,1,1,1,1,1,1,0,0,1,1,1,1,1,0,0,0,0,0,0],
    [0,1,0,0,1,1,1,1,1,0,0,1,1,1,1,1,1,0,0,1,1,1,1,1,0,0,0,0,0,0],
    [0,1,1,1,1,1,1,0,1,0,0,0,0,0,1,0,0,0,0,0,0,0,1,1,1,1,1,0,0,0],
    [0,1,0,0,0,0,1,0,1,0,0,0,0,0,1,0,0,0,0,0,0,0,1,1,1,1,1,0,0,0],
    [0,1,1,0,0,0,1,1,1,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,1,1,1,1,0],
    [0,1,1,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0],
    [0,0,0,1,1,1,1,1,1,1,1,1,1,0,1,0,1,0,0,1,1,1,1,1,1,1,1,1,1,0],
    [0,0,0,0,1,0,0,0,1,0,0,0,1,1,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,0],
    [0,0,0,1,1,1,1,1,1,0,0,0,0,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1,1,0],
    [0,0,0,1,1,0,0,0,0,0,0,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1,1,0],
    [0,0,0,1,1,1,1,0,0,0,0,0,0,1,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,0],
    [0,0,1,1,0,0,1,1,1,1,1,1,1,1,1,1,0,0,0,1,1,1,1,1,1,1,1,1,1,0],
    [0,1,1,0,0,0,0,1,1,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0],

    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
  ],
  floorTwo: [
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],

    [0,1,0,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,0,0,0,0,0,0,1,0,1,1,1,0],
    [0,1,0,1,1,0,0,1,0,1,0,0,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,0],
    [0,1,1,1,1,1,1,1,0,1,0,1,1,0,1,1,1,1,1,0,0,1,0,1,0,1,0,1,1,0],
    [0,0,1,1,1,0,0,1,1,1,1,1,1,0,1,0,0,0,1,1,1,0,1,0,0,1,0,1,1,0],
    [0,0,0,1,0,0,0,0,1,0,0,0,0,0,1,0,0,0,0,1,1,1,1,1,1,1,1,1,1,0],
    [0,0,1,1,1,0,0,1,1,0,1,1,1,1,1,1,1,1,0,1,1,1,1,1,0,0,0,0,0,0],
    [0,1,1,0,1,1,1,1,1,0,0,1,1,0,0,0,0,1,1,1,1,1,1,1,0,0,0,0,0,0],
    [0,1,1,1,1,1,1,0,1,0,1,1,0,0,1,0,0,0,1,0,0,0,1,1,1,1,1,0,0,0],
    [0,1,0,0,0,1,1,0,1,0,1,0,0,0,1,1,1,1,1,1,0,0,1,1,1,1,1,0,0,0],
    [0,1,1,0,0,1,1,1,1,0,1,0,0,0,1,0,0,0,0,1,1,0,0,0,0,1,1,1,1,0],
    [0,1,1,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,0,0,0],
    [0,1,0,1,1,1,1,1,1,1,1,1,1,0,1,0,1,0,1,1,0,0,1,1,1,0,1,1,1,0],
    [0,0,0,0,1,0,0,0,1,0,1,0,1,1,0,0,0,0,1,1,1,1,1,1,0,0,0,1,1,0],
    [0,1,0,1,1,1,1,1,1,0,1,0,0,1,1,1,1,0,0,1,1,1,1,0,0,1,1,1,1,0],
    [0,1,0,1,1,0,0,0,0,1,0,1,1,1,1,1,1,1,0,1,1,1,0,0,1,1,1,1,1,0],
    [0,1,1,1,0,1,1,1,0,1,0,0,0,1,0,0,0,0,0,1,1,1,0,1,1,0,0,0,1,0],
    [0,0,0,1,0,0,0,1,1,1,1,1,1,1,1,1,0,0,0,1,1,1,0,0,0,1,1,0,1,0],
    [0,1,1,1,1,1,1,1,1,0,0,0,0,0,0,1,1,1,1,1,0,1,1,1,1,0,1,1,1,0],

    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
  ],
  floorThree: [
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],

    [0,0,0,0,1,1,1,1,1,1,1,1,1,0,0,0,1,1,0,1,1,1,1,1,1,1,1,1,1,0],
    [0,0,0,1,1,1,1,0,0,1,0,1,1,1,1,1,1,1,0,1,1,1,0,0,1,1,1,1,1,0],
    [0,0,1,1,0,1,1,1,0,1,0,0,0,0,0,0,0,0,0,1,1,1,0,1,1,0,0,0,1,0],
    [0,1,1,0,0,0,1,1,1,0,0,0,0,0,1,1,1,1,0,0,0,0,0,0,0,1,1,1,1,0],
    [0,1,1,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0],
    [0,1,0,0,1,1,1,1,1,1,1,1,1,0,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,0],
    [0,1,0,1,1,1,1,1,1,1,1,1,1,0,1,0,1,0,1,1,0,0,1,1,1,0,1,1,1,0],
    [0,0,0,0,1,0,0,0,1,0,1,0,1,1,0,0,0,0,1,1,1,1,1,1,0,0,0,1,1,0],
    [0,1,1,1,0,1,1,1,0,1,0,0,0,1,0,0,0,1,1,1,1,1,0,1,1,0,0,0,1,0],
    [0,0,0,1,0,0,0,1,1,1,1,1,1,1,1,1,0,0,0,1,1,1,0,0,0,0,1,0,1,0],
    [0,1,1,1,1,1,1,1,1,0,0,0,0,0,0,1,1,1,1,1,0,1,1,1,1,0,1,0,1,0],
    [0,1,0,1,1,1,1,1,0,0,0,1,1,1,1,1,1,0,0,1,1,1,1,0,0,1,1,0,1,0],
    [0,1,0,1,1,0,0,0,0,0,0,0,0,1,1,1,1,1,0,1,1,0,0,0,1,1,1,1,1,0],
    [0,1,0,0,0,0,1,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,1,1,1,1,1,0,0,0],
    [0,1,1,0,0,0,1,1,1,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0],
    [0,1,1,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0],
    [0,0,0,1,1,1,1,1,1,1,1,1,1,0,1,0,1,0,0,1,1,1,1,1,1,1,1,1,0,0],
    [0,0,0,0,1,0,0,0,1,0,0,0,1,1,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,0],

    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
  ],
  floorFour: [
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],

    [0,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,0,0,1,1,0,1,0],
    [0,1,0,1,1,0,1,0,0,0,0,0,0,0,0,1,1,1,0,1,1,0,1,0,1,1,1,1,1,0],
    [0,1,0,0,0,0,1,0,0,0,0,0,0,0,1,1,0,1,1,1,0,0,1,1,1,1,1,0,0,0],
    [0,1,1,0,0,0,1,1,1,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0],
    [0,0,1,1,0,1,1,1,0,1,0,0,1,1,1,1,1,1,0,1,1,1,0,1,1,1,0,0,1,0],
    [0,1,1,0,0,0,1,1,1,1,0,0,1,0,1,1,1,1,0,0,1,0,0,0,0,1,1,1,1,0],
    [0,1,0,0,1,1,1,0,0,0,0,0,1,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,0],
    [0,1,0,1,1,0,0,0,0,1,1,1,1,1,1,1,1,1,0,1,1,1,0,0,1,1,1,1,1,0],
    [0,0,1,1,1,0,0,0,1,1,1,1,1,1,1,0,0,1,1,1,0,0,0,0,0,1,0,0,1,0],
    [0,0,0,1,0,0,1,1,1,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,0],
    [0,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,0,0,0,1,1,1,1,0,0,0,0,0,1,0],
    [0,1,0,1,1,1,1,1,0,0,0,0,1,1,1,1,1,0,0,1,1,1,0,0,0,1,1,0,1,0],
    [0,1,0,0,1,0,1,0,0,0,0,0,0,1,1,1,1,1,0,1,1,0,0,0,0,1,1,1,1,0],
    [0,1,0,0,0,0,1,0,0,0,0,0,0,0,1,0,0,0,0,1,1,1,1,1,1,1,1,0,0,0],
    [0,1,1,0,0,0,1,1,1,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0],
    [0,1,1,1,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0],
    [0,0,0,1,1,1,1,1,1,1,1,1,1,0,0,0,1,1,0,0,1,1,0,0,1,1,1,1,0,0],
    [0,0,0,1,1,0,0,0,1,0,0,0,1,1,0,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0],

    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
  ]
}

function mapify(map2DArray) {
  //Take 2D array of 1s & 0s assign floor / wall tileTypes, X/Y coords and return a flattened array.
  return map2DArray.map((rowArr, yIndex) => {
     return rowArr.map((element, xIndex) => {
       return {
         tileType: element > 0 ? floor : wall,
         id: [xIndex * cellWidth, yIndex * cellWidth].join(','),
         xPos: xIndex * cellWidth,
         yPos: yIndex * cellWidth
       }
     })
  })
  .reduce((previousArr, currentArr)=> {return previousArr.concat(currentArr)}, [])
}

let firstFloor = mapify(maps.floorOne)
let secondFloor = mapify(maps.floorTwo)
let thirdFloor = mapify(maps.floorThree)
let fourthFloor = mapify(maps.floorFour)

//This function mutates the map array.
function insertGameObjects(flattenedFullMapArray, thingsArray, floorOptionsObject) {
  let floorTilesLength,
      numMatch,
      enemyCount = 0,
      itemCount = 0,
      heartCount = 0;
  //Replace some of the floor tiles with randomly inserted game objects.
  thingsArray.forEach((thingToAdd) => {

    floorTilesLength = flattenedFullMapArray.filter((element) => {return element.tileType.name == 'floor'}).length;
    numMatch = randomizer(floorTilesLength);

    flattenedFullMapArray.filter((element) => {
      return element.tileType.name == 'floor'
    })
      .map((tile, index) => {

        if(index === numMatch) {

          tile.tileType = thingToAdd;
          //assign a property to the tile object to pass 'enemy', 'weapon' etc.
          if(tile.tileType.name === 'enemy') {
            tile.enemy = floorOptionsObject.enemies[enemyCount];
            enemyCount++;

          } else if (tile.tileType.name === 'item') {
            tile.weapon = floorOptionsObject.weapons[itemCount];
            itemCount++;

          } else if (tile.tileType.name === 'heart') {
            tile.heart = {heart: 50}; // -TODO- replace this with an actual HEART object / Use the heart object from the game objects file.
            heartCount++;
          }

        }
      return tile;
    })
  })
}

insertGameObjects(firstFloor, floorOneThings, options.floorOne)
insertGameObjects(secondFloor, floorTwoThings, options.floorTwo)
insertGameObjects(thirdFloor, floorThreeThings, options.floorThree)
insertGameObjects(fourthFloor, floorFourThings, options.floorFour)

//old functions
{
  // (width/Columns/Arr[0].length, height/Rows/Arr.length)

  //unused function at the moment.
  function insertRoom(gameBoardGrid, room) {
    /*
      Example of a 3 x 4 room
      array[0].length = height
      array[0][0].length = width
      [
        [cell, cell, cell],
        [cell, cell, cell],
        [cell, cell, cell],
        [cell, cell, cell],
        [cell, cell, cell],
      ]
    */
    const boardHeight = gameBoardGrid.length
    const boardWidth = gameBoardGrid[0].length

    const roomHeight = room.length;
    const roomWidth = room[0].length

    const offsetX = randomizer(boardWidth - roomWidth);

    let offsetY = randomizer(boardHeight - roomHeight);

    console.log(room, offsetX, offsetY, roomHeight, roomWidth)

    //add more checks. EX: params are not arrays, all dimensions fit, etc.
    if(boardHeight >= roomHeight && boardWidth >= roomWidth) {
      for(let ii = 0; ii < roomHeight; ii++) {
          gameBoardGrid[offsetY].splice(offsetX, roomWidth, room[0])//cuts out a width of cells equal to the width of the room being inserted, then puts in that room's row array.
          gameBoardGrid[offsetY] = flattenArray(gameBoardGrid[offsetY])//flattens an array.
          offsetY++
      }
    } else {
      return gameBoardGrid;
    }
    return gameBoardGrid;
  }

  //unused function at the moment.
  function flattenArray(arr) {
    const output = [];
    for (let ii = 0; ii < arr.length; ii++) {
      if(Array.isArray(arr[ii]) ) {
        arr[ii].forEach(function(element) {output.push(element)})
      }  else {
        output.push(arr[ii])
      }
    }
    //console.log(output, 'this is in the flattenArray func')
    return output;
  }

  //unused function at the moment.
  function mapMaker(width, height, tileTypeObj) {
    if(width <= 0 || !Number(width)) {
      width = 1;
    }
    if(height <= 0|| !Number(height)) {
      height = 1;
    }
    const output2DArray = [];

    for (let ii = 0; ii < height; ii++) {
      output2DArray.push([]);

      for (let jj = 0; jj < width; jj++) {
        //output2DArray[ii].push(new Tile(jj, ii, [jj, ii].join(','), wall));

        output2DArray[ii].push({
          tileType: tileTypeObj
        })
      }
    }
    return output2DArray;
  }
}

const allMaps = [firstFloor, secondFloor, thirdFloor, fourthFloor]

const walkableTiles = allMaps.map((floorMap) => {return floorMap.filter((tile) => {return tile.tileType.walkable})})

const monsterTiles = allMaps.map((floorMap) => {return floorMap.filter((tile) => {return tile.enemy})})

export default {
  maps: allMaps,
  walkableTiles: walkableTiles,
  monsterTiles: monsterTiles
}
