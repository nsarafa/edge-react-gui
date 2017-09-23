// import HockeyApp from 'react-native-hockeyapp'

import React, {Component} from 'react'
import {ScrollView, View} from 'react-native'
import {Actions} from 'react-native-router-flux'

import {sprintf} from 'sprintf-js'
import FAIcon from 'react-native-vector-icons/FontAwesome'
import IonIcon from 'react-native-vector-icons/Ionicons'
import Gradient from '../../components/Gradient/Gradient.ui'

import * as Constants from '../../../../constants'
import strings from '../../../../locales/default'
import T from '../../components/FormattedText'
import RowModal from './components/RowModal.ui'
import RowRoute from './components/RowRoute.ui'
import RowSwitch from './components/RowSwitch.ui'
import {PrimaryButton} from '../../components/Buttons'
import {border as b} from '../../../utils'
import AutoLogoutModal from './components/AutoLogoutModal.ui'

import s from './style'

export default class SettingsOverview extends Component {
  constructor (props) {
    super(props)
    this.state = {
      showAutoLogoutModal: false,
      autoLogoutTimeInMinutes: props.autoLogoutTimeInMinutes
    }

    this.settings = [
      {
        key: Constants.CHANGE_PASSWORD,
        text: sprintf(strings.enUS['settings_button_change_password']),
        routeFunction: this._onPressChangePasswordRouting
      },
      {
        key: Constants.CHANGE_PIN,
        text: sprintf(strings.enUS['settings_button_pin']),
        routeFunction: this._onPressChangePinRouting
      },
      {
        key: Constants.RECOVER_PASSWORD,
        text: sprintf(strings.enUS['settings_button_change_pass_recovery']),
        routeFunction: this._onPressRecoverPasswordRouting
      }
    ]
    this.securityRoute = [
      {
        key: 'setup2Factor',
        text: sprintf(strings.enUS['settings_button_setup_two_factor']),
        routeFunction: this._onPressDummyRouting
      }
    ]

    this.options = {
      pinRelogin: {
        text: sprintf(strings.enUS['settings_title_pin_login']),
        key: 'pinRelogin',
        routeFunction: this._onToggleOption
      },
      useTouchID: {
        text: sprintf(strings.enUS['settings_button_use_touchID']),
        key: 'useTouchID',
        routeFunction: this._onToggleTouchIdOption
      }
    }

    this.optionModals = [
      {
        key: 'autoLogoff',
        text: sprintf(strings.enUS['settings_title_auto_logoff'])
      }
    ]

    this.currencies = [
      {
        key: 'btcSettings',
        text: 'Bitcoin',
        routeFunction: Actions.btcSettings
      },
      {
        key: 'ethSettings',
        text: 'Ethereum',
        routeFunction: Actions.ethSettings
      },
      {
        key: 'ltcSettings',
        text: 'Litecoin',
        routeFunction: Actions.ltcSettings
      }
    ]
  }

  _onPressDummyRouting = () => {
    console.log('Allen: dummy routing')
  }

  _onPressChangePasswordRouting = () => {
    Actions[Constants.CHANGE_PASSWORD]()
  }

  _onPressChangePinRouting = () => {
    Actions[Constants.CHANGE_PIN]()
  }
  _onPressRecoverPasswordRouting = () => {
    Actions[Constants.CHANGE_PASSWORD]()
  }

  _onPressOpenLogoffTime = () => {
    // console.log('opening auto log off modal')
  }

  _onPressOpenDefaultCurrency = () => {
    // console.log('opening default currency modal?')
  }

  _onPressOpenChangeCategories = () => {
    // console.log('open change categories thingy')
  }

  _onToggleOption = (property) => {
    console.log('Allen toggling option: ', property)
  }

  _onToggleTouchIdOption = (bool) => {
    console.log('Allen toggling _onToggleTouchIdOption: ', bool)
  }

  _onPressDebug = () => {
    // HockeyApp.generateTestCrash()
  }

  onDoneAutoLogoutModal = (autoLogoutTimeInMinutes) => {
    this.setState({
      showAutoLogoutModal: false,
      autoLogoutTimeInMinutes
    })
    this.props.setAutoLogoutTimeInMinutes(autoLogoutTimeInMinutes)
  }

  onCancelAutoLogoutModal = () => {
    this.setState({showAutoLogoutModal: false})
  }

  render () {
    const disabled = sprintf(strings.enUS['string_disable'])

    return (
      <ScrollView style={s.container}>
        <Gradient style={[s.unlockRow]}>
          <View style={[s.accountBoxHeaderTextWrap, b('yellow')]}>
            <View style={s.leftArea}>
              <FAIcon
                style={[s.userIcon, b('green')]}
                name='user-o'
                color='white'
              />
              <T style={s.accountBoxHeaderText}>
                {sprintf(strings.enUS['settings_account_title_cap'])}
                :
                {' '}
                {this.props.username}
              </T>
            </View>
          </View>
        </Gradient>

        <View>
          {this.settings.map(this.renderRowRoute)}
        </View>

        <Gradient style={[s.unlockRow]}>
          <View style={[s.accountBoxHeaderTextWrap, b('yellow')]}>
            <View style={s.leftArea}>
              <IonIcon
                name='ios-options'
                style={[s.userIcon, b('green')]}
                color='white'
              />
              <T style={s.accountBoxHeaderText}>
                {sprintf(strings.enUS['settings_options_title_cap'])}
              </T>
            </View>
          </View>
        </Gradient>

        <View>
          <RowModal
            onPress={this.showAutoLogoutModal}
            leftText={sprintf(strings.enUS['settings_title_auto_logoff'])}
            rightText={this.props.autoLogoutTimeInMinutes || disabled}
          />

          {this.securityRoute.map(this.renderRowRoute)}
          {Object.keys(this.options).map(this.renderRowSwitch)}
          {this.currencies.map(this.renderRowRoute)}
          <View style={[s.debugArea, b('green')]}>
            <PrimaryButton
              text={sprintf(strings.enUS['settings_button_debug'])}
              onPressFunction={this._onPressDebug}
            />
          </View>
          <View style={s.emptyBottom} />
        </View>

        <AutoLogoutModal
          showModal={this.state.showAutoLogoutModal}
          onDone={this.onDoneAutoLogoutModal}
          onCancel={this.onCancelAutoLogoutModal}
        />
      </ScrollView>
    )
  }

  showAutoLogoutModal = () => this.setState({showAutoLogoutModal: true})

  renderRowRoute = (x, i) => (
    <RowRoute
      leftText={x.text}
      key={i}
      scene={x.key}
      routeFunction={x.routeFunction}
    />
  )

  renderRowSwitch = (x) => (
    <RowSwitch
      leftText={this.options[x].text}
      key={this.options[x].key}
      property={this.options[x].key}
      onToggle={this.options[x].routeFunction}
    />
  )

  renderRowModal = (x) => (
    <RowModal leftText={x.text} key={x.key} modal={x.key.toString()} />
  )
}
