import React, { Component } from 'react'
import './css/index.css'
import './css/frontpage.css'
// import fetch from 'isomorphic-fetch'
import Menu from './components/Menu'
import config from './config'

class EscherViewer extends Component {

  constructor(props) {
    super(props)
    this.state = {
    }
  }

  doMessagePost(){
    let model = window.localStorage.getItem('model')
    let map = window.localStorage.getItem('map')
    let escherFrame = document.getElementsByTagName('iframe')[0].contentWindow;
    escherFrame.postMessage(model, '*')
    escherFrame.postMessage(map, '*')
  }

  componentDidMount(){
    document.getElementById('root').style.height = '100%'
    document.getElementsByTagName('body')[0].style.height = '100%'
    document.getElementsByTagName('html')[0].style.height = '100%'
    document.getElementsByTagName('iframe')[0].onload = this.doMessagePost.bind(this)
    //setTimeout(this.doMessagePost.bind(this), 2000)


  }

  render() {
    return (
      <div style={{width:'100%', height:'100%', background:'whitesmoke'}}>
        <Menu />
        <iframe id="iframe" style={{height:'92%', width: '100%', paddingTop:60}} src={`${config.baseUrl}/interactive_maps/index.html?type=populator`}></iframe>
      </div>

    )
  }
}

export default EscherViewer
