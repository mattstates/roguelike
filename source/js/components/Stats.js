import React from 'react';
import './stats.sass'

const Stats = function(props) {
  return (
    <div className="game-info">
      <table className="stat-table">
        <tbody>
          <tr><td>Level: </td><td>⊱{props.level ? props.level : 0}⊰</td></tr>
          <tr><td>XP: </td><td>⊱{props.XP ? props.XP : 0}⊰</td></tr>
          <tr><td>Power: </td><td>⊱{props.power ? props.power : 0}⊰</td></tr>
          <tr><td>Dungeon Level: </td><td>⊱{props.floor + 1}⊰</td></tr>
        </tbody>
      </table>
    </div>
  )
}

export default Stats
