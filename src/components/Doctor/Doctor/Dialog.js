import React, { Component } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import Dialog from "react-native-dialog";
import { Form, Picker, Icon } from "native-base";
import { responsiveWidth } from "react-native-responsive-dimensions";
 
export default class DialogDoc extends Component {
  state = {
    dialogVisible: false,
    selected: undefined
  };
 
  showDialog = () => {
    this.setState({ dialogVisible: true });
  };
 
  handleCancel = () => {
    this.setState({ dialogVisible: false });
  };
 
  handleOk = () => {
    this.setState({ dialogVisible: false });
  };
 
  render() {
    return (
      <View>
        <TouchableOpacity onPress={this.showDialog} style={{padding: 20, fontSize: 18, color: "gray", backgroundColor: "#f4f3ef"}}>
          <Text>Search Doctor By</Text>
        </TouchableOpacity>
        <Dialog.Container visible={this.state.dialogVisible}>
          <Dialog.Title>Search Doctor By</Dialog.Title>
          <Dialog.Description>
            
          </Dialog.Description>
          <Dialog.Button label="Cancel" onPress={this.handleCancel} />
          <Dialog.Button label="OK" onPress={this.handleOk} />
        </Dialog.Container>
      </View>
    );
  }
}