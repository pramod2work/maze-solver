import React from 'react'
import propTypes from 'prop-types'

import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

class InputHandler extends React.Component {
  constructor (props) {
    super(props)

    // Based on action prepopulate values as necessary
    this.state = {
      maze: '',
      validated: false
    }

    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleInputChange = this.handleInputChange.bind(this)
  }

  // Use common method to store field value in state
  handleInputChange (event) {
    const { target } = event
    const value = target.type === 'checkbox' ? target.checked : target.value

    this.setState({ [target.name]: value })
  }

  handleSubmit (event) {
    // prevent default html form submit event
    event.preventDefault()
    event.stopPropagation()

    const form = event.currentTarget

    if (form.checkValidity() === true) {
      const { maze } = this.state
      const { solveMaze } = this.props
      solveMaze(maze)
    }

    this.setState({ validated: true })
  }

  render () {
    const {
      validated,
      maze
    } = this.state

    return (
      <Form
        noValidate
        validated={validated}
        onSubmit={this.handleSubmit}
      >
        <p>Sample Maze</p>
        <p style={{ whiteSpace: 'pre-wrap' }}>
          {/* eslint-disable max-len */}
          ###########\nS #   #   #\n# # # # # #\n#   #   # #\n######### #\n# #       #\n# # #######\n# #   #   #\n# # # ### #\n#   #     F\n###########
          {/* eslint-enable max-len */}
        </p>
        <Form.Row>
          <Form.Group as={Col}>
            <Form.Label htmlFor='maze'>
              Maze: (S for start, F for Finish and \n for row seperator)
            </Form.Label>
            <Form.Control
              required
              type='text'
              name='maze'
              data-test-id='maze-input'
              placeholder='maze'
              value={maze}
              onChange={this.handleInputChange}
            />
          </Form.Group>
        </Form.Row>
        <Form.Group as={Row}>
          <Col xs={4}>
            <Button type='submit' data-test-id='solve-maze'>
              Solve Maze
            </Button>
          </Col>
        </Form.Group>
        <br />
      </Form>
    )
  }
}

InputHandler.propTypes = {
  solveMaze: propTypes.func.isRequired
}

export default InputHandler
