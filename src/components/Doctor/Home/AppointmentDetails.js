import React, { Component } from "react";
import { View,  } from "react-native";
import { responsiveWidth } from "react-native-responsive-dimensions";
import { FontAwesome5, MaterialCommunityIcons } from "@expo/vector-icons";
import { Container, Content, List, ListItem, Left, Right, Button, Footer, Text, Icon } from "native-base";
import {  TextInput } from "react-native-gesture-handler";
import moment from 'moment';

export default class AppointmentDetails extends Component {
  state = {
    isLoading: true,
    comment: ""
  };

  render() {
      return (
        <Container style={{backgroundColor: "#f4f4f4"}}>
            <Content>
                <List style={{backgroundColor: "#f4f4f4"}}>
                    <ListItem>
                        <Text>Time: {moment(parseInt(this.props.route.params.start_time), 'YYYYMMDDhhmmss').format("DD/MM/YYYY hh:mm A")}</Text>
                    </ListItem>
                    <ListItem>
                        <Text>Call Duration: 5 minutes</Text>
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
                    <Button style={{backgroundColor: "green", width: responsiveWidth(45), borderRadius: 0, justifyContent: "center"}} onPress={() => {this.props.navigation.navigate("Doctor Video Call", this.props.route.params)}}>
                    <Text style={{textAlign: "center", textTransform: "capitalize"}}>
                        <MaterialCommunityIcons size={15} name="video"/> Start Call
                    </Text>
                </Button>
                <Button style={{backgroundColor: "steelblue", width: responsiveWidth(45),marginLeft: 5, borderRadius: 0, justifyContent: "center"}} onPress={() => {this.props.navigation.navigate("Upload Prescription", this.props.route.params)}}>
                    <Text style={{textAlign: "center", textTransform: "capitalize"}}>
                        Upload Prescription
                    </Text>
                </Button>
                    </ListItem>
                </List>
            </Content>
        </Container>
      );
  }
}

