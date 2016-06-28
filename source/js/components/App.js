import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import React from 'react';
//import store from '../reducers/reducers_index.js'
import { toggleTorch } from '../actions/actions_index.js'


import Body from './Body.js'
import Footer from './Footer.js'
import Header from './Header.js'

import { moveCharacter } from '../eventlisteners.js'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this)
  }

handleClick() {
  //dispatch(toggleTorch)
  this.props.toggleTorch()
  console.log('div was clicked')

}
  render() {

    addEventListener('keydown', moveCharacter)
    console.log(this.props)
    return (
      <div>
        <Header onClick={this.handleClick} />
        <Body
          characterPosition={this.props.properties.character.position} maps={this.props.properties.gamestate} playerInfo={this.props.properties.character}
        />
        <Footer />
      </div>
    )
  }

}

function mapStateToProps(state) {
  return {
    properties: state
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({toggleTorch}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
