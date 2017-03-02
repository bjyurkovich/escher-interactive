import React, { Component } from 'react'
import './css/index.css'
import './css/frontpage.css'

import { Link } from 'react-router'
import Menu from './components/Menu'
import organisms from './assets/organisms'
import config from './config'

class OrganismPage extends Component {

  constructor(props) {
    super(props)
    this.state = {
    }
  }

  getOrganismById(id){
    for(let i=0;i < organisms.length; i++){
      if(organisms[i].id === id){
        return organisms[i]
      }
    }
  }

  render() {

    const org = this.getOrganismById(this.props.location.query.id)

    let boxes = org.maps.map(o=>{
      return <a key={o.name} href={`${config.baseUrl}/interactive_maps/index.html?map=${o.mapUrl}&model=${o.modelUrl}&type=existing`}>
              <div className={'map-box'}>
                <div className={'box-title'}>{o.title}</div>
                <div className={'box-description'}>{o.description}</div>
                <img alt={o.title} src={`${config.baseUrl}/interactive_maps/${o.imageUrl}`} style={{width:200, marginBottom:-5}} />
                </div>
            </a>
    })

    let orgs = organisms.map(o=>{
      return <Link key={o.displayName}  to={'/organism?id='+o.id}><div style={{fontStyle:o.isItalicized?'italic':'inherit'}} className={'map-box'}>
        <div className={'box-title'}>{o.displayName}</div>
        <div className={'box-description'}>{o.description}</div>
        <img alt={o.displayName} src={`${config.baseUrl}/interactive_maps/${o.imageUrl}`} style={{width:200, marginBottom:-5}} />
      </div></Link>
    })

    return (
      <div>
        <div className={'header'}>
          <Menu />
          <div className={'logo'} />
        </div>
        <div style={{display:'flex', flexDirection:'column', margin:'0 auto', maxWidth:900}}>
          <div className={'section'}>
            <div className={'content'}>
              <div className={'title'} style={{fontSize:40, fontStyle:org.isItalicized?'italic':'inherit'}}>{org.displayName}</div>
              <div className={'mappings-container'}>
                {boxes}
              </div>
            </div>
          </div>

          <div style={{marginTop:40}} className={'section'}>
            <div className={'content'}>
              <div className={'title'}>Other Organisms</div>
              <div className={'mappings-container'}>
                {orgs}
              </div>
            </div>
          </div>

        </div>
        <div style={{display:'flex', height:50, justifyContent:'center', paddingTop:20}}>
          <div style={{margin:'0 auto', fontSize:'small'}}>&#169; 2016 Regents of the University of California. All Rights Reserved. </div>
        </div>
      </div>

    )
  }
}

export default OrganismPage
