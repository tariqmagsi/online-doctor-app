import React, { Component } from "react";
import { View, Text, TextInput, KeyboardAvoidingView } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { responsiveWidth } from "react-native-responsive-dimensions";
import Icon from 'react-native-vector-icons/FontAwesome5';

class Login extends Component {
  state = {
    phone: "",
    password: "",
    isLoading: true,
    token: "",
    isLoggedIn: false
  };
  handleColor = color => {
    this.setState({ bgColor: color });
  };
  
  submitHandler = () => {
    const { phone, password } = this.state;
  };


  render() {
      return (
        <KeyboardAvoidingView
          style={{
            flex: 1,
            flexDirection: "column",
            alignItems: "center",
            backgroundColor: "white"
          }}
          behavior="padding"
        >
          <View style={{backgroundColor: "#f7f7f7", width: responsiveWidth(100)}}>
            <Icon name="lock" size={50} color="gray" style={{textAlign: "center", marginBottom: 20, marginTop: 40}}/>
            <Text style={{textAlign: "center", color: "gray", fontSize: 20, marginBottom: 40}}>Forgot Your Password?</Text>
          </View>
          
          <View style={{marginTop: 40}}>
            <Text style={{textAlign: "center", color: "gray"}}>Send your email and we will send you link for reset password to your email</Text>
          </View>
          <View style={{marginTop: 20}}>  
              <Text
                  style={{
                      color: "gray",
                      color: "gray",
                      textAlign: "left",
                      fontSize: 14,
                      marginBottom: -6,
                      zIndex: 1,
                      marginTop: 20
                  }}
              >
                  Email
              </Text>
              <TextInput
                  placeholder="Email"
                  keyboardType="email-address"
                  style={{
                      height: 40,
                      borderTopColor: "white",
                      borderBottomColor: "silver",
                      borderLeftColor: "white",
                      borderRightColor: "white",
                      borderWidth: 1,
                      backgroundColor: "white",
                      width: responsiveWidth(90)
                  }}
                  name="email"
                  onChangeText={value => this.setState({ email: value })}
                  value={this.state.email}
              />
          </View>
          <View style={{position: 'absolute', left: 0, right: 0, bottom: 0}}>
            <TouchableOpacity onPress={this.submitHandler}>
                <Text
                    style={{
                        fontSize: 20,
                        color: "white",
                        backgroundColor: "#4BB543",
                        width: responsiveWidth(100),
                        height: 50,
                        borderRadius: 2,
                        textAlign: "center",
                        zIndex: 1,
                        paddingTop: 10
                    }}
                >
                    Send
                </Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      );
  }
}
export default Login;
