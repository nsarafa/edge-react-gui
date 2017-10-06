// @flow
import type {AbcContextCallbacks} from 'airbitz-core-types'
import type {Dispatch} from '../../ReduxTypes'

import {displayGlobalDropdown} from '../../UI/components/GlobalDropdown/actions'

export default (dispatch: Dispatch): AbcContextCallbacks => ({
  onError: (error: Error) => {
    console.log(error)
    dispatch(displayGlobalDropdown({title: error.message}))
  }
})
