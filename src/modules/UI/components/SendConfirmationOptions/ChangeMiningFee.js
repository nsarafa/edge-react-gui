import React, { Component } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { Content } from 'native-base'
import { connect } from 'react-redux'
import { openTransactionAlert } from '../../components/TransactionAlert/action.js'
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button'

var radio_props = [
  {label: 'Low', value: 'Low' },
  {label: 'Standard', value: 'Standard' },
  {label: 'High', value: 'High' },
  {label: 'Custom (Advance)', value: 'Custom' }
];


class ChangeMiningFee extends Component {

  render () {
    return (
      <Content>
        <View style={{ flex: 1, padding: 50 }}>
          <Text style={{ fontSize: 17 }}>
            Warning: Low Fees may cause long delays in transaction confirmation
          </Text>
          <View style={{ paddingVertical: 30 }}>

            <RadioForm
              radio_props={radio_props}
              initial={0}
              onPress={(value) => {this.setState({value:value})}}
            />

          </View>
        </View>
      </Content>
    )
  }
}

export default connect()(ChangeMiningFee)
