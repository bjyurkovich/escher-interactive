import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory } from 'react-router'
import Populator from './Populator';
import FrontPage from './FrontPage';
import EscherViewer from './EscherViewer';
import OrganismPage from './OrganismPage';
import './css/index.css';

ReactDOM.render(
  <Router onUpdate={() => window.scrollTo(0, 0)} history={browserHistory}>
    <Route path="/" component={FrontPage}></Route>
    <Route path="/populator" component={Populator}></Route>
    <Route path="/viewer" component={EscherViewer}></Route>
    <Route path="/organism" component={OrganismPage}></Route>
  </Router>,
  document.getElementById('root')
);
