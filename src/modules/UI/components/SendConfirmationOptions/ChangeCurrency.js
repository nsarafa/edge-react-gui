import React, { Component } from 'react'
import { View, Text, TextInput, TouchableOpacity } from 'react-native'
import { Content, Form, Picker, Item } from 'native-base'
import { connect } from 'react-redux'

class ChangeCurrency extends Component {

  constructor(props) {
    super(props);
    this.state = {
      text: "chilly"
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
          <TextInput
            style={{height: 40, borderColor: 'gray', borderWidth: 1}}
            onChangeText={(text) => this.setState({text})}
            value={this.state.text}
          />
        </View>
      </Content>
    )
  }
}

export default connect()(ChangeCurrency)
