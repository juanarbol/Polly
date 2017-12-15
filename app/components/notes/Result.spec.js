import React from 'react'
import { create } from 'react-test-renderer'

import Result from './Result.jsx'

describe('<Result />', () => {
  it('Should be rendered ok', () => {
    const component = create(<Result></Result>)

    let tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
})
