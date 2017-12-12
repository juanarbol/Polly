/**
 * @author Juan José Arboleda
 * @desc In this component we're gonna
 * print the inputs form, list of notes typed
 * and the average of this notes
 */
import React, { Component } from 'react'
import { render } from 'react-dom'

import NotesContainer from './NotesContainer.jsx'
import NotesInput from './NotesInput.jsx'
import Result from './Result.jsx'

export default class Main extends Component {
  constructor () {
    super()

    // The state will be lifted by child components
    // we need to save average of notes objects
    this.state = {
      notes: [],
      average: ''
    }

    this._appendThis = this._appendThis.bind(this)
    this._calculateAverageOf = this._calculateAverageOf.bind(this)
  }

  /**
   * This method will update state
   * pushing a new note without mutating state
   * and calculate average
   * @param {Object} newNote Is an object with note value and percentage
   */
  _appendThis (newNote) {
    let notes = [...this.state.notes, newNote]
    this.setState({ notes })
    this._calculateAverageOf(notes)
  }

  /**
   * This method will calculate average
   * and modify state of current average
   * @param {Object[]} notes Array with all notes objects
   */
  _calculateAverageOf (notes) {
    let average = 0
    notes.map(noteObject => {
      let noteValue = parseFloat(noteObject.note)
      let notePercentage = parseFloat(noteObject.percentage / 100)

      average += (noteValue * notePercentage)
    })

    this.setState({ average })
  }

  render () {
    let notes = this.state.notes
    let average = this.state.average
    return (
      <div>
        <NotesContainer>{notes}</NotesContainer>
        <NotesInput onNewNote={this._appendThis} />
        <Result>{average}</Result>
      </div>
    )
  }
}

render(<Main />, document.querySelector('body'))
