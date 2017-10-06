// @flow
import type {Dispatch, State} from '../../../ReduxTypes'
import {connect} from 'react-redux'
import GlobalDropdown from './GlobalDropdown.ui'
import {dismissGlobalDropdown} from './actions'
import * as UI_SELECTORS from '../../selectors'

const mapStateToProps = (state: State) => ({
  ...UI_SELECTORS.getGlobalDropdownState(state)
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
  dismissGlobalDropdown: () => dispatch(dismissGlobalDropdown())
})

export default connect(mapStateToProps, mapDispatchToProps)(GlobalDropdown)
