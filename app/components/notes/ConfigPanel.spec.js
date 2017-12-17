import React, { Component } from 'react'
import ConfigPanel from './ConfigPanel.jsx'
import { shallow } from 'enzyme'

describe('<ConfigPanel />', () => {
  const config = {
    lowestNote: 0,
    higherNote: 5,
    noteToPass: 3,
    wishedNote: 3
  }

  it('Should read fine props', () => {
    const wrapper = shallow(<ConfigPanel config={config} />)
    expect(wrapper.instance().props.config).toEqual(config)
  })

  it('Should take state from props', () => {
    const wrapper = shallow(<ConfigPanel config={config} />)
    expect(wrapper.state()).toEqual({...config})
  })

  it('Should handle change fine', () => {
    const wrapper = shallow(<ConfigPanel config={config} onNewConfig={() => false} />)
    const event = {
      target: {
        name: 'lowestNote',
        value: 10
      }
    }
    wrapper.instance()._handleChange(event)
    wrapper.update()
    expect(wrapper.state('lowestNote')).toEqual(10)
  })

  it('Should render 4 inputs', () => {
    const wrapper = shallow(<ConfigPanel config={config} onNewConfig={() => false} />)
    expect(wrapper.find('input[type="text"]').length).toEqual(4)
  })

  it('Should update changes in inputs', () => {
    const wrapper = shallow(<ConfigPanel config={config} onNewConfig={() => false} />)
    wrapper.find('input[name="lowestNote"]').simulate('change', {target: {name: 'lowestNote', value: 3}})
    wrapper.find('input[name="higherNote"]').simulate('change', {target: {name: 'higherNote', value: 4}})    
    wrapper.find('input[name="noteToPass"]').simulate('change', {target: {name: 'noteToPass', value: 5}})
    wrapper.find('input[name="wishedNote"]').simulate('change', {target: {name: 'wishedNote', value: 0}})
    
    wrapper.update()

    expect(wrapper.state('higherNote')).toEqual(4)
    expect(wrapper.state('lowestNote')).toEqual(3)
    expect(wrapper.state('noteToPass')).toEqual(5)
    expect(wrapper.state('wishedNote')).toEqual(0)
  })

  it('Should call  handleChange on input change', () => {
    const wrapper = shallow(<ConfigPanel config={config} onNewConfig={() => false} />)
    const spy = jest.spyOn(wrapper.instance(), '_handleChange')
    wrapper.update()
    wrapper.find('input[name="wishedNote"]').simulate('change', {target: {name: 'lowestNote', value: 3}})
    expect(spy).toHaveBeenCalled()
  })
})
