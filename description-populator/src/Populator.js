import React, { Component } from 'react';
import './css/index.css'
import './css/landing.css'
import fetch from 'isomorphic-fetch'
import Promise from 'promise'
import Menu from './components/Menu'
import Icon from 'react-fontawesome'
import config from './config'

class Populator extends Component {

  constructor(props) {
    super(props)
    this.state = {
      model:null,
      reactionLoadingMessage:'',
      metaboliteLoadingMessage:'',
      allReactionsDone: false,
      allMetabolitesDone: false,
      totalNumberOfReactions:100,
      totalNumberOfMetabolites:100,
      currentReactionNumber:0,
      currentMetaboliteNumber:0,
      downloaded:false
    }
  }

  //Once model file is loaded, tee it up
  setModel(fr){
    let m = JSON.parse(fr.result)
    if(m.reactions === undefined){
      alert('Model file invalid')
      return
    }

    //Sets the localStorage to the model file
    window.localStorage.setItem('model', fr.result)

    //Track length for progress bars
    this.setState({model:m,
      totalNumberOfReactions:m.reactions.length,
      totalNumberOfMetabolites: m.metabolites.length
    })

    // Get all reaction promises and process
    Promise.all(m.reactions.map(r=>{
      return this.populateReactions(r.id)
    })).then(rs=>{
      this.setState({allReactionsDone:true, reactionLoadingMessage:'Complete'})
    })

    // Get al metabolite promises and process
    Promise.all(m.metabolites.map(m=>{
      return this.populateMetabolites(m.id)
    })).then(ms=>{
      this.setState({allMetabolitesDone:true, metaboliteLoadingMessage:'Complete'})
    })
  }

  // Do the BiGG API scrape for reactions
  populateReactions(reactionId){
    return new Promise((resolve, reject)=>{
      fetch(`${config.baseUrl}/bigg/reactions/${fixReactionName(reactionId)}`, {
        headers:{'Content-Type': 'application/json'},
        method:'get'
      }).then(res=>{
        res.json().then(json=>{
          let reactions = this.state.model.reactions
          this.setState({reactionLoadingMessage:json.name})
          for(let i=0;i<reactions.length;i++){
            if(fixReactionName(reactions[i].id) === json.name){
              let obj = Object.assign(this.state.model.reactions[i], this.state.model.reactions[i], json)
              this.setState({currentReactionNumber:this.state.currentReactionNumber + 1})
              return resolve(obj)
            }
          }
        })
      })
    })
  }

  // Do BiGG API scrape for metabolites
  populateMetabolites(metaboliteId){
    return new Promise((resolve, reject)=>{
      fetch(`${config.baseUrl}/bigg/metabolites/${fixMetaboliteName(metaboliteId)}`, {
        headers:{'Content-Type': 'application/json'},
        method:'get'
      }).then(res=>{
        res.json().then(json=>{
          let metabolites = this.state.model.metabolites
          this.setState({metaboliteLoadingMessage:json.name})
          for(let i=0;i<metabolites.length;i++){
            if(fixMetaboliteName(metabolites[i].id) === json.name){
              this.setState({currentMetaboliteNumber:this.state.currentMetaboliteNumber + 1})
              return resolve(Object.assign(this.state.model.metabolites[i], this.state.model.metabolites[i], json))
            }
          }
        })
      })
    })
  }

  // Load the model file handler
  loadModelFile(event){
    let fr = new FileReader()
    let file = event.target.files[0]
    fr.onload = this.setModel.bind(this, fr)
    fr.readAsText(file)
    this.setState({reactionLoadingMessage:'Setting up...'})
  }

  // Load the map file handler
  loadMapFile(event){
    let fr = new FileReader()
    let file = event.target.files[0]
    fr.onload = ()=>{
      console.log(fr.result)
      window.localStorage.setItem('map', fr.result)
      //GOTO Escher Interactive
      window.location.href='/viewer'
    }
    fr.readAsText(file)
  }

