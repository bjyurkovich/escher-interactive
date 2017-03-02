import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import h from 'react-hyperscript'
import HorizontalView from './components/HorizontalView'
import VerticalView from './components/VerticalView'

import FileInput from 'react-file-input'
import Select, {Option, OptGroup} from 'rc-select';
import 'rc-select/assets/index.css';

import fetch from 'isomorphic-fetch'
import Promise from 'bluebird'

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      model:null
    }
  }

  setModel(fr){
    let m = JSON.parse(fr.result)
    this.setState({model:m})
    if(m.reactions == undefined){
      alert('Model file invalid')
      return
    }

    let reactionPromises = m.reactions.map(r=>{
      return this.populateReactionsFromApi(r.id)
    })
  }

  populateReactionsFromApi(reactionId){
    return fetch(`http://localhost:8001/bigg/reactions/${reactionId}`, {
      headers:{'Content-Type': 'application/json'},
      method:'get'
    }).then(res=>{
      res.json().then(json=>{

        let reactions = this.state.model.reactions

        for(let i=0;i<reactions.length;i++){
          if(reactions[i].id == json.name){
            Object.assign(this.state.model.reactions[i], this.state.model.reactions[i], json)
          }
        }

      })
    })

  }

  loadModelFile(event){
    let fr = new FileReader()
    let file = event.target.files[0]
    fr.onload = this.setModel.bind(this, fr)
    fr.readAsText(file);
  }

  render() {

    const { model } = this.state

    return h(VerticalView, {className:"App"}, [
      h(HorizontalView, {className:'header'}, [
        h(HorizontalView, 'Escher Descriptions Editor')
      ]),
      h(VerticalView, {style: {flex:0.2, width:400, border:'1px solid #ccc', padding:20}, className:'load-box'}, [
        h(HorizontalView, {style:{marginBottom:10}}, 'Load Map File'),
        h(FileInput, {
          name: "model_loader",
          accept:".json",
          className: 'file-loader',
          placeholder:"JSON model file",
          onChange:this.loadModelFile.bind(this)
        })
      ]),
      h(HorizontalView, [
        h(ReactionBox, {model}),
        h(MetaboliteBox)
      ])

    ])
  }
}


class ReactionBox extends Component {
  constructor(props) {
    super(props)
    this.state = {
      reactions:this.props.model,
      selected:{description:null,formula:null, ec_number:[], kegg_number:[], bigg_description:[]},
      description: null,
      formula:null,
      ecNumber:null,
      kegg_url:null,
      bigg:null
    }
  }

  selectItem(v){
    const { model } = this.props

    for(let i=0;i<model.reactions.length;i++){
      if(v == model.reactions[i].id){
        console.log(model.reactions[i])
        this.setState({selected:model.reactions[i]})
        break
      }

    }
  }

  updateItem(ev, ref){
    const { model } = this.props
    debugger
    console.log(ev)
    // for(let i=0;i<model.reactions.length;i++){
    //   if(ev.target == model.reactions[i].id){
    //     console.log(model.reactions[i])
    //     //this.setState({selected:model.reactions[i]})
    //     break
    //   }
    // }
  }

  render() {
    const { model } = this.props
    const { selected } = this.state

    if(model){
      return h(VerticalView, {style:{
        flex:0.5,
        padding:5
      }, className:'edit-box'}, [
        h(HorizontalView,  {className:'title'}, 'Reactions'),
        h(HorizontalView, {style:{flex:1}}, [
          h(Select, {onSelect:this.selectItem.bind(this), style:{ width: '100%' }}, model.reactions.map(r=>{
            return h(Option, {key: r.id, value: r.id}, r.id)
          })
        )]),
        h('label', 'Description'),
        h('input', {ref:'description', onChange:this.updateItem.bind(this, 'description'), placeholder:selected.description?selected.description:''}),
        h('label', 'Reaction Formula'),
        h('input', {ref:'formula', onChange:this.updateItem.bind(this), placeholder:selected.formula?selected.formula:''}),
        h('label', 'EC Number URL'),
        h('input', {ref:'ec_dscription', onChange:this.updateItem.bind(this), placeholder:selected.ec_number_description}),
        h('input', {ref:'ecNumber', onChange:this.updateItem.bind(this), placeholder:function(selected){
            if(selected.ec_number){
              if(selected.ec_number.length){
                return selected.ec_number[0]
              }else{
                return ''
              }
            }else{
              return ''
            }
        }(selected)}),
        h(HorizontalView, {style:{fontSize:10}}, selected.ec_number.map(e=>{
          return h(HorizontalView, e + ', ')
        })),
        h('label', 'Kegg URL'),
        h('input', {ref:'kegg_description', onChange:this.updateItem.bind(this), placeholder:selected.kegg_number_description}),
        h('input', {ref:'kegg', onChange:this.updateItem.bind(this), placeholder:selected.kegg_number}),
        h(HorizontalView, {style:{fontSize:10}}, selected.kegg_number.map(k=>{
          return h(HorizontalView, k + ', ')
        })),
        h('label', 'BiGG'),
        h('input', {placeholder:selected.bigg_description, ref:'bigg_dscription', onChange:this.updateItem.bind(this)}),
        h('input', {ref:'bigg_url', onChange:this.updateItem.bind(this), placeholder:selected.bigg_url})
      ])
    }

    return h(VerticalView, {style:{
      flex:0.5
    }, className:'edit-box'}, 'Loading...')

  }
}

class MetaboliteBox extends Component {
  render() {
    return h(VerticalView, {style:{
      flex:0.5
    }, className:'edit-box'}, [
      h(HorizontalView,  {className:'title'}, 'Metabolites')
    ])
  }
}

function clone(val){
  console.log(val)
  return typeof val == "string" ? (' ' + val).slice(1) : JSON.parse(JSON.stringify(val))

}

export default App;
