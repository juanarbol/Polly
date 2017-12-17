import React, { Component } from 'react'
import { mount } from 'enzyme'

import Main from './Main.jsx'
import NotesContainer from './notes/NotesContainer.jsx'
import NotesInput from './notes/NotesInput.jsx'
import Result from './notes/Result.jsx'
import ConfigPanel from './notes/ConfigPanel.jsx'

describe('<Main />', () => {
  const defaultConfig = {
    lowestNote: 0,
    higherNote: 5,
    noteToPass: 3,
    wishedNote: 3
  }
  
  const defaultState = {
    notes: [],
    average: 0,
    currentPercent: 0,
    config: defaultConfig
  }

  it('Should render NotesContainer', () => {
    const wrapper = mount(<Main />)
    expect(wrapper.find(NotesContainer)).toHaveLength(1)
  })

  it('Should render NotesInput', () => {
    const wrapper = mount(<Main />)
    expect(wrapper.find(NotesInput)).toHaveLength(1)
  })

  it('Should render Result', () => {
    const wrapper = mount(<Main />)
    expect(wrapper.find(Result)).toHaveLength(1)
  })

  it('Should render ConfigPanel', () => {
    const wrapper = mount(<Main />)
    expect(wrapper.find(ConfigPanel)).toHaveLength(1)
  })

  it('Should set default state', () => {
    const wrapper = mount(<Main />)
    expect(wrapper.state()).toEqual({ ...defaultState })
  })

  it('Should change state config', () => {
    const wrapper = mount(<Main />)

    wrapper.instance()._changeConfig('lowestNote', 3)
    wrapper.update()
    expect(wrapper.state('config')).toEqual({...defaultConfig, lowestNote: 3})
    // expect(.state()).toEqual({...defaultState})
  })

  it('Should append a new note on _appendThis', () => {
    const wrapper = mount(<Main />)
    const note = {
      note: 5,
      percentage: 50
    }
    wrapper.instance()._appendThis(note)
    wrapper.update()

    expect(wrapper.state('notes')).toEqual([note])
  })

  it('Should calculate average _appendThis', () => {
    const wrapper = mount(<Main />)
    const note = {
      note: 1,
      percentage: 50
    }
    wrapper.instance()._appendThis(note)
    wrapper.update()

    expect(wrapper.state('average')).toEqual(0.5)
  })

  it('Should calculate averarage and percentage correctly', () => {
    const wrapper = mount(<Main />)
    const note = {
      note: 1,
      percentage: 50
    }
    const notes = [note, {...note, note: 5, percentage: 40}]

    wrapper.instance()._calculateAverageOf(notes)
    wrapper.update()
    expect(wrapper.state('average')).toEqual(2.5)
    expect(wrapper.state('currentPercent')).toEqual(90)
  })
})
