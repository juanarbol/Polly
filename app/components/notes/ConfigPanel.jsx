import React, { Component } from 'react'

import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import Done from 'material-ui/svg-icons/action/done'
import TextField from 'material-ui/TextField'

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
    this._newConfig = this._newConfig.bind(this)
  }

  _handleChange (event) {
    this.setState({ [event.target.name]: event.target.value })
  }

  _newConfig () {
    this.props.onNewConfig(this.state)
  }

  render () {
    require('./config-panel.scss')
    const actions = [
      <FlatButton
        primary
        keyboardFocused
        icon={<Done />}
        onClick={this._newConfig}
      />
    ]

    let lowestNote = this.state.lowestNote
    let higherNote = this.state.higherNote
    let noteToPass = this.state.noteToPass
    let wishedNote = this.state.wishedNote

    return (
      <Dialog
        title='Configuración'
        actions={actions}
        modal={false}
        open={this.props.open}
        onRequestClose={this.props.onToggleMenu}
        className='config-panel-modal'
      >
        <TextField type='number'
          floatingLabelText='Nota mínima'
          value={lowestNote}
          onChange={event => this._handleChange(event)}
          name='lowestNote'
        />
        <TextField type='number'
          floatingLabelText='Nota máxima'
          value={higherNote}
          onChange={event => this._handleChange(event)}
          name='higherNote'
        />
        <TextField type='number'
          floatingLabelText='Nota para aprobar'
          value={noteToPass}
          onChange={event => this._handleChange(event)}
          name='noteToPass'
        />
        <TextField type='number'
          floatingLabelText='Nota que deseo'
          value={wishedNote}
          onChange={event => this._handleChange(event)}
          name='wishedNote'
        />
      </Dialog>
    )
  }
}
