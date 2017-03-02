import React, { Component } from 'react';
import '../css/index.css'
import { Link } from 'react-router'
import Icon from 'react-fontawesome'

class Menu extends Component {

  render(){
    return (
      <div className={'menu'}>
        <ul>
          <li><Link to={'/'}>About</Link></li>
          <li><Link to={'/populator'}>Populator</Link></li>
          <li><a>BiGG</a></li>
          <li><a><Icon name="github" size="2x"/></a></li>
        </ul>
      </div>
    )
  }
}

export default Menu
