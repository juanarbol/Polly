import React, { Component } from 'react'
import Chip from 'material-ui/Chip'

export default class NotesContainer extends Component {
  constructor () {
    super()

    this.styles = {
      chip: {
        margin: 4
      },
      wrapper: {
        display: 'flex',
        flexWrap: 'wrap'
      }
    }

    this._undoNote = this._undoNote.bind(this)
    this._renderChip = this._renderChip.bind(this)
  }

  /**
   * This method will call parent onUndoNote handler
   * @param {number} index index of note to be removed
   */
  _undoNote (index) {
    this.props.onUndoNote(index)
  }

  /**
   * This method is used for return the chips of the notes
   * @param {Object} data Is the information of note
   * @param {Number} index Is current index in notes array
   */
  _renderChip (data, index) {
    return (
      <Chip
        onRequestDelete={() => { this._undoNote(index) }}
        onClick
        style={this.styles.chip}
        key={index}
      >
        {`${data.note}, ${data.percentage}%`}
      </Chip>
    )
  }

  render () {
    let _renderChip = this._renderChip
    let notes = this.props.children
    return (
      <div style={this.styles.wrapper}>
        { notes.map((note, index) => _renderChip(note, index)) }
      </div>
    )
  }
}
