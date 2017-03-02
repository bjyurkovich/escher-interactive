import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router'

const  = ({children, to, ...args}) => (
  <Link to={to}>children</Link>
)

export default Link
