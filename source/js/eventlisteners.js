import store from './reducers/reducers_index.js'
import { changeCharacterPosition } from './actions/actions_index.js'
import { updateWeapon } from './actions/actions_index.js'
import { updateLife } from './actions/actions_index.js'
import { updateDungeonFloor } from './actions/actions_index.js'
import { updateBasePower } from './actions/actions_index.js'
import { updateEnemyLife } from './actions/actions_index.js'
import { changeFloorTile } from './actions/actions_index.js'
import { updateXP } from './actions/actions_index.js'
import { updateLevel } from './actions/actions_index.js'

import { randomizer } from './helpers.js'

let currentStore;

const moveChecker = (nextCoordsArr, legalMovesArr) => {
  for(let ii = 0; ii < legalMovesArr.length; ii++) {
    if(legalMovesArr[ii].xPos === nextCoordsArr[0] && legalMovesArr[ii].yPos === nextCoordsArr[1]) {
      return true
    }
  }
  return false
}

const sendCoords = (coords, walkable, monsters) => {
  const currentFloor = store.getState().character.floor
  const currentState = store.getState();

  if( moveChecker(coords, walkable) ) {
    store.dispatch(changeCharacterPosition(coords))

    let tile = walkable.filter( (tile) => {
      return (tile.xPos == coords[0] && tile.yPos == coords[1])
      }
    )[0];
    // HANDLE WALKING ON STAIRS //
    if(tile.tileType.name === 'stair') {

      store.dispatch(updateDungeonFloor(store.getState().character.floor + 1))

      const nextFloorWalkables = store.getState().gamestate.walkableTiles[currentFloor + 1]
      const startingPos = randomizer(nextFloorWalkables.length);

      store.dispatch(changeCharacterPosition([nextFloorWalkables[startingPos].xPos,nextFloorWalkables[startingPos].yPos]))
    }

    tile.tileType = {...tile.tileType, name: 'floor'};

    // HANDLE WALKING ON WEAPON/CHESTS TILES //
    if (tile.weapon) {
      console.log('you stepped on a weapon')
      store.dispatch(updateWeapon(tile.weapon.name))
      store.dispatch(updateBasePower(Math.ceil(tile.weapon.basePower / (5 - currentFloor + 1) * (currentState.character.level + 1))))

      delete tile['weapon'];
    }
    // HANDLE WALKING ON HEART TILES //
    else if (tile.heart) {
      console.log('you stepped on a heart')
      store.dispatch(updateLife(Math.ceil(tile.heart.heart / (5 - currentFloor + 1) )))
      delete tile['heart'];
    }
  } //END MOVE CHECKER == TRUE

  // HANDLE ENEMY ENCOUNTERS //
  else if ( moveChecker(coords, monsters) ) {
    let tile = monsters.filter( (tile) => {
      return (tile.xPos == coords[0] && tile.yPos == coords[1])
      }
    )[0];
    const enemyAttackDmg = tile.enemy.attack(currentFloor + 1)
    store.dispatch(updateLife(-enemyAttackDmg))
    store.dispatch(updateEnemyLife(currentState.character.basePower, currentFloor, tile.id))
    if( currentState.character.HP - enemyAttackDmg <= 0 ) {
      alert(currentState.character.name + ' has fallen. Click "OK" to try again.')
      // --TODO-- REPLACE THIS WITH A REAL STATE RESET SO THE PAGE WILL NOT RELOAD.
      document.location.reload(true)
    }

    // HANDLE ENEMY DEATH //
    if( tile.enemy.baseHP <= 0 ) {
        if(tile.enemy.name === 'Demon' && currentFloor === 3) {
        alert('You are very brave and have guided ' + currentState.character.name + ' to vanquish the evil demonlord. There\'s no music or fanfare, but you can play again by clicking "OK".')
        // --TODO-- REPLACE THIS WITH A REAL STATE RESET SO THE PAGE WILL NOT RELOAD. Also, add music and fanfare.
        document.location.reload(true)
      }

      store.dispatch(updateXP(Math.ceil(currentState.character.XP + tile.enemy.baseXP / (currentFloor + 1))))
      const levelSetter = Math.floor(store.getState().character.XP / 65 )
      store.dispatch(updateLevel(levelSetter))

      // HANDLE LEVELING UP
      if(levelSetter !== currentState.character.level) {
        store.dispatch(updateLife(30 * levelSetter))
        store.dispatch(updateBasePower(15 * levelSetter))
      }

      let updatedTile = {...tile, tileType: { walkable: true, name: 'floor' } }
      delete updatedTile['enemy']

      store.dispatch(changeFloorTile(updatedTile, currentFloor))

    }
  }

}

// IMPORTED TO APP COMPONENT //
export function moveCharacter(event) {
  event.preventDefault();

  currentStore = store.getState();

  let xPos = currentStore.character.position[0];
  let yPos = currentStore.character.position[1];
  let currentFloor = currentStore.character.floor;
  let walkableTiles = currentStore.gamestate.walkableTiles[currentFloor];
  let monsterTiles = currentStore.gamestate.monsterTiles[currentFloor];

  //Move Up
  if((event.keyCode == 87) || (event.keyCode == 38)) {
    yPos = yPos - 30 >= 0 ? yPos - 30 : 0;
    sendCoords([xPos, yPos], walkableTiles, monsterTiles);
  }

  //Move Down
  else if((event.keyCode == 83) || (event.keyCode == 40)) {
    yPos = yPos + 30 <= 570 ? yPos + 30 : 570;
    sendCoords([xPos, yPos], walkableTiles, monsterTiles);
  }

  //Move Left
  else if((event.keyCode == 65) || (event.keyCode == 37)) {
    xPos = xPos - 30 >= 0 ? xPos - 30 : 0;
    sendCoords([xPos, yPos], walkableTiles, monsterTiles);
  }

  //Move Right
  else if((event.keyCode == 68) || (event.keyCode == 39)) {
    xPos = xPos + 30 <= 870 ? xPos + 30 : 870;
    sendCoords([xPos, yPos], walkableTiles, monsterTiles);
  }
}
