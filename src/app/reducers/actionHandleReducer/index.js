import { handleActions, createAction } from 'redux-actions'
import { generateTwoDiemesionArray } from '../../utils/utils'

// Actions
export const SOLVE_MAZE = 'SOLVE_MAZE'

const initialState = {
  maze: [],
  startIndex: [],
  endIndex: [],
  correctPath: [],
  wasHere: [],
  solved: false
}

export const solveMaze = createAction(SOLVE_MAZE)

const actionHandleReducer = handleActions({
  [solveMaze]: (state, action) => {
    const mazeString = action.payload
    const mazeHeight = mazeString.split(/\\n/g)

    let {
      startIndex,
      endIndex,
      wasHere,
      correctPath,
      maze
    } = state

    maze = []

    mazeHeight.forEach((ele, idx) => {
      const mazeWidth = ele.split('')
      const startYAxis = mazeWidth.indexOf('S')
      const endYAxis = mazeWidth.indexOf('F')
      startIndex = startYAxis > -1 ? [idx, startYAxis] : startIndex
      endIndex = endYAxis > -1 ? [idx, endYAxis] : endIndex
      maze.push(mazeWidth)
    })

    wasHere = generateTwoDiemesionArray(maze[0].length, maze.length)
    correctPath = generateTwoDiemesionArray(maze[0].length, maze.length)

    const recursiveSolve = (xAxis, yAxis) => {
      if (xAxis === endIndex[0] && yAxis === endIndex[1]) {
        return true // If you reached the end
      }

      if (maze[xAxis][yAxis] === '#' || wasHere[xAxis][yAxis]) {
        return false // If you are on a wall or already were here
      }

      wasHere[xAxis][yAxis] = true

      if (xAxis !== 0) { // Checks if not on left edge
        if (recursiveSolve(xAxis - 1, yAxis)) { // Recalls method one to the left
          correctPath[xAxis][yAxis] = true // Sets that path value to true;
          return true
        }
      }
      if (xAxis !== maze[0].length - 1) { // Checks if not on right edge
        if (recursiveSolve(xAxis + 1, yAxis)) { // Recalls method one to the right
          correctPath[xAxis][yAxis] = true
          return true
        }
      }
      if (yAxis !== 0) { // Checks if not on top edge
        if (recursiveSolve(xAxis, yAxis - 1)) { // Recalls method one up
          correctPath[xAxis][yAxis] = true
          return true
        }
      }
      if (yAxis !== maze.length - 1) { // Checks if not on bottom edge
        if (recursiveSolve(xAxis, yAxis + 1)) { // Recalls method one down
          correctPath[xAxis][yAxis] = true
          return true
        }
        return false
      }
      return false
    }

    // Loop through maze array and initialize values
    for (let row = 0; row < maze.length; row += 1) {
      // Sets boolean Arrays to default values
      for (let col = 0; col < maze[row].length; col += 1) {
        wasHere[row][col] = false
        correctPath[row][col] = false
      }
    }

    // solveMaze
    const solved = recursiveSolve(startIndex[0], startIndex[1])

    return {
      maze,
      startIndex,
      endIndex,
      wasHere,
      correctPath,
      solved
    }
  }
}, initialState)

export default actionHandleReducer
