import React, { Component } from "react";
import { View, Text, TextInput, Picker, ImageBackground } from "react-native";
import { TouchableOpacity, TouchableWithoutFeedback } from "react-native-gesture-handler";
import { responsiveWidth, responsiveHeight } from "react-native-responsive-dimensions";
import Icon from 'react-native-vector-icons/FontAwesome5';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import LoginImage from "../../images/signup.jpg";
import * as MediaPicker from "expo-image-picker";
import * as Permissions from "expo-permissions";
import axios from "axios";
import Api from "../../Api/Api.json";
import Loader from "../Loader/Loader";
import validator from "validator"

class EditProfile extends Component {
  state = {
    email: "",
    isLoading: false,
    password: "",
    retypePassword: "",
    token: "",
    gender: "",
    name: "",
    age: "",
    address: "",
    phone: "",
    registration: "",
    designation: "",
    speciality: "",
    affiliation: "",
    isLoggedIn: false,
    image: "",
    designations: ["Bariatrics", "Burn Care", "Cancer Care", "Complex Spine Center", "Diabetes", "Digestive Health", "Emergency Medicine", "Family Medicine", "Heart Care", "Infectious Disease", "Internal Medicine", "Neurosciences", "Orthopaedics", "Pathology", "Pediatrics", "Pregnancy & Childbirth", "Psychiatry", "Radiology", "Speech & Hearing", "Stroke Care", "Surgery", "Trauma", "Urology", "USA Health Dramatology", "Women's Care"]
  };

  signupHandler = () => {
    const { name, email, password, phone, retypePassword, age, gender, address, speciality, designation, registration, image } = this.state;
    if(name.trim() !== "" && password.trim() !== "" && email.trim() && retypePassword.trim() !== "" && gender.trim() !== "" && phone.trim() !== "" && speciality.trim() !== "" && designation.trim() !== "" && age.trim() !== "" && speciality.trim() !== "" && designation.trim() !== "") {
        if(password === retypePassword) {
            if(validator.isEmail(email)) {
                const body = {task: "registerDoctor", name, age, gender, email, phone, address, password, speciality, designation, bmdc_no: registration}
                const headers = { headers: { "Content-Type": "application/json" } }
                axios
                .post(Api.DOCTOR_API, body, headers)
                .then(res => {
                    if(res.data === 200){
                        this.setState({
                            name: "",
                            age: "",
                            gender: "",
                            email: "",
                            phone: "",
                            address: "",
                            password: "",
                            retypePassword: "",
                            speciality: "",
                            designation: "",
                            registration: "",
                            image: "",
                            isLoading: false
                        }, () => {
                            alert("Successfully Signed Up You can now log in")
                            this.props.navigation.navigate("Login");
                        })
                    } else {
                        alert("Error! Couldn't Signup")
                        this.setState({isLoading: false})
                    }
                })
                .catch(err => {
                    this.setState({isLoading: false}, () => {
                        alert("Something Went Wrong")
                    })
                })
            } else {
                this.setState({isLoading: false})
                alert("Email not valid")
            }
        } else {
            this.setState({isLoading: false})
            alert("Passwords are not equal")
        }
    } else {
        this.setState({isLoading: false})
        alert("Required Fields Missing")
    }
  };

