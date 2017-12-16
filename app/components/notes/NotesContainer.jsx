import React, { Component } from 'react'

export default class NotesContainer extends Component {
  constructor (props) {
    super(props)

    this._undoNote = this._undoNote.bind(this)
  }

  /**
   * This method will call parent onUndoNote handler
   * @param {number} index index of note to be removed
   */
  _undoNote (index) {
    this.props.onUndoNote(index)
  }

  render () {
    return (
      <span>
        {
          this.props.children.map((note, index) => {
            return (
              <div key={index}>
                <h2>{note.note}, {note.percentage}%</h2>
                <button onClick={() => { this._undoNote(index) }}>x</button>
              </div>
            )
          })
        }
      </span>
    )
  }
}
