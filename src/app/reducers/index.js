import { combineReducers } from 'redux'

import mazeState from './actionHandleReducer'

const rootReducer = combineReducers({
  mazeState
})

export default rootReducer
