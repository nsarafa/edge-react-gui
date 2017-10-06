// @flow
import React, {Component} from 'react'
import DropdownAlert from 'react-native-dropdownalert'

import SLIcon from 'react-native-vector-icons/SimpleLineIcons'
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons'

import styles from './styles'

type Props = {
  dismissGlobalDropdown: () => void,
  visible: boolean,
  type: 'info' | 'warn' | 'error' | 'success',
  title: string,
  message: string,
  left?: any,
  right?: any
}

export default class GlobalDropdown extends Component<Props> {
  dropdown: {alertWithType: Function}

  componentWillReceiveProps (nextProps: Props) {
    if (this.shouldDisplay(this.props, nextProps)) {
      this.dropdown.alertWithType(nextProps.type, nextProps.title, nextProps.message)
    }
  }

  alertIcon = () => <MCIcon name={'alert-outline'} color={'red'} style={{paddingHorizontal: 10}} />
  infoIcon = () => <SLIcon name={'question'} color={'blue'} style={{paddingHorizontal: 10}} />

  render () {
    { /* $FlowExpectedError */ }
    return <DropdownAlert ref={(ref) => this.dropdown = ref}
      panResponderEnabled={false}
      updateStatusBar={false}
      startDelta={-30}
      endDelta={30}
      containerStyle={styles.containerStyle}
      titleStyle={styles.titleStyle}
      defaultContainer={styles.defaultContainer}
      defaultTextContainer={styles.defaultTextContainer}
      onClose={this.props.dismissGlobalDropdown}
      closeInterval={40000}
      left={this.props.left || this.alertIcon()}
      right={this.props.right || this.infoIcon()} />
  }

  shouldDisplay = (current: Props, next: Props) => (!current.visible && next.visible)
}
