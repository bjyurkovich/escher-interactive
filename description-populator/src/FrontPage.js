import React, { Component } from 'react'
import './css/index.css'
import './css/frontpage.css'


import Menu from './components/Menu'
import { Link } from 'react-router'
import organisms from './assets/organisms'
import config from './config'

class FrontPage extends Component {

  constructor(props) {
    super(props)
    this.state = {
      config:null
    }
  }

  componentDidMount(){

  }

  render() {

    let boxes = organisms.map(o=>{
      return <Link key={o.id}  to={'/organism?id='+o.id}><div style={{fontStyle:o.isItalicized?'italic':'inherit'}} className={'map-box'}>
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
              <div className={'title'} style={{fontSize:40}}>Escher Interactive</div>
              <div>
                Escher Interactive is an extension of <a href="http://escher.github.io/" target="_blank">Escher</a>, a tool
                to build, share, and embed visualizations of biological pathways, developed by the <a href="http://systemsbiology.ucsd.edu/Home" target="_blank">Systems Biology Research Group</a> at UCSD. Escher
                Interactive adds the ability to automatically incoporate BiGG IDs, KEGG information, and PDB mappings with Escher maps, as well as the capability to
                upload your own data images into your visualizations based on the reactions and metabolites.

              </div>
            </div>
          </div>
          <div className={'section'}>
            <div className={'content'}>
              <div className={'title'}>Example Interactive Maps</div>
              <div>
                Click on a model to view the interactive map.
              </div>
              <div className={'mappings-container'}>

                {boxes}

              </div>
            </div>
          </div>
          <div className={'section'}>
            <div className={'content'}>
              <div className={'title'}>Want to use Escher Interactive for your own project?</div>
              <div>
                The <a href="http://bigg.ucsd.edu/" target="_blank">BiGG Database</a> houses several dozen models for a range of organisms. Download
                the model for your organism and use <a href="http://escher.github.io" target="_blank">Escher</a> to build a map. Once you have your map and
                map and model files, you can use the <Link to={'/populator'}>Escher Interactive Populator</Link> to
                populate your model with information from BiGG, KEGG, ChEBI, and PDB automatically.
                Then, head over to the <a href="#">Escher Interactive Github Page</a> to download the tool and visualize
                your reaction map.
              </div>
            </div>
          </div>
          <div className={'section'}>
            <div className={'content'}>
              <div className={'title'}>How to cite</div>
              <div>
                You can help support Escher Interactive by citing our publication when you use Escher Interactive or the Escher Interactive Populator:
                [CITATION GOES HERE]
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

export default FrontPage
