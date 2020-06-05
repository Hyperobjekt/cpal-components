import React, { Component } from 'react'
import { render } from 'react-dom'

import 'bootstrap/dist/css/bootstrap.min.css'

import Explorer from '../../src'

export default class Demo extends Component {
  render() {
    return <Explorer />
  }
}

render(<Demo />, document.querySelector('#demo'))
