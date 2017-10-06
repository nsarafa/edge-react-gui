// @flow
import * as ACTIONS from './actions'

const initialState = {
  visible: false,
  type: '',
  title: '',
  message: ''
}

type GlobalDropdownState = {
  visible: boolean,
  type: string,
  title: string,
  message: string
}

const globalDropdown = (state: GlobalDropdownState = initialState, action: any) => {
  const {type, data = {} } = action
  switch (type) {
  case ACTIONS.DISPLAY_GLOBAL_DROPDOWN: {
    const {type, title, message} = data

    return {
      visible: true,
      type,
      title,
      message
    }
  }

  case ACTIONS.DISMISS_GLOBAL_DROPDOWN:
    return initialState

  default:
    return state
  }
}

export default globalDropdown