    whenPressHandler = () => {
        Permissions.askAsync(Permissions.CAMERA_ROLL).then(
            ({ status }) => {
                if (status === "granted") {
                    const options = {
                        base64: true,
                    }
                MediaPicker.launchImageLibraryAsync(options)
                    .then(imageData => {
                    if (imageData.cancelled) {
                        return;
                    }
                    this.setState({image: imageData.base64})
                    })
                    .catch(e => console.log(e));
                }
            }
        );
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
                    <Icon name="users" size={70} color="white" style={{textAlign: "center", marginTop: 20, paddingTop: 20}}/>
                    <Text style={{textAlign: "center", marginTop: 10, fontSize: 30, color: "white", paddingBottom: 30}}>SIGNUP</Text>
                </ImageBackground>
            <View style={{marginTop: 20}}>
                <Text
                    style={{
                        color: "gray",
                        textAlign: "left",
                        fontSize: 14,
                        marginBottom: -6,
                        zIndex: 1
                    }}
                >
                    Name<Text style={{color: "red"}}>*</Text>
                </Text>
                <TextInput
                    placeholder="Name"
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
                    name="name"
                    onChangeText={value => this.setState({ name: value })}
                    value={this.state.name}
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
                    Age<Text style={{color: "red"}}>*</Text>
                </Text>
                <TextInput
                    placeholder="Age"
                    keyboardType="numeric"
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
                    name="age"
                    onChangeText={value => this.setState({ age: value })}
                    value={this.state.age}
                />
                <Text
                    style={{
                        color: "gray",
                        textAlign: "left",
                        fontSize: 14,
                        marginBottom: -6,
                        zIndex: 1,
                        marginTop: 20,
                    }}
                >
                    Gender<Text style={{color: "red"}}>*</Text>
                </Text>
                <View style={{
                        borderTopColor: "white",
                        borderLeftColor: "white",
                        borderRightColor: "white",
                        borderBottomColor: "silver",
                        borderWidth: 1,
                        backgroundColor: "white",
                        borderRadius: 4
                    }}
                >
                    <Picker
                        placeholder="Gender"
                        style={{
                            height: 40,
                            borderTopColor: "white",
                            borderBottomColor: "silver",
                            borderWidth: 1,
                            backgroundColor: "white",
                            width: responsiveWidth(90),
                            color: this.state.gender === "" ? "silver" : "black"
                        }}
                        mode="dropdown"
                        name="gender"
                        onValueChange={value => this.setState({ gender: value })}
                        selectedValue={this.state.gender}
                    >
                        <Picker.Item label="Select Gender" value="" />
                        <Picker.Item label="Male" value="M" />
                        <Picker.Item label="Female" value="F" />
                    </Picker>
                </View>
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
                    Address
                </Text>
                <TextInput
                    placeholder="Address"
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
                    name="address"
                    onChangeText={value => this.setState({ address: value })}
                    value={this.state.address}
                />
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
                    Email<Text style={{color: "red"}}>*</Text>
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
                    Password<Text style={{color: "red"}}>*</Text>
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
                    Retype Password<Text style={{color: "red"}}>*</Text>
                </Text>
                <TextInput
                    placeholder="Retype Password"
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
                    Phone Number<Text style={{color: "red"}}>*</Text>
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
                    Registration Number
                </Text>
                <TextInput
                    placeholder="Registration Number"
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
                    name="registration"
                    onChangeText={value => this.setState({ registration: value })}
                    value={this.state.registration}
                />
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
                    Speciality<Text style={{color: "red"}}>*</Text>
                </Text>
                <View style={{
                        borderTopColor: "white",
                        borderLeftColor: "white",
                        borderRightColor: "white",
                        borderBottomColor: "silver",
                        borderWidth: 1,
                        backgroundColor: "white",
                        borderRadius: 4
                    }}
                >
                    <Picker
                        style={{
                            height: 40,
                            borderTopColor: "white",
                            borderBottomColor: "silver",
                            borderWidth: 1,
                            backgroundColor: "white",
                            width: responsiveWidth(90),
                            color: this.state.speciality === "" ? "silver" : "black"
                        }}
                        mode="dropdown"
                        name="speciality"
                        onValueChange={value => this.setState({ speciality: value })}
                        selectedValue={this.state.speciality}
                    >
                        <Picker.Item label="Select Speciality" value="" />
                        {["Consultant", "Assistant Professor", "Associate Professor", "Professor"].map(item => <Picker.Item label={item} value={item} key={item}/>)}
                    </Picker>
                </View>
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
                    Designation<Text style={{color: "red"}}>*</Text>
                </Text>

                <View style={{
                        borderTopColor: "white",
                        borderLeftColor: "white",
                        borderRightColor: "white",
                        borderBottomColor: "silver",
                        borderWidth: 1,
                        backgroundColor: "white",
                        borderRadius: 4
                    }}
                >
                    <Picker
                        style={{
                            height: 40,
                            borderTopColor: "white",
                            borderBottomColor: "silver",
                            borderWidth: 1,
                            backgroundColor: "white",
                            width: responsiveWidth(90),
                            color: this.state.designation === "" ? "silver" : "black"
                        }}
                        mode="dropdown"
                        name="designation"
                        onValueChange={value => this.setState({ designation: value })}
                        selectedValue={this.state.designation}
                    >
                        <Picker.Item label="Select Designation" value="" />
                        {this.state.designations.map(item => <Picker.Item label={item} value={item} key={item}/>)}
                    </Picker>
                </View>
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
                    Signature Block
                </Text>
                <TouchableOpacity
                    onPress={this.whenPressHandler}
                    style={{marginTop: 10}}
                >
                    <Text style={{
                        fontSize: 16,
                        color: "silver",
                        backgroundColor: "white",
                        width: responsiveWidth(90),
                        height: 25,
                        borderRadius: 2,
                        textAlign: "left",
                    }}>
                        Upload Signature Block
                    </Text>
                </TouchableOpacity>
            </View>
            {!this.state.isLoading ?
                <TouchableOpacity onPress={() => this.setState({isLoading: true}, () => {this.signupHandler()})}>
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
                        Signup
                    </Text>
                </TouchableOpacity>
                :
                <Loader width={100} height={100}/>
            }
            <TouchableWithoutFeedback
                onPress={() => {}}
            >
                <Text
                    style={{
                        textAlign: "center",
                        fontSize: 14,
                        color: "rgba(0,0,0,0.6)",
                        marginTop: 10,
                        marginBottom: responsiveHeight(10)
                    }}
                >
                    Already Have Account? {" "}
                    <Text 
                        style={{fontWeight: "bold"}}
                        onPress={() => {
                            this.props.navigation.navigate("Login", { role: "doctor"});
                        }}
                    >
                        Login
                    </Text>
                </Text>
            </TouchableWithoutFeedback>
            </View>
        </KeyboardAwareScrollView>
      );
  }
}

export default EditProfile;
