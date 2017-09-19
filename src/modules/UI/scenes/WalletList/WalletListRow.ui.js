import React, {Component} from 'react'
import strings from '../../../../locales/default'
import {sprintf} from 'sprintf-js'
import {bns} from 'biggystring'
import {
  View,
  TouchableHighlight,
  Image,
  ActivityIndicator
} from 'react-native'
import {connect} from 'react-redux'
import {Actions} from 'react-native-router-flux'
import styles from './style'
import T from '../../components/FormattedText'
import RowOptions from './WalletListRowOptions.ui'
import WalletListTokenRow from './WalletListTokenRow.ui'
import {border as b, cutOffText, truncateDecimals} from '../../../utils'
import {selectWallet} from '../../Wallets/action.js'
import sort from '../../../../assets/images/walletlist/sort.png'

import * as SETTINGS_SELECTORS from '../../Settings/selectors.js'
import * as UI_SELECTORS from '../../selectors.js'

export const findDenominationSymbol = (denoms, value) => {
  for (const v of denoms) {
    if (v.name === value) {
      return v.symbol
    }
  }
}

class SortableWalletListRow extends Component {

  render () {
    const {data} = this.props
    let walletData = data
    let multiplier, name, symbol
    // const exchangeDenomination = SETTINGS_SELECTORS.getExchangeDenomination(state, data.currencyCode)
    if (walletData.currencyCode) {
      let displayDenomination = SETTINGS_SELECTORS.getDisplayDenominationFromSettings(this.props.settings, data.currencyCode)
      multiplier = displayDenomination.multiplier
      name = walletData.name || sprintf(strings.enUS['string_no_name'])
      symbol = findDenominationSymbol(walletData.denominations, walletData.currencyCode)
    }
    //console.log('rendering SortableWalletListRow, walletData is: ', walletData, ' this is: ', this)
    return (
      <TouchableHighlight
        style={[b('green'), styles.rowContainer, {width: this.props.dimensions.deviceDimensions.width, height: 50, backgroundColor: 'white', padding: 16, paddingLeft: 20, paddingRight: 20, justifyContent: 'space-between', borderBottomWidth: 1, borderColor: '#EEE'}]}
        underlayColor={'#eee'}
        {...this.props.sortHandlers}
      >
          {walletData.currencyCode? (
            <View style={[styles.rowContent]}>
              <View style={[styles.rowNameTextWrap]}>
                <T style={[styles.rowNameText]} numberOfLines={1}>{cutOffText(name, 34)}</T>
              </View>
              <View style={[styles.rowBalanceTextWrap]}>
                <T style={[styles.rowBalanceAmountText]}>{truncateDecimals(bns.divf(walletData.primaryNativeBalance, multiplier).toString(), 6)}</T>
                <T style={[styles.rowBalanceDenominationText]}>{walletData.currencyCode}
                  ({symbol || ''})</T>
              </View>
              <View style={[styles.rowDragArea, b()]}>
                <Image
                  source={sort}
                  style={{height: 15, width: 15}}
                />
              </View>
            </View>
            ) : (
              <View style={[styles.rowContent]}>
                <View style={[styles.rowNameTextWrap]}>
                  <ActivityIndicator style={{height: 18, width: 18}}/>
                </View>
              </View>
          )}
        </TouchableHighlight>
    )
  }
}

export const SortableWalletListRowConnect =  connect((state) => {
  const settings = state.ui.settings

  return {
    settings
  }
})(SortableWalletListRow)

class SortableListRowEmptyData extends Component {
  render () {
    //console.log('RENDERING SORTABLE LIST EMPTY ROW')
    return (
      <TouchableHighlight
        style={[styles.rowContainer], {height: 50, backgroundColor: 'white', padding: 16, paddingLeft: 20, paddingRight: 20, justifyContent: 'space-between', borderBottomWidth: 1, borderColor: '#EEE'}}
        underlayColor={'#eee'}
        {...this.props.sortHandlers}
       />
    )
  }
}

class SortableWalletRow extends Component {
  render () {
    //console.log('rendering SortableWalletRow, this is: ', this)
    return (
      <View>
        {this.props.data.currencyCode ? (
          <SortableWalletListRowConnect
            data={this.props.data}
            dimensions={this.props.dimensions}
            displayDenomination={this.props.displayDenomination}
            exchangeDenomination={this.props.exchangeDenomination}
          />
        ) : (
          <SortableListRowEmptyData />
        )}
      </View>
    )
  }
}

