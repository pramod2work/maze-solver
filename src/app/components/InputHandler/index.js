import { connect } from 'react-redux'

import InputHandler from './InputHandler'

import { solveMaze } from '../../reducers/actionHandleReducer'

export const mapDispatchToProps = dispatch => (
  {
    solveMaze: (request) => {
      dispatch(solveMaze(request))
    }
  }
)

export default connect(null, mapDispatchToProps)(InputHandler)
