import React from 'react'
import { shallow } from 'enzyme'

import NotesInput from './NotesInput.jsx'

describe('<NotesInput />', () => {
  it('Should render two inputs and a submit button', () => {
    const wrapper = shallow(<NotesInput config={{lowestNote:0, higherNote: 0}} />)
    expect(wrapper.find('input[type="number"]').length).toEqual(2)
    expect(wrapper.find('input[type="submit"]').length).toEqual(1)
  })

  it('Should take input values from state', () => {
    const wrapper = shallow(<NotesInput config={{lowestNote:0, higherNote: 0}} currentPercent="40" />)
    wrapper.setState({ note: 5, percentage: 10 })
    wrapper.update()

    const expectedNoteHtml = '<input type="number" value="5" min="0" max="0" step="0.01"/>'
    const expectedPercentageHtml = '<input type="number" value="10" max="60" min="0" step="1"/>'

    expect(wrapper.find('input[step="1"]').html()).toEqual(expectedPercentageHtml)
    expect(wrapper.find('input[step="0.01"]').html()).toEqual(expectedNoteHtml)
  })

  it('Should take input ranges values from props', () => {
    const wrapper = shallow(<NotesInput config={{lowestNote:5, higherNote: 15}} currentPercent="20" />)
    wrapper.setState({ note: 7, percentage: 40 })
    wrapper.update()

    const expectedNoteHtml = '<input type="number" value="7" min="5" max="15" step="0.01"/>'
    const expectedPercentageHtml = '<input type="number" value="40" max="80" min="0" step="1"/>'

    expect(wrapper.find('input[step="1"]').html()).toEqual(expectedPercentageHtml)
    expect(wrapper.find('input[step="0.01"]').html()).toEqual(expectedNoteHtml)
  })

  it('Should call _handleChangeOf on input change', () => {
    const wrapper = shallow(<NotesInput config={{lowestNote:5, higherNote: 15}} currentPercent="20" />)
    const spy = jest.spyOn(wrapper.instance(), '_handleChangeOf')

    wrapper.find('input[step="1"]').simulate('change', { target: { value: 4 } })
    wrapper.find('input[step="0.01"]').simulate('change', { target: { value: 5 } })
    expect(spy).toHaveBeenCalledTimes(2)

    expect(wrapper.state()).toEqual({ note: 5, percentage: 4 })
  })

  it('should disable form when notes percentage is 100%', () => {
    const wrapper = shallow(<NotesInput config={{lowestNote:5, higherNote: 15}} currentPercent="100" />)
    expect(wrapper.instance()._disableForm()).toBe(true)

    const expectedTree = '<fieldset disabled="">' +
    '<label>Note:<input type="number" value="" min="5" max="15" step="0.01"/>' +
    'Percentage:<input type="number" value="" max="0" min="0" step="1"/></label>' +
    '<input type="submit" value="Submit" disabled=""/></fieldset>'
    expect(wrapper.find('fieldset').html()).toEqual(expectedTree)
  })

  it('should calculate avaliable percentage', () => {
    const wrapper = shallow(<NotesInput config={{lowestNote:5, higherNote: 15}} currentPercent="60" />)
    expect(wrapper.instance()._maxPercent()).toEqual(40)
  })

  it('Should validate if any inputs is empty or not', () => {
    const wrapper = shallow(<NotesInput config={{lowestNote:5, higherNote: 15}} currentPercent="60" />)
    expect(wrapper.instance()._anyInputEmpty('', 'string')).toBe(true)
    expect(wrapper.instance()._anyInputEmpty('string', '')).toBe(true)
    expect(wrapper.instance()._anyInputEmpty('string', 'string')).toBe(false)
  })

  it('Should disable submit on empty value', () => {
    const wrapper = shallow(<NotesInput config={{lowestNote:5, higherNote: 15}} currentPercent="60" />)
    wrapper.setState({ note: 4 })
    const expectedTree = '<input type="submit" value="Submit" disabled=""/>'
    expect(wrapper.find('input[type="submit"]').html()).toEqual(expectedTree)

    wrapper.setState({ note: '', percentage: 10 })
    expect(wrapper.find('input[type="submit"]').html()).toEqual(expectedTree)

    wrapper.setState({ note: 4, percentage: 10 })
    expect(wrapper.find('input[type="submit"]').html()).not.toEqual(expectedTree)
  })

  it('Should call _handleSubmit on submit form', () => {
    const wrapper = shallow(<NotesInput config={{lowestNote:5, higherNote: 15}} currentPercent="60" />)
    const spy = jest.spyOn(wrapper.instance(), '_handleSubmit')
    wrapper.find('form').simulate('submit', { preventDefault() {} })

    expect(spy).toHaveBeenCalled()
    expect(wrapper.state).toEqual({ note: '', percentage: '' })
  })
})
