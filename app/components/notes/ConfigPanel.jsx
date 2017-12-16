import React, { Component } from 'react'

export default class ConfigPanel extends Component {
  constructor (props) {
    super(props)

    this.state = {
      lowestNote: this.props.config.lowestNote,
      higherNote: this.props.config.higherNote,
      noteToPass: this.props.config.noteToPass,
      wishedNote: this.props.config.wishedNote
    }

    this._handleChange = this._handleChange.bind(this)
  }

  _handleChange (event) {
    this.setState({ [event.target.name]: event.target.value })

    this.props.onNewConfig(event.target.name, event.target.value)
  }

  render () {
    let lowestNote = this.state.lowestNote
    let higherNote = this.state.higherNote
    let noteToPass = this.state.noteToPass
    let wishedNote = this.state.wishedNote
    return (
      <div>
        Min note: <input type='text'
          value={lowestNote}
          onChange={event => this._handleChange(event)}
          name='lowestNote' />
        Max note: <input type='text'
          value={higherNote}
          onChange={event => this._handleChange(event)}
          name='higherNote' />
        Note to pass: <input type='text'
          value={noteToPass}
          onChange={event => this._handleChange(event)}
          name='noteToPass' />
        Note I wish: <input type='text'
          value={wishedNote}
          onChange={event => this._handleChange(event)}
          name='wishedNote' />
      </div>
    )
  }
}
