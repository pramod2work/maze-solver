import { connect } from 'react-redux'

import ViewGridComponent from './ViewGrid'

export const mapStateToProps = ({ mazeState = {} }) => ({ ...mazeState })

export default connect(mapStateToProps)(ViewGridComponent)