  // Does the export of the model file
  downloadModel(){
    var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(this.state.model));
    var dlAnchorElem = document.getElementById('downloadAnchorElem');
    dlAnchorElem.setAttribute("href",     dataStr     );
    dlAnchorElem.setAttribute("download", "model.json");
    dlAnchorElem.click();
    this.setState({downloaded:true})

  }

  render() {

    const {
      model,
      allReactionsDone,
      allMetabolitesDone,
      currentReactionNumber,
      totalNumberOfReactions,
      currentMetaboliteNumber,
      totalNumberOfMetabolites,
      reactionLoadingMessage,
      metaboliteLoadingMessage
    } = this.state

    if (allReactionsDone && allMetabolitesDone){
      console.log(model)
      window.localStorage.setItem('model', JSON.stringify(model))
    }

    return (
      <div>
        <Menu />
        <div style={{marginTop:100, display:'flex'}}>
          <div className={'logo-landing'}></div>
          <div style={{display:'flex', flex:2, flexDirection:'column', paddingLeft:30, paddingRight:130}}>
            <div style={{fontSize:'x-large', color:'rgb(36,121,180)', marginBottom:20}}>Step 1:  Upload your model file</div>
            <input type={"file"} onChange={this.loadModelFile.bind(this)} />
            <div style={{padding:10,background:'whitesmoke', marginTop:20, borderRadius:10}}>

              <div style={{fontSize:'small'}}>Reaction Populating Progress </div>
              <ProgressBar percentDone={currentReactionNumber/totalNumberOfReactions} text={reactionLoadingMessage} />

              <div style={{height:10}}></div>

              <div style={{fontSize:'small'}}>Metabolite Populating Progress </div>
              <ProgressBar percentDone={currentMetaboliteNumber/totalNumberOfMetabolites} text={metaboliteLoadingMessage} />
              <div style={{height:10}}></div>
            </div>
            <div style={{height:10}}></div>
            <div style={{fontSize:'x-large', color:'rgb(36,121,180)'}}>Step 2:  Download your populated model file</div>

            <div style={{display:'flex', alignItems:'center', marginTop:10}}>
              <div>
                <button style={{
                  opacity: allReactionsDone && allMetabolitesDone ? 1 : 0.2,
                  marginTop:5,
                  width:250
                }} disabled={allReactionsDone && allMetabolitesDone ? false : true} onClick={this.downloadModel.bind(this)}>Download</button>
                <a id={'downloadAnchorElem'}></a>
              </div>
              <div style={{padding:'0 10px 0 10px'}}> or </div>
              <div style={{display:'flex', flexDirection:'column'}}>
                <div style={{fontSize:'small', marginBottom:5}}>View in Escher Interactive by also uploading your map file.</div>
                <input disabled={allReactionsDone && allMetabolitesDone ? false : true} type={'file'} onChange={this.loadMapFile.bind(this)}/>
              </div>
            </div>

            <div style={{display: this.state.downloaded ? 'block' : 'none'}}>
              <div style={{height:30}}></div>
              <div style={{fontSize:'x-large', color:'rgb(36,121,180)'}}>Step 3:  Go Visualize</div>
              <button style={{
                marginTop:20,
                width:250
              }}><Icon name={"github"} size={"2x"} /></button>
            </div>

          </div>
        </div>
      </div>

    )

  }
}


const ProgressBar = ({percentDone=0, text=''}) => (
  <div style={{width:'100%', height:30, background:'white', border:'1px solid #ccc'}}>
    <div style={{width:percentDone*100 + '%', height:30, background:'#91c09e'}}>
      <div style={{width:600, display:'flex', color:percentDone < 0.1 ? 'gray':'white', padding:5, fontSize:'small'}}>
        <div style={{width:300, display:'flex'}}>{`${text}`}</div>
        <div style={{color:percentDone < 0.51 ? 'gray':'white'}}>{`${parseInt(percentDone*100, 10)}%`}</div>
      </div>
    </div>
  </div>
)


// Fix the metabolite and reaction names from stuff in model to what BiGG can read
function fixMetaboliteName(metName){
  return metName
  // return metName.replace("[c]", "")
  //            .replace("[e]", "")
  //            .replace("[m]", "")
  //            .replace("[x]", "")
  //            .replace("[r]", "")
  //            .replace("(c)", "")
  //            .replace("(e)", "")
  //            .replace("(m)", "")
  //            .replace("(x)", "")
  //            .replace("(r)", "")
  //            .replace("-", "__")
}

function fixReactionName(rName){
  return rName
  // return rName.replace("[c]", "")
  //           .replace("[e]", "")
  //           .replace("[m]", "")
  //           .replace("[x]", "")
  //           .replace("[r]", "")
  //           .replace("(c)", "")
  //           .replace("(e)", "")
  //           .replace("(m)", "")
  //           .replace("(x)", "")
  //           .replace("(r)", "")
  //           .replace("-", "__")
}

export default Populator;
