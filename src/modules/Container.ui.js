import HockeyApp from 'react-native-hockeyapp'

import React, { Component } from 'react'
import { Platform, View, ActivityIndicator, StatusBar } from 'react-native'
import { connect } from 'react-redux'
import { Scene, Router } from 'react-native-router-flux'
import { Container, StyleProvider } from 'native-base'
import { MenuContext } from 'react-native-menu'
import LinearGradient from 'react-native-linear-gradient'
import getTheme from '../theme/components'
import platform from '../theme/variables/platform'

import TransactionListConnect from './UI/scenes/TransactionList'
import TransactionDetails from './UI/scenes/TransactionDetails'
import Directory from './UI/scenes/Directory/Directory.ui'
import Request from './UI/scenes/Request/index'
import SendConfirmation from './UI/scenes/SendConfirmation/index'
import Scan from './UI/scenes/Scan/Scan.ui'
import WalletList from './UI/scenes/WalletList/WalletList.ui'
import CreateWallet from './UI/scenes/CreateWallet/index.js'
import {SettingsOverview, BTCSettings, ETHSettings} from './UI/scenes/Settings'

import Login from './UI/scenes/Login/index.js'

import SideMenu from './UI/components/SideMenu/SideMenu.ui'
import Header from './UI/components/Header/Header.ui'
import TabBar from './UI/components/TabBar/TabBar.ui'
import HelpModal from './UI/components/HelpModal'
import TransactionAlert from './UI/components/TransactionAlert'

import { updateExchangeRates } from './UI/components/ExchangeRate/action'
import { selectWalletById } from './UI/Wallets/action.js'
import { setDeviceDimensions } from './UI/dimensions/action'
import { makeAccountCallbacks } from '../modules/Core/Account/callbacks.js'
import { initializeAccount } from './Login/action.js'
import { addContext, addUsernamesRequest } from './Core/Context/action.js'
import { deleteWalletRequest } from './Core/Wallets/action.js'

import { makeReactNativeIo } from 'airbitz-core-react-native'
import { makeContext } from 'airbitz-core-js'

import styles from './style.js'

import Config from 'react-native-config'
const apiKey = Config.AIRBITZ_API_KEY
const HOCKEY_APP_ID = Platform.select({
  'ios': Config.HOCKEY_APP_ID_IOS,
  'android': Config.HOCKEY_APP_ID_ANDROID
})

const RouterWithRedux = connect()(Router)

class Main extends Component {
  constructor (props) {
    super(props)

    console.log('main constructor props', props)

    this.state = {
      loading: true,
      loginVisible: true,
      context: {}
    }
  }

  componentWillMount () {
    HockeyApp.configure(HOCKEY_APP_ID, true);
  }

  componentDidMount () {
    HockeyApp.start()
    makeReactNativeIo()
    .then(io => {
      const context = makeContext({
        apiKey,
        io
      })

      this.props.dispatch(addContext(context))
      this.props.dispatch(addUsernamesRequest(context))
      this.setState({
        context,
        loading: false
      })
    })
    this.props.dispatch(updateExchangeRates()) // this is dummy data and this function will need to be moved
  }

  _onLayout = (event) => {
    var {x, y, width, height} = event.nativeEvent.layout
    let xScale = (width / 375).toFixed(2)
    let yScale = (height / 647).toFixed(2)
    this.props.dispatch(setDeviceDimensions({width, height, xScale, yScale}))
  }

  render () {
    if (this.state.loading) {
      return (
        <LinearGradient
          style={styles.background}
          start={{x: 0, y: 0}} end={{x: 1, y: 0}}
          colors={['#3b7adb', '#2b569a']}>
        </LinearGradient>
      )
    }

    if (this.state.loginVisible) {
      return (
        <Login
          callbacks={makeAccountCallbacks(this.props.dispatch)}
          context={this.state.context}
          onLoggedIn={account => {
            this.props.dispatch(initializeAccount(account))
            this.setState({ loginVisible: false })
          }}
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center'
          }}
        />
      )
    }

    return (
      <StyleProvider style={getTheme(platform)}>

        <MenuContext style={{ flex: 1 }}>

          <View style={styles.statusBarHack}>

            <Container onLayout={this._onLayout}>

              <StatusBar backgroundColor='green' barStyle='light-content' />
              <SideMenu>
                <Header />

                <RouterWithRedux>

                  <Scene key='root' hideNavBar>

                    <Scene key='scan'  component={Scan} title='Scan' animation={'fade'} duration={300} />

                    <Scene key='walletList' initial component={WalletList} title='Wallets' animation={'fade'} duration={300} />

                    <Scene key='directory' component={Directory} title='Directory' animation={'fade'} duration={300} />

                    <Scene key='transactionList' component={TransactionListConnect} title='Transactions' animation={'fade'} duration={300} />

                    <Scene key='transactionDetails' component={TransactionDetails} title='Transaction Details' duration={0} />

                    <Scene key='request' component={Request} title='Request' animation={'fade'} duration={300} />

                    <Scene key='sendConfirmation' component={SendConfirmation} title='Send Confirmation' animation={'fade'} duration={300} />

                    <Scene key='createWallet' component={CreateWallet} title='Create Wallet' animation={'fade'} duration={300} />

                    <Scene key='settingsOverview' component={SettingsOverview} title='Settings' animation={'fade'} duration={300} />

                    <Scene key='btcSettings' component={BTCSettings} title='BTC Settings' animation={'fade'} duration={300} />

                    <Scene key='ethSettings' component={ETHSettings} title='ETH Settings' animation={'fade'} duration={300} />

                  </Scene>
                </RouterWithRedux>
                <HelpModal />
                <TransactionAlert />
              </SideMenu>
              <TabBar />
            </Container>
          </View>
        </MenuContext>
      </StyleProvider>
    )
  }

}

const mapStateToProps = state => ({})
const mapDispatchToProps = dispatch => ({})

export default connect()(Main)
