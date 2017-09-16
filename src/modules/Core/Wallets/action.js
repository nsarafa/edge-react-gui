export const PREFIX = 'Core/Wallets/'
export const UPDATE_WALLETS = PREFIX + 'UPDATE_WALLETS'
export const UPDATE_ACTIVE_WALLETS_ORDER ='UPDATE_ACTIVE_WALLETS_ORDER'

import * as CORE_SELECTORS from '../selectors'
import * as SETTINGS_SELECTORS from '../../UI/Settings/selectors'

export const updateWallets = (activeWalletIds, archivedWalletIds, currencyWallets) => ({
  type: UPDATE_WALLETS,
  data: {
    activeWalletIds,
    archivedWalletIds,
    currencyWallets
  }
})

UPDATE_ACTIVE_WALLETS_ORDER
export const updateActiveWalletsOrder = (activeWalletIds) => ({
  type: UPDATE_ACTIVE_WALLETS_ORDER,
  data: {
    activeWalletIds
  }
})

export const updateWalletsRequest = () => (dispatch, getState) => {
  const state = getState()
  const loginStatus = SETTINGS_SELECTORS.getLoginStatus(state)
  if (!loginStatus) {
    return {
      type: 'LOGGED_OUT'
    }
  }

  const account = CORE_SELECTORS.getAccount(state)
  const {activeWalletIds, archivedWalletIds, currencyWallets} = account

  return dispatch(updateWallets(activeWalletIds, archivedWalletIds, currencyWallets))
}
