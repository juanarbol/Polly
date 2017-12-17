import React, { Component } from 'react'

export default class Result extends Component {
  constructor () {
    super()

    this._calculateMissingNote = this._calculateMissingNote.bind(this)
    this._calculateMissingPercentageOf = this._calculateMissingPercentageOf.bind(this)
    this._isPossibleGet = this._isPossibleGet.bind(this)
    this._isNoteNeededWith = this._isNoteNeededWith.bind(this)
  }

  /**
   * This help us to calculate how many de need
   * to pass a course or get an specific note
   * And calculus works like this:
   * (1/missig_percentage)(noteToPass|WishedNote - average|currentNote)
   * @param {number} note value of current average
   * @returns {number}
   */
  _calculateMissingNote (note) {
    let currentNote = this.props.average
    let missingPercentage = this._calculateMissingPercentageOf(this.props.percentage)

    let missingNote = (note - currentNote) / missingPercentage

    return Math.round(missingNote * 100) / 100
  }

  /**
   * This method calculate missing percentage
   * @param {number} currentPercentage total percentage evaluated
   * @returns {number}
   */
  _calculateMissingPercentageOf (currentPercentage) {
    if (currentPercentage === 100) {
      return 1
    } else {
      return (100 - currentPercentage) / 100
    }
  }

  /**
   * This method tells users if they actually needs a note to pass
   * @param {number} wishedNote the note wanted
   * @returns {boolean}
   */
  _isNoteNeededWith (wishedNote) {
    if (this._calculateMissingNote(wishedNote) <= 0) {
      return false
    }

    return true
  }

  /**
   * This method tell if is possible to achieve any
   * specific note, if thi note that is missing is
   * greather than higherNote, this is impossible!
   * @param {number} thisNote note that users wants
   * @param {number} higherNote the higher note
   * @returns {boolean}
   */
  _isPossibleGet (thisNote, higherNote) {
    let missingNote = this._calculateMissingNote(thisNote)

    if (missingNote <= higherNote) {
      return true
    }

    return false
  }

  /**
   * This method renders
   * 1. A messege before put the notes
   * 2. Tells if is possible pass o ger any note and
   * how many do you need for it
   * 3. The definitive note
   */
  _renderCalculus () {
    // Round to 2 decimals all notes
    let average = Math.round(this.props.average * 100) / 100

    let noteToPass = Math.round(this.props.config.noteToPass * 100) / 100
    let wishedNote = Math.round(this.props.config.wishedNote * 100) / 100
    let higherNote = Math.round(this.props.config.higherNote * 100) / 100

    if (this.props.percentage === 100) {
      return `Su definitiva es esta mondá: ${average}`
    } else if (this.props.percentage === 0) {
      return <strong>We're scared too!</strong>
    } else if (this.props.percentage > 0) {
      return (
        <div>
          {this._isPossibleGet(noteToPass, higherNote) ? `Sí, te da para pasar con ${this._calculateMissingNote(noteToPass)}` : `Perdiste marica necesitas un ${this._calculateMissingNote(noteToPass)}`}
          <br />
          {this._isPossibleGet(wishedNote, higherNote) ? `Sí, te da para un ${wishedNote} con ${this._calculateMissingNote(wishedNote)}` : `Está meando fuera del tiesto necesitas un ${this._calculateMissingNote(wishedNote)}`}
        </div>
      )
    }
  }

  render () {
    return (
      <span>
        {this._renderCalculus()}
      </span>
    )
  }
}
