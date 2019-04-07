import React from 'react'
import propTypes from 'prop-types'

import Table from 'react-bootstrap/Table'
import Row from 'react-bootstrap/Row'

/* eslint-disable react/no-array-index-key */
const ViewGrid = ({
  maze,
  solved,
  startIndex,
  endIndex,
  correctPath
}) => (
  <div>
    <Row style={{ marginTop: '1rem' }}>
      {
        solved
          ? <p style={{ color: 'green' }}>Maze is Solved</p>
          : <p style={{ color: 'red' }}>Maze is NOT Solvable OR no input</p>
      }
      <Table responsive>
        <tbody>
          {
            maze.map((yAxis, idx) => (
              <tr key={`row-${idx}`}>
                {
                  yAxis.map((xAxis, xIndex) => {
                    const isPath = correctPath[idx][xIndex]
                    const isStart = startIndex[0] === idx && startIndex[1] === xIndex
                    const isEnd = endIndex[0] === idx && endIndex[1] === xIndex
                    return (
                      <td key={`col-${xIndex}`}>
                        <span
                          style={{
                            color: isPath ? 'red' : 'black',
                            fontWeight: isStart || isEnd ? 'bold' : 'normal'
                          }}
                        >
                          {isPath ? '*' : xAxis}
                        </span>
                      </td>
                    )
                  })
                }
              </tr>
            ))
          }
        </tbody>
      </Table>
    </Row>
  </div>
)
/* eslint-enable react/no-array-index-key */

ViewGrid.propTypes = {
  maze: propTypes.arrayOf(propTypes.arrayOf(propTypes.string)).isRequired,
  solved: propTypes.bool.isRequired,
  startIndex: propTypes.arrayOf(propTypes.number).isRequired,
  endIndex: propTypes.arrayOf(propTypes.number).isRequired,
  correctPath: propTypes.arrayOf(propTypes.arrayOf(propTypes.bool)).isRequired
}

export default ViewGrid
