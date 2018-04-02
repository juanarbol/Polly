/**
 * @author Juan José Arboleda
 * @desc In this component we're gonna
 * print the inputs for note and percentage
 */
import React, { Component } from 'react'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import Done from 'material-ui/svg-icons/action/done'

export default class NotesInput extends Component {
  constructor (props) {
    super(props)

    // we only need to save
    // the inputs values
    this.state = {
      note: '',
      percentage: ''
    }

    //  event handlers
    this._handleSubmit = this._handleSubmit.bind(this)
    this._handleChangeOf = this._handleChangeOf.bind(this)
    this._maxPercent = this._maxPercent.bind(this)
    this._anyInputEmpty = this._anyInputEmpty.bind(this)
    this._disableForm = this._disableForm.bind(this)
  }

  /**
   * @method _handleSubmit() for manage submitted values
   * @param {event} event
   * as first, we do not refresh the page
   * then, we notify to parent (<Main />)
   * a new note has been inserted,
   * then, we recalculate the maximun percent for
   * the new note
   * finally we reset inputs values
   */
  _handleSubmit (event) {
    event.preventDefault()

    let note = this.state.note
    let percentage = this.state.percentage

    this.props.onNewNote({ note, percentage })
    this._maxPercent()
    this.setState({ note: '', percentage: '' })
  }

  /**
   * @method _handleChangeOf() change inputs state
   * @param {string} input name of input changed
   * @param {string} newValue new value of input changed
   * With this method, we handle both inputs changes
   * we recive the name of the input (note or percentage)
   * and his current value, finllay we set his state, that's it!
   */
  _handleChangeOf (input, newValue) {
    this.setState({ [input]: newValue })
  }

  /**
   * This method will return the maximun percentage of a note
   * @method _maxPercent() this tell us the maximun note's
   * percent
   * @returns {number}
   */
  _maxPercent () {
    return 100 - this.props.currentPercent
  }

  /**
   * Return boolean that tell us if there's an
   * empty input
   * @param {number} noteInput value of noteInput
   * @param {number} percentageInput value of percantageInput
   * @returns {boolean}
   */
  _anyInputEmpty (noteInput, percentageInput) {
    return noteInput.length === 0 || percentageInput.length === 0
  }

  /**
   * Returns a boolean that tell us if the fieldset should be disabled
   * @method _disableForm() Disable the fieldset when 100% of
   * notes is complete
   * @returns {boolean}
   */
  _disableForm () {
    let totalPercent = Number(this.props.currentPercent)
    return totalPercent === 100
  }

  render () {
    require('./notes-input.scss')
    let note = this.state.note
    let percentage = this.state.percentage
    let anyInputEmpty = this._anyInputEmpty
    let minNote = this.props.config.lowestNote
    let maxNote = this.props.config.higherNote

    return (
      <form onSubmit={this._handleSubmit}>
        <div class='form-container'>
          <TextField type='number'
            autoFocus
            floatingLabelText='Escribe tu nota'
            value={note}
            onChange={event => this._handleChangeOf('note', event.target.value)}
            min={minNote}
            max={maxNote}
            step='0.01'
            disabled={this._disableForm()}
            ref={(input) => { this.noteInput = input }}
            className='form-control'
          />
          <TextField type='number'
            floatingLabelText='Escribe el porcentaje de la nota'
            value={percentage}
            onChange={event => this._handleChangeOf('percentage', event.target.value)}
            max={this._maxPercent()}
            min='0'
            step='1'
            disabled={this._disableForm()}
            className='form-control'
          />
          <RaisedButton
            primary
            icon={<Done />}
            type='submit'
            value='Submit'
            disabled={anyInputEmpty(note, percentage)}
            className='form-control'
          />
        </div>
      </form>
    )
  }
}
