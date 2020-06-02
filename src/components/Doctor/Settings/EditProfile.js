import React, { Component } from "react";
import { View, Text, TextInput, Picker } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { responsiveWidth } from "react-native-responsive-dimensions";
import Icon from 'react-native-vector-icons/FontAwesome5';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import * as MediaPicker from "expo-image-picker";
import * as Permissions from "expo-permissions";

class EditProfile extends Component {
  state = {
    email: "",
    isLoading: true,
    token: "",
    gender: "",
    name: "",
    age: "",
    phone: "",
    registration: "",
    designation: "",
    speciality: "",
    affiliation: "",
    isLoggedIn: false,
    image: ""
  };

  updateHandler = () => {
    const { name, email, phone, age, gender, address } = this.state;
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
                <View style={{backgroundColor: "#f7f7f7", width: responsiveWidth(100)}}>
                    <Icon name="users" size={60} color="gray" style={{textAlign: "center", marginTop: 20}}/>
                    <Text style={{textAlign: "center", fontSize: 18, color: "gray", fontWeight: "bold", marginBottom: 25}}>Edit Profile</Text>
                </View>
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
                    Name
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
                    Age
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
                    Gender
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
                        <Picker.Item label="None" value="" />
                        <Picker.Item label="Male" value="male" />
                        <Picker.Item label="Female" value="female" />
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
                    Speciality
                </Text>
                <TextInput
                    placeholder="Speciality"
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
                    name="speciality"
                    onChangeText={value => this.setState({ speciality: value })}
                    value={this.state.speciality}
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
                    Designation
                </Text>
                <TextInput
                    placeholder="Designation"
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
                    name="designation"
                    onChangeText={value => this.setState({ designation: value })}
                    value={this.state.designation}
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
            <TouchableOpacity onPress={this.updateHandler} style={{marginBottom: 25}}>
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
                    Update Profile
                </Text>
            </TouchableOpacity>
            </View>
        </KeyboardAwareScrollView>
      );
  }
}

export default EditProfile;
