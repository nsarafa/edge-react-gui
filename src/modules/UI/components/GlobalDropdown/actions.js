// @flow
const PREFIX = 'UI/components/GlobalDropdown/'
export const DISPLAY_GLOBAL_DROPDOWN = PREFIX + 'DISPLAY_GLOBAL_DROPDOWN'
export const DISMISS_GLOBAL_DROPDOWN = PREFIX + 'DISMISS_GLOBAL_DROPDOWN'

type DropdownInfo = {type?: string, title?: string, message?: string}
export const displayGlobalDropdown = ({type = 'custom', title = '', message = ''}: DropdownInfo) => ({
  type: DISPLAY_GLOBAL_DROPDOWN,
  data: {
    type,
    title,
    message
  }
})

export const dismissGlobalDropdown = () => ({
  type: DISMISS_GLOBAL_DROPDOWN,
  data: {}
})
