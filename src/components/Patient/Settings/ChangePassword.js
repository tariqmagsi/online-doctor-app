import React, { Component } from "react";
import { View, Text, TextInput, ImageBackground, Picker } from "react-native";
import { TouchableOpacity, TouchableWithoutFeedback } from "react-native-gesture-handler";
import { responsiveWidth, responsiveHeight } from "react-native-responsive-dimensions";
import Icon from 'react-native-vector-icons/FontAwesome5';
import LoginImage from "../../../images/signup.jpg"
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

class ChangePassword extends Component {
  state = {
    password: "",
    isLoading: true,
    oldPassword: "",
    retypePassword: "",
    isLoggedIn: false
  };
  handleColor = color => {
    this.setState({ bgColor: color });
  };
  
  submitHandler = () => {
    const { oldPassword, password, retypePassword } = this.state;
  };


  render() {
      return (
        <KeyboardAwareScrollView
          style={{
            flex: 1,
            flexDirection: "column",
            backgroundColor: "white"
          }}
        >
            <View style={{alignItems: "center"}}>
                <View style={{backgroundColor: "#f7f7f7", width: responsiveWidth(100)}}>
                    <Icon name="lock" size={60} color="gray" style={{textAlign: "center", marginTop: 20}}/>
                    <Text style={{textAlign: "center", fontSize: 18, color: "gray", fontWeight: "bold", marginBottom: 25}}>Change Password</Text>
                </View>
            <View>
                <Text
                    style={{
                        color: "gray",
                        textAlign: "left",
                        fontSize: 14,
                        marginBottom: -6,
                        zIndex: 1,
                        marginTop: 20
                    }}
                >
                    Old Password
                </Text>
                <TextInput
                    placeholder="Old Password"
                    secureTextEntry={true}
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
                    name="old password"
                    onChangeText={value => this.setState({ oldPassword: value })}
                    value={this.state.oldPassword}
                />
                <Text
                    style={{
                        color: "gray",
                        textAlign: "left",
                        fontSize: 14,
                        marginBottom: -6,
                        zIndex: 1,
                        marginTop: 20
                    }}
                >
                    New Password
                </Text>
                <TextInput
                    placeholder="New Password"
                    secureTextEntry={true}
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
                    name="password"
                    onChangeText={value => this.setState({ password: value })}
                    value={this.state.password}
                />
                <Text
                    style={{
                        color: "gray",
                        textAlign: "left",
                        fontSize: 14,
                        marginBottom: -6,
                        zIndex: 1,
                        marginTop: 20
                    }}
                >
                    Retype New Password
                </Text>
                <TextInput
                    placeholder="Retype New Password"
                    secureTextEntry={true}
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
                    name="retypepassword"
                    onChangeText={value => this.setState({ retypePassword: value })}
                    value={this.state.retypePassword}
                />
            </View>
            <TouchableOpacity onPress={this.submitHandler}>
                <Text
                    style={{
                        fontSize: 20,
                        color: "white",
                        backgroundColor: "#4BB543",
                        width: responsiveWidth(90),
                        height: 40,
                        borderRadius: 2,
                        paddingTop: 5,
                        marginTop: 25,
                        textAlign: "center"
                    }}
                >
                    Change Password
                </Text>
            </TouchableOpacity>
            </View>
        </KeyboardAwareScrollView>
      );
  }
}

export default ChangePassword;
