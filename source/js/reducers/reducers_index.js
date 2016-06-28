import { combineReducers, createStore } from 'redux';
import gameBoard from '../gameboard.js'
import gameObjects from '../gameobjects.js';
import { randomizer } from '../helpers.js'

const startingPos = randomizer(gameBoard.walkableTiles[0].length)

gameObjects.hero.position = [gameBoard.walkableTiles[0][startingPos].xPos, gameBoard.walkableTiles[0][startingPos].yPos]

const defaultCharacter = gameObjects.hero;
/*
  {
    name: nameGenerator(),
    level: 0,
    XP: 0,
    basePower: 20,
    weapon: 'Fists',
    HP: 30,
    position: [],
    floor: 0
  }
*/

const defaultGamestate = gameBoard

const characterReducer = (state = defaultCharacter, action) => {

  switch(action.type) {
    case 'MOVE_CHARACTER':
      state = {...state, position: action.payload}
      return state
    case 'UPDATE_WEAPON':
      state = {...state, weapon: action.payload}
      return state
    case 'UPDATE_LIFE':
      state = {...state, HP: (parseInt(state.HP) + parseInt(action.payload))}
      return state
    case 'UPDATE_DUNGEON_FLOOR':
      state = {...state, floor: action.payload}
      return state
    case 'UPDATE_BASE_POWER':
      state = {...state, basePower: action.payload}
      return state
    case 'UPDATE_XP':
      state = {...state, XP: action.payload}
      return state
    case 'UPDATE_LEVEL':
      state = {...state, level: action.payload}
      return state
    case 'TOGGLE_TORCH':
      state = {...state, light: !state.light}
      return state
    default:
      return state
  }
}

const gameReducer = (state = defaultGamestate, action) => {
  switch(action.type) {
    case 'UPDATE_ENEMY_LIFE':
      const updatedMap = state.maps[action.payload.floor].map( (tile)=> {
        if(tile.id === action.payload.tileID) {
          tile.enemy.baseHP = tile.enemy.baseHP - action.payload.amount
          return tile
          }
          return tile;
        })
      state = {...state,
        maps: [
        ...state.maps.map( (mapArray, index) => {
          if(index === action.payload.floor) {
            return updatedMap;
          }
          return mapArray
        })
      ]
    }
      return state

    case 'CHANGE_FLOOR_TILE':
      state = {...state,
        maps: [
          ...state.maps.map( (mapArray, index) => {
            if(index === action.payload.currentFloor) {
              return mapArray.map( (innerMapTile) => {
                if(innerMapTile.id === action.payload.tileObj.id) {
                  return action.payload.tileObj
                }
                return innerMapTile
              })
            }
            return mapArray
          })
        ]};

        state = {...state,
          walkableTiles: [
          ...state.walkableTiles.map( (mapArray, index) => {
            if(index === action.payload.currentFloor) {
              return state.maps[index].filter( (tile) => {
                return tile.tileType.walkable;
              })
            }
            return mapArray;
          })
        ],
        monsterTiles: [
          ...state.monsterTiles.map( (mapArray, index) => {
            if(index === action.payload.currentFloor) {
              return state.maps[index].filter( (tile) => {
                return tile.enemy;
              })
            }
            return mapArray;
          })
        ]
      }
      return state
    default:
      return state
  }
}


const reducers = combineReducers({

  gamestate: gameReducer,
  character: characterReducer

})

const store = createStore(reducers)

export default store
