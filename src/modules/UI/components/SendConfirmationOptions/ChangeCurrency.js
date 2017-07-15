import React, { Component } from 'react'
import { View, Text, TextInput, TouchableOpacity, Modal, TouchableHighlight } from 'react-native'
import { Content, Form, Picker, Item } from 'native-base'
import { connect } from 'react-redux'

class ChangeCurrency extends Component {

  constructor(props) {
    super(props);
    this.state = {
      text: "chilly",
      modalVisible: false,
      measurement: {}
    };
  }

  componentDidMount () {
    this.textInput.measure((ox, oy, width, height, px, py) => {
      this.state.measurement = { ox, oy, width, height, px, py }
    })
  }

  onValueChange(value: string) {
    this.setState({
      selected1: value
    });
  }

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }


  render () {

    return (
      <Content>

        <Modal
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={() => {alert("Modal has been closed.")}}
        >
          <View style={{marginTop: 22}}>
            <View>
              <Text>Hello World!</Text>
              <TouchableHighlight onPress={() => {this.setModalVisible(!this.state.modalVisible)}}>
              <Text>Hide Modal</Text>
            </TouchableHighlight>

          </View>
        </View>
        </Modal>

        <View style={{ flex: 1, padding: 50 }}>
          <TextInput
            style={{height: 40, borderColor: 'gray', borderWidth: 1}}
            onChangeText={(text) => this.setState({text})}
            onFocus={() => {this.setModalVisible(true)}}
            value={this.state.text}
            ref={(input) => { this.textInput = input; }}
          />
        </View>
      </Content>
    )
  }
}

export default connect()(ChangeCurrency)
