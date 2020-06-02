import React, { Component } from "react";
import { responsiveWidth, responsiveHeight } from "react-native-responsive-dimensions";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Container, Content, Button, Text, View } from "native-base";
import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";
import { Image } from "react-native";
import axios from 'axios';
import Api from '../../../Api/Api.json'

export default class UploadPrescription extends Component {
    state = { image: "", isLoading: false }

    whenPressHandler = () => {
        Permissions.askAsync(Permissions.CAMERA).then(
          ({ status }) => {
            if (status === "granted") {
                const options = {
                    base64: true,
                }
              ImagePicker.launchCameraAsync(options)
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

    UploadPrescription = () =>{
      this.setState({isLoading: true}, () => {
        const headers = {
          headers: { "Content-Type" : "application/json"}
        }
        const body = {
          task: "uploadCurrentPrescription",
          appointment_id: this.props.route.params.appointment_id.toString(),
          fileb64String: `data:image/png;base64,${this.state.image}`
        }
        axios
        .post(Api.DOCTOR_API, body, headers)
        .then(res => this.setState({isLoading: false, image: ""}, () => alert("Prescription Uploaded Seccessfully")))
        .catch(err => this.setState({isLoading: false}, () => {
          alert("Something went wrong")
        }))
      })
    }
 
    render() {
      return (
        <Container style={{backgroundColor: "#f4f4f4"}}>
            <Content>
                <View style={{justifyContent: "center", alignItems: "center"}}>
                <Image style={{width: responsiveWidth(80), height: responsiveHeight(50), marginTop: 10}} source={{uri: `data:image/png;base64,${this.state.image}`}}/>
                    <Button style={{backgroundColor: "steelblue",marginTop: 10, width: responsiveWidth(70), borderRadius: 0, justifyContent: "center"}} onPress={this.whenPressHandler}>
                        <Text style={{textAlign: "center", textTransform: "capitalize"}}>
                            <MaterialCommunityIcons size={15} name="camera"/> Take Photo
                        </Text>
                    </Button>
                    {this.state.image.length > 0 && 
                    <Button style={{backgroundColor: "green",marginTop: 10, width: responsiveWidth(70), borderRadius: 0, justifyContent: "center"}} onPress={this.UploadPrescription} disabled={this.state.isLoading}>
                        <Text style={{textAlign: "center", textTransform: "capitalize"}}>
                         {!this.state.isLoading ? "Upload" : "Loading..."}
                        </Text>
                    </Button>}
                </View>
            </Content>
        </Container>
      );
    }
}

