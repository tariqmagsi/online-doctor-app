import React, { Component } from "react";
import { responsiveWidth, responsiveHeight } from "react-native-responsive-dimensions";
import { Container, Content, List, ListItem, Button, Text } from "native-base";
import { TextInput } from "react-native-gesture-handler";
import * as MediaPicker from "expo-image-picker";
import * as Permissions from "expo-permissions";
import * as FileSystem from "expo-file-system"
import moment from 'moment';
import { getFromStorage } from "../../../utils/storage";
import axios from 'axios';
import Api from "../../../Api/Api.json"

export default class AppointmentDetails extends Component {
    state = {
        isLoading: true,
        key: "",
        comment: "",
        image: "",
        download: ""
    };

    whenPressHandler = () => {
        Permissions.askAsync(Permissions.CAMERA_ROLL).then(
            ({ status }) => {
                if (status === "granted") {
                    const options = {
                        mediaTypes: MediaPicker.MediaTypeOptions.Images,
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

    downloading = () => {
        FileSystem.downloadAsync(
            this.state.download,
            FileSystem.documentDirectory + `/prescription_${this.props.route.params.appointment_id.toString()}.jpg`
        )
        .then(({ uri }) => {
            alert(`File Downloaded Successfully on path: ${uri}`)
        })
        .catch(error => {
            alert("Couldn't Download Something went wrong");
        });
    }

    downloadPrescription = () =>  {
        
        getFromStorage("patient")
        .then(res => {
          const headers = {
            headers: { "Content-Type" : "application/json" }
          }
          
          const body = {
            task: "getCurrentPrescription",
            appointment_id: this.props.route.params.appointment_id.toString()
          }

          if(res) {
            
            axios
            .post(Api.PATIENT_API, body, headers)
            .then(res => {
                if(res.data) {
                    this.setState({download: res.data}, () => {this.downloading()})
                } else {
                    alert("Something went wrong")
                }
            })
            .catch(err => alert("Something went wrong"))
          } else {
            this.setState({isLoading: false})
           
          }
        })
        .catch(err => this.setState({isLoading: false}))
        
      }

      componentDidMount() {

      }

  render() {
      return (
        <Container style={{backgroundColor: "#f4f4f4"}}>
            <Content>
                <List style={{backgroundColor: "#f4f4f4"}}>
                    <ListItem>
                        <Text>Time: {moment(parseInt(this.props.route.params.start_time), "YYYYMMDDhhmmss").format("DD/MM/YYYY hh:mm A")}</Text>
                    </ListItem>
                    <ListItem>
                        <Text>Cost: 43</Text>
                    </ListItem>
                    <ListItem>
                        <Text>Doctor</Text>
                    </ListItem>
                    <ListItem>
                        <Text>Prescription</Text>
                    </ListItem>
                    <ListItem>
                        <Text>Lab Reports</Text>
                    </ListItem>
                    <ListItem>
                        <TextInput
                            placeholder="Comment"
                            style={{
                                height: 40,
                                borderTopColor: "white",
                                borderBottomColor: "silver",
                                borderLeftColor: "white",
                                borderRightColor: "white",
                                borderWidth: 1,
                                paddingLeft: 5,
                                backgroundColor: "white",
                                width: responsiveWidth(90)
                            }}
                            name="comment"
                            onChangeText={value => this.setState({ comment: value })}
                            value={this.state.comment}
                        />
                    </ListItem>
                    <ListItem>
                    <Button style={{backgroundColor: "steelblue", width: responsiveWidth(45), borderRadius: 0, justifyContent: "center"}} onPress={this.whenPressHandler}>
                    <Text style={{textAlign: "center", textTransform: "capitalize"}}>
                        Upload Lab Report
                    </Text>
                </Button>
                <Button style={{backgroundColor: "green", width: responsiveWidth(45),marginLeft: 5, borderRadius: 0, justifyContent: "center"}} onPress={this.whenPressHandler}>
                    <Text style={{textAlign: "center", textTransform: "capitalize"}}>
                        Upload Prescription
                    </Text>
                </Button>
                    </ListItem>
                    <ListItem style={{alignItems: "center", justifyContent: "center"}}>
                        <Button style={{backgroundColor: "green",marginLeft: 5, borderRadius: 0, justifyContent: "center"}} onPress={this.downloadPrescription}>
                            <Text style={{textAlign: "center", textTransform: "capitalize"}}>
                                Download Prescription
                            </Text>
                        </Button>
                    </ListItem>
                </List>
                {/* {this.state.download.length > 0 && <Image style={{width: responsiveWidth(80), height: responsiveHeight(50), marginTop: 10}} source={{uri: `${this.state.download}`}}/>} */}
            </Content>
        </Container>
      );
  }
}

