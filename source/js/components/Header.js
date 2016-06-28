import React from 'react';
import './header.sass'

const Header = function(props) {
  console.log(props)
  return (
    <div className="header">
      <span onClick={props.onClick}>🔥</span> Roguelike Dungeon Crawler <span onClick={props.onClick}>🔥</span>
    </div>
  )
}

export default Header
