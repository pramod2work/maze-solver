/* global describe test expect */

import { mapStateToProps } from './index'

describe('View Grid Defualt export', () => {
  test('mapStateToProps no value', () => {
    expect(mapStateToProps({})).toEqual({})
  })

  test('mapStateToProps with state value', () => {
    const mazeState = {
      correctPath: [
        [false, false, false],
        [true, true, false],
        [false, true, true]
      ],
      solved: true
    }
    expect(mapStateToProps({ mazeState })).toEqual({ ...mazeState })
  })
})
