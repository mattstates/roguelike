import React from 'react';

import Character from './Character.js'
import './screen.sass'

const Screen = function(props) {
  const tiles = props.currentMap.reduce(function(previous, current) {
    return previous.concat(current)
  }, []).map((cell)=> {

    return (
      <span className={cell.tileType.name} style={{backgroundImage: 'url(' + '../source/images/' + cell.tileType.name + '.gif' + ')'}} id={cell.id} key={cell.tileType.name + cell.id} tileType={cell.tileType} xPos={cell.xPos} yPos={cell.yPos}></span>
    )
  })

  return (
    <div className="screen">
      <Character light={props.playerInfo.light} characterPosition={props.characterPosition}/>
      {tiles}
    </div>
  )
}

export default Screen
