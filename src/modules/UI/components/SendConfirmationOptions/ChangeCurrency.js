import React, { Component } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { Content, Form, Picker, Item } from 'native-base'
import { connect } from 'react-redux'

import DropDown from 'react-native-dropdown'

const {
  Select,
  Option,
  OptionList,
  updatePosition
} = DropDown;


class ChangeCurrency extends Component {

  constructor(props) {
    super(props);
    this.state = {
      selected1: "key1"
    };
  }
  onValueChange(value: string) {
    this.setState({
      selected1: value
    });
  }

  render () {
    return (
      <Content>
        <View style={{ flex: 1, padding: 50 }}>
        <Form>
            <Picker
              iosHeader="Select one"
              mode="dropdown"
              selectedValue={this.state.selected1}
              onValueChange={this.onValueChange.bind(this)}
            >
              <Item label="Wallet" value="key0" />
              <Item label="ATM Card" value="key1" />
              <Item label="Debit Card" value="key2" />
              <Item label="Credit Card" value="key3" />
              <Item label="Net Banking" value="key4" />
            </Picker>
          </Form>

        </View>
      </Content>
    )
  }
}

export default connect()(ChangeCurrency)
