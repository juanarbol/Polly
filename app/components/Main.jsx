/**
 * @author Juan José Arboleda
 * @desc In this component we're gonna
 * print the inputs form, list of notes typed
 * and the average of this notes
 */
import React, { Component } from 'react'
import { render } from 'react-dom'

import NotesContainer from './notes/NotesContainer.jsx'
import NotesInput from './notes/NotesInput.jsx'
import Result from './notes/Result.jsx'
import ConfigPanel from './notes/ConfigPanel.jsx'

export default class Main extends Component {
  constructor () {
    super()

    // Default values for Colombian education
    // (most regular cases, this could change in some institutions)
    const defaultConfig = {
      lowestNote: 0,
      higherNote: 5,
      noteToPass: 3,
      wishedNote: 3
    }
    // The state will be lifted by child components
    // we need to save average of notes objects
    this.state = {
      notes: [],
      average: 0,
      currentPercent: 0,
      config: defaultConfig
    }

    this._changeConfig = this._changeConfig.bind(this)
    this._appendThis = this._appendThis.bind(this)
    this._calculateAverageOf = this._calculateAverageOf.bind(this)
    this._undoThis = this._undoThis.bind(this)
  }

  _changeConfig (inputName, newValue) {
    let config = {
      ...this.state.config,
      [inputName]: newValue
    }

    this.setState({ config })
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
   * Remove a note from list
   * @param {number} noteIndex Index of note to remove from list
   * We change note state and recalculate average for a new rendering
   * and update components
   */
  _undoThis (noteIndex) {
    let notes = [
      ...this.state.notes.slice(0, noteIndex),
      ...this.state.notes.slice(noteIndex + 1)
    ]

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
    let currentPercent = 0
    notes.map(noteObject => {
      let noteValue = parseFloat(noteObject.note)
      let notePercentage = parseFloat(noteObject.percentage / 100)

      average += (noteValue * notePercentage)
      currentPercent += notePercentage * 100
    })

    this.setState({ average, currentPercent })
  }

  render () {
    let config = this.state.config
    let notes = this.state.notes
    let average = this.state.average
    let currentPercent = this.state.currentPercent
    return (
      <div>
        <NotesContainer onUndoNote={this._undoThis} >{notes}</NotesContainer>
        <NotesInput onNewNote={this._appendThis} currentPercent={currentPercent} config={config} />
        <Result config={config} average={average} percentage={currentPercent} />
        <ConfigPanel config={config} onNewConfig={this._changeConfig} />
      </div>
    )
  }
}

render(<Main />, document.querySelector('body'))