export const SortableWalletRowConnect = SortableWalletRow

class FullWalletListRow extends Component {

  _onPressSelectWallet = (walletId, currencyCode) => {
    this.props.dispatch(selectWallet(walletId, currencyCode))
    Actions.transactionList({params: 'walletList'})
  }

  render () {
    //console.log('in FullWalletListRow, this is: ', this)
    const {data} = this.props
    let walletData = data.item
    let currencyCode = walletData.currencyCode
    let denomination = this.props.displayDenomination
    let multiplier = denomination.multiplier
    let id = walletData.id
    let name = walletData.name || sprintf(strings.enUS['string_no_name'])
    let symbol = denomination.symbol
    return (
      <View style={[{width: this.props.dimensions.deviceDimensions.width}, b()]}>
          <View>
            <TouchableHighlight
              style={[styles.rowContainer]}
              underlayColor={'#eee'}
              {...this.props.sortHandlers}
              onPress={() => this._onPressSelectWallet(id, currencyCode)}
            >
              <View style={[styles.rowContent]}>
                <View style={[styles.rowNameTextWrap]}>
                  <T style={[styles.rowNameText]} numberOfLines={1}>{cutOffText(name, 34)}</T>
                </View>
                <View style={[styles.rowBalanceTextWrap]}>
                  <T style={[styles.rowBalanceAmountText]}>
                    {truncateDecimals(bns.divf(walletData.primaryNativeBalance, multiplier).toString(), 6)}
                  </T>
                  <T style={[styles.rowBalanceDenominationText]}>{walletData.currencyCode} ({symbol || ''})</T>
                </View>
                <RowOptions sortableMode={this.props.sortableMode} executeWalletRowOption={walletData.executeWalletRowOption} walletKey={id} archived={walletData.archived} />
              </View>
            </TouchableHighlight>
            {this.renderTokenRow(id, walletData.nativeBalances, this.props.active)}
          </View>
      </View>
    )
  }

  renderTokenRow = (parentId, metaTokenBalances) => {
    let tokens = []
    for (let property in metaTokenBalances) {
      if (property !== this.props.data.item.currencyCode) {
        tokens.push(
          <WalletListTokenRow parentId={parentId}
            currencyCode={property} key={property} balance={metaTokenBalances[property]} active={this.props.active} />)
      }
    }
    return tokens
  }
}

export const FullWalletListRowConnect =  connect((state, ownProps) => {
  const displayDenomination = SETTINGS_SELECTORS.getDisplayDenomination(state, ownProps.data.item.currencyCode)
  const exchangeDenomination = SETTINGS_SELECTORS.getExchangeDenomination(state, ownProps.data.item.currencyCode)

  return {
    dimensions: state.ui.scenes.dimensions,
    displayDenomination,
    exchangeDenomination
  }
})(FullWalletListRow)

class FullWalletRow extends Component {
  render () {
    //console.log('rendering WalletRow, this is: ', this)
    return (
      <View>
        {this.props.data.item.id ? (
          <FullWalletListRowConnect data={this.props.data} />
        ) : (
          <FullListRowEmptyData />
        )}
      </View>
    )
  }
}

export const FullWalletRowConnect = FullWalletRow

class FullListRowEmptyData extends Component {
  render () {
    //console.log('RENDERING EMPTY ROW')
    return (
      <TouchableHighlight
        style={[styles.rowContainer], {height: 50, backgroundColor: 'white', padding: 16, paddingLeft: 20, paddingRight: 20, justifyContent: 'space-between', borderBottomWidth: 1, borderColor: '#EEE'}}
        underlayColor={'#eee'}
        {...this.props.sortHandlers}
      >
        <View style={[styles.rowContent]}>
          <View style={[styles.rowNameTextWrap]}>
            <ActivityIndicator style={{height: 18, width: 18}}/>
          </View>
        </View>
      </TouchableHighlight>
    )
  }
}

export const WalletListTokenRowConnect = connect((state, ownProps) => {
  const walletId = ownProps.parentId
  const currencyCode = ownProps.currencyCode
  const wallet:GUIWallet = UI_SELECTORS.getWallet(state, walletId)
  let denomination:AbcDenomination = {}
  let multiplier:string = '0'
  if (wallet) {
    denomination = SETTINGS_SELECTORS.getDisplayDenomination(state, currencyCode)
    multiplier = denomination.multiplier
  }

  return {denomination, multiplier}
})(WalletListTokenRow)
