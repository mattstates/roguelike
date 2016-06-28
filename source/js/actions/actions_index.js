/*
THINGS TO HANDLE:
Character Moves
    -- Check the position against walkable tiles,
      -then update state.

Character Fights
    --Update Character HP
    --Update Enemy HP

Character Wins Fight
    --Update Character XP
    --Remove Enemy from Map

Character Loses Fight (HP <= 0)
    --GAME OVER
    --Full Reset

Character Levels Up
    --Update Character Level
    --Update Character basePower
    --Update Character HP

Character Walks on Treasure
    --Update Character Weapon
    --Remove Treasure from Map

Character Walks on heart
    --Update Character HP
    --Remove Heart from Map

Character Walks on stairs
    --Update Floor Map Level

Map is lit
    --Show all tiles
*/


export const changeCharacterPosition = (coords) => {
    return {type: 'MOVE_CHARACTER', payload: coords}
  }

export const updateWeapon = (weaponName) => {
    return {type: 'UPDATE_WEAPON', payload: weaponName}
  }

export const updateLife = (amount) => {
  return {type: 'UPDATE_LIFE', payload: amount}
}

export const updateDungeonFloor = (amount) => {
  return {type: 'UPDATE_DUNGEON_FLOOR', payload: amount}
}

export const updateBasePower = (amount) => {
  return {type: 'UPDATE_BASE_POWER', payload: amount}
}

export const updateEnemyLife = (amount, floor, tileID) => {
  return {type: 'UPDATE_ENEMY_LIFE', payload: { amount, floor, tileID }}
}

export const changeFloorTile = (tileObj, currentFloor) => {
  return {type: 'CHANGE_FLOOR_TILE', payload: { tileObj, currentFloor }}
}

export const updateXP = (amount) => {
  return {type: 'UPDATE_XP', payload: amount}
}

export const updateLevel = (amount) => {
  return {type: 'UPDATE_LEVEL', payload: amount}
}

export const toggleTorch = () => {
  return {type: 'TOGGLE_TORCH'}
}
