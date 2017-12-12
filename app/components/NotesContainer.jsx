import React, { Component } from 'react'

export default class NotesContainer extends Component {
  constructor (props) {
    super(props)

    this.state = {
      notes: []
    }
  }

  render () {
    return (
      <span>
        {
          this.props.children.map((note, index) => {
            return <h2 key={index}>{note.note}, {note.percentage}%</h2>
          })
        }
      </span>
    )
  }
}
