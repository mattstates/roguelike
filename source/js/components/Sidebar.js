import React from 'react';

import HitPoints from './HitPoints.js'
import Name from './Name.js'
import Stats from './Stats.js'
import Weapon from './Weapon.js'

import './sidebar.sass'

const Sidebar = function(props) {
  return (
    <div className="sidebar">
      <h1>Status</h1>
      <h2>Name:</h2>
      <Name name={props.playerInfo.name} />

      <h2>HP:</h2>
      <HitPoints lifeTotal={props.playerInfo.HP} />

      <h2>Weapon:</h2>
      <Weapon weapon={props.playerInfo.weapon} />

      <h2>Stats:</h2>
      <Stats level={props.playerInfo.level} floor={props.playerInfo.floor} XP={props.playerInfo.XP} power={props.playerInfo.basePower} />
    </div>
  )
}

export default Sidebar
