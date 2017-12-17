import React from 'react'
import { shallow } from 'enzyme'

import Result from './Result.jsx'

describe('<Result />', () => {
  it('Should calculate missing percentage', () => {
    const defaultConfig = {
      lowestNote: 0,
      higherNote: 5,
      noteToPass: 3,
      wishedNote: 3
    }
    const wrapper = shallow(<Result config={defaultConfig} />)

    expect(wrapper.instance()._calculateMissingPercentageOf(10)).toBe(90 / 100)
    expect(wrapper.instance()._calculateMissingPercentageOf(30)).toBe(70 / 100)
    expect(wrapper.instance()._calculateMissingPercentageOf(100)).toBe(1)
    expect(wrapper.instance()._calculateMissingPercentageOf(30)).not.toBe(40 / 100)
  })

  it('Should calculate the missing note', () => {
    const defaultConfig = {
      lowestNote: 0,
      higherNote: 5,
      noteToPass: 3,
      wishedNote: 3
    }
    const wrapper = shallow(<Result config={defaultConfig} average={2} percentage={50} />)
    expect(wrapper.instance()._calculateMissingNote(3)).toEqual(2)
    wrapper.setProps({ average: 2.5 })
    expect(wrapper.instance()._calculateMissingNote(5)).toEqual(5)
  })

  it('Should tell if is possible or not to get a note', () => {
    const defaultConfig = {
      lowestNote: 0,
      higherNote: 5,
      noteToPass: 3,
      wishedNote: 3
    }
    const wrapper = shallow(<Result config={defaultConfig} average={2.5} percentage={50} />)

    expect(wrapper.instance()._isPossibleGet(5, 5)).toEqual(true)
    expect(wrapper.instance()._isPossibleGet(3, 5)).toEqual(true)
    expect(wrapper.instance()._isPossibleGet(6, 5)).not.toEqual(true)

    wrapper.setProps({ average: 2 })
    expect(wrapper.instance()._isPossibleGet(5, 5)).not.toEqual(true)
  })

  it('Should say if users need a note to pass course', () => {
    const defaultConfig = {
      lowestNote: 0,
      higherNote: 5,
      noteToPass: 3,
      wishedNote: 3
    }
    const wrapper = shallow(<Result config={defaultConfig} average={2.5} percentage={50} />)

    expect(wrapper.instance()._isNoteNeededWith(3)).toEqual(true)
    wrapper.setProps({ average: 3, percentage: 70 })
    expect(wrapper.instance()._isNoteNeededWith(3)).toEqual(false)
  })

  it('Should render a calculus', () => {
    // I do not know what to test here
    // it supose to be the method _renderCalculus
  })
})
