/* global describe test expect */

import actionHandleReducer, { solveMaze } from './index'

const initialState = {
  maze: [],
  startIndex: [],
  endIndex: [],
  correctPath: [],
  solved: false
}

describe('Verify Maze core logic', () => {
  test('Test Maze Logic for 3X3', () => {
    const payload = '###\\nS  \\n# F'
    const returnData = actionHandleReducer(initialState, solveMaze(payload))
    expect(returnData.solved).toBeTruthy()
    expect(returnData.endIndex).toEqual([2, 2])
    expect(returnData.startIndex).toEqual([1, 0])
  })

  test('Test Maze Logic for failure 3X3', () => {
    const payload = '###\\nS  \\n#  '
    const returnData = actionHandleReducer(initialState, solveMaze(payload))
    expect(returnData.solved).toBeFalsy()
    expect(returnData.endIndex).toEqual([])
    expect(returnData.startIndex).toEqual([1, 0])
  })

  test('Test Maze Logic for sample asked', () => {
    const payload = '###########\\nS #   #   #\\n# # # # # #\\n#   #   # #\\n######### #\\n# #       #\\n# # #######\\n# #   #   #\\n# # # ### #\\n#   #     F\\n###########'
    const returnData = actionHandleReducer(initialState, solveMaze(payload))
    expect(returnData.solved).toBeTruthy()
    expect(returnData.endIndex).toEqual([9, 10])
    expect(returnData.startIndex).toEqual([1, 0])
  })
})
