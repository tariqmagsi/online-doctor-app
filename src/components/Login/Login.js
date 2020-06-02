import React, { Component } from "react";
import { View, Text, TextInput, ImageBackground, KeyboardAvoidingView, AsyncStorage } from "react-native";
import { TouchableOpacity, TouchableWithoutFeedback } from "react-native-gesture-handler";
import { responsiveWidth, responsiveHeight } from "react-native-responsive-dimensions";
import Icon from 'react-native-vector-icons/FontAwesome5';
import LoginImage from "../../images/login.jpg";
import Loader from "../Loader/Loader";
import axios from 'axios';
import Api from "../../Api/Api.json";
import {setInStorage, getFromStorage, removeFromStorage} from "../../utils/storage"
import { Container } from "native-base";

class Login extends Component {
  state = {
    phone: "",
    password: "",
    isLoading: false,
    isScreenLoading: true,
    token: "",
    isLoggedIn: false
  };

  loginHandler = () => {
    const { phone, password } = this.state;
    let url = "";
    let body = {};
    let headers = { headers: { "Content-Type" : "application/json" } }
    
    if(phone.trim() !== "" && password.trim() !== "") {
        if(this.props.route.params.role === "patient"){
            url = Api.PATIENT_API;
            body = { task: "authenticatePatient", phone, password }
        } else {
            url = Api.DOCTOR_API;
            body = { task: "authenticateDoctor", phone, password }
        }

        axios
        .post(url, body, headers)
        .then(res => {
            if(res.data.length > 0) {
                
                this.setState({isLoading: false, phone: "", password: ""}, () => {
                    if(this.props.route.params.role === "patient"){
                        setInStorage("patient", {data: res.data, name: this.props.route.params.role});
                        this.props.navigation.replace("Tabbar");
                    } else {
                        setInStorage("doctor", {data: res.data, name: this.props.route.params.role});
                        this.props.navigation.replace("TabbarDoctor");
                    }
                })
            } else {
                this.setState({isLoading: false})
                alert("Phone Number or Password Incorrect")
            }
        })
        .catch(err => {
            this.setState({isLoading: false}, () => {
                alert("Something went wrong")
            })
        })
    } else {
        this.setState({isLoading: false}, () => {
            alert("All Fields Required")
        })
    }
  };

  componentDidMount = () => {
      if(this.props.route.params.role === "patient") {
        getFromStorage("patient")
        .then(res => {
            if(res) {
                this.props.navigation.replace("Tabbar");
            } else {
                this.setState({isScreenLoading: false})
            }
        })
        .catch(err => console.log(err))
    } else {
        getFromStorage("doctor")
        .then(res => {
            if(res) {
                this.props.navigation.replace("TabbarDoctor");
            } else {
                this.setState({isScreenLoading: false})
            }
        })
        .catch(err => console.log(err))
    }
  }

  render() {
      if(this.state.isScreenLoading) {
        return (
              <Container style={{flex: 1, flexDirection: "row", alignItems: "center", justifyContent: "center"}}>
                  <Loader width={200} height={200}/>
              </Container>)
      }
      return (
        <>
        <KeyboardAvoidingView
          style={{
            flex: 1,
            flexDirection: "column",
            alignItems: "center",
            backgroundColor: "white"
          }}
          behavior="padding"
        >
            <ImageBackground 
                source={LoginImage} 
                style={{
                    flex: 1,
                    resizeMode: "cover",
                    justifyContent: "center",
                    opacity: 0.6,
                    backgroundColor: "black", width: responsiveWidth(100), marginBottom: 20
                }}
            >
                <Icon name="users" size={70} color="white" style={{textAlign: "center", marginTop: 20}}/>
                <Text style={{textAlign: "center", marginTop: 10, fontSize: 30, color: "white"}}>LOGIN</Text>
            </ImageBackground>

            <View>
                <Text
                    style={{
                        color: "gray",
                        textAlign: "left",
                        fontSize: 14,
                        marginBottom: -6,
                        zIndex: 1
                    }}
                >
                    Phone Number
                </Text>
                <TextInput
                    placeholder="Phone Number"
                    keyboardType="phone-pad"
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
                    name="phone"
                    onChangeText={value => this.setState({ phone: value })}
                    value={this.state.phone}
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
                    Password
                </Text>
                <TextInput
                    placeholder="Password"
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
            </View>
            {!this.state.isLoading ? 
                <TouchableOpacity onPress={() => this.setState({isLoading: true}, () => this.loginHandler())}>
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
                        Login
                    </Text>
                </TouchableOpacity>
                :
                <Loader width={100} height={100}/>
            }
            <TouchableWithoutFeedback
                onPress={() => {
                    this.props.navigation.navigate("Forgot Password");
                }}
            >
                <Text
                    style={{
                        textAlign: "center",
                        fontSize: 14,
                        color: "rgba(0,0,0,0.6)",
                        marginTop: 10
                    }}
                >
                    Forgot Password?
                </Text>
            </TouchableWithoutFeedback>

            <TouchableWithoutFeedback>
                <Text
                    style={{
                        textAlign: "center",
                        fontSize: 14,
                        color: "rgba(0,0,0,0.6)",
                        marginTop: 10,
                        marginBottom: responsiveHeight(10)
                    }}
                >
                    Don't Have Account? {" "} 
                    <Text style={{fontWeight: "bold"}} 
                        onPress={() => {
                            if(this.props.route.params.role === "patient"){
                                this.props.navigation.navigate("Signup");
                            } else {
                                this.props.navigation.navigate("Signup Doctor");
                            }
                        }}
                    >
                        Create Account
                    </Text>
                </Text>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
        </>
      );
  }
}
export default Login;
