import React from 'react';
import './character.sass'

const Character = (props) => {

  const charStyle = {
    backgroundImage: 'url(' + '../source/images/fighterOne.gif' + ')',
    top: props.characterPosition[1],
    left: props.characterPosition[0]
  }

  return (
    <div className="character" style ={charStyle} ><span className={props.light ? '' : 'char-span'}></span></div>
  )
}

export default Character
