import React, { Component } from 'react'

export default class NotesInput extends Component {
  constructor (props) {
    super(props)

    this.state = {
      note: '',
      percentage: ''
    }

    this._handleSubmit = this._handleSubmit.bind(this)
    this._handleChangeOf = this._handleChangeOf.bind(this)
  }

  _handleSubmit (event) {
    event.preventDefault()

    let note = this.state.note
    let percentage = this.state.percentage

    this.props.onNewNote({ note, percentage })
    this.setState({ note: '', percentage: '' })
  }

  _handleChangeOf (input, newValue) {
    this.setState({ [input]: newValue })
  }

  render () {
    let note = this.state.note
    let percentage = this.state.percentage
    return (
      <form onSubmit={this._handleSubmit}>
        <label>
          Note:
          <input type='number' value={note} onChange={event => this._handleChangeOf('note', event.target.value)} min='0' step='0.1' />
          Percentage:
          <input type='number' value={percentage} onChange={event => this._handleChangeOf('percentage', event.target.value)} min='0'step='5' />
        </label>
        <input type='submit' value='Submit' />
      </form>
    )
  }
}
