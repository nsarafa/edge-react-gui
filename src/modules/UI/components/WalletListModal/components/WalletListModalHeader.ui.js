// @flow
import React, {Component} from 'react'
import {
  View,
  TouchableHighlight
} from 'react-native'
import strings from '../../../../../locales/default'
import PropTypes from 'prop-types'
import T from '../../../components/FormattedText'
import Ionicon from 'react-native-vector-icons/Ionicons'
import styles from '../style'
import {border as b} from '../../../../utils'
import THEME from '../../../../../theme/variables/airbitz'

export default class WalletListModalHeader extends Component<any> {
  constructor (props: any) {
    super(props)
    this.props.type = 'from'
  }

  onSearchExit = this.props.disableWalletListModalVisibility

  render () {
    console.log('render')
    console.log(this.props)
    const headerSyntax = (this.props.type === 'from')
      ? 'fragment_select_wallet_header_title'
      : 'fragment_send_other_wallet_header_title'
    return (
      <View style={[styles.rowContainer, styles.headerContainer]}>
        <View style={[styles.headerContent, b()]}>

          <View style={[styles.headerTextWrap, b()]}>
            <T style={[
              styles.headerText,
              {color: THEME.COLORS.WHITE},
              b()
            ]}>
              {strings.enUS[headerSyntax]}
            </T>
          </View>

          <TouchableHighlight style={[styles.modalCloseWrap, b()]}
            onPress={this.onSearchExit}>
            <Ionicon style={[styles.donebutton, b()]}
              name='ios-close'
              size={26}
              color={THEME.COLORS.WHITE}
            />
          </TouchableHighlight>

        </View>
      </View>
    )
  }
}

WalletListModalHeader.propTypes = {
  type: PropTypes.string
}
