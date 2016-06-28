import React from 'react';
import Screen from './Screen'
import Sidebar from './Sidebar'
import { connect } from 'react-redux'

import './body.sass'

const Body = function(props) {
  return (
    <div className="body">
      <Screen
        characterPosition={props.characterPosition}
        currentMap={props.maps.maps[props.playerInfo.floor]}
        playerInfo={props.playerInfo}
      />
      <Sidebar playerInfo={props.playerInfo} />
    </div>
  )
}

export default Body;
