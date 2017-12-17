import React, { Component } from 'react'
import { shallow } from 'enzyme'

import NotesContainer from './NotesContainer.jsx'

describe('<NotesContainer />', () => {
  const notes = [
    {
      note: 3,
      percentage: 50
    }
  ]
  it('Should render a least a span', () => {
    const wrapper = shallow(<NotesContainer>{[]}</NotesContainer>)
    expect(wrapper.find('span').length).toEqual(1)
  })

  it('Should render notes correctly', () => {
    const wrapper = shallow(<NotesContainer>{notes}</NotesContainer>)

    expect(wrapper.find('div').length).toEqual(1)
    expect(wrapper.find('h2').length).toEqual(1)
    expect(wrapper.find('button').length).toEqual(1)

    const expected = `<div><h2>3, 50%</h2><button>x</button></div>`
    const realOutput = wrapper.find('div').html()
    expect(realOutput === expected).toEqual(true)
  })

  it('should call _undoNote on click button', () => {
    const wrapper = shallow(<NotesContainer onUndoNote={() => false} >{notes}</NotesContainer>)
    const spy = jest.spyOn(wrapper.instance(), '_undoNote')
    wrapper.update()
    wrapper.find('button').simulate('click')
    expect(spy).toHaveBeenCalled()
  })
})
