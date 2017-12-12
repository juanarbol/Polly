import React, { Component } from 'react'

export default class Result extends Component {

  render () {
    return (
      <span>
        Su total es esta mondá: {this.props.children}
      </span>
    )
  }
}
