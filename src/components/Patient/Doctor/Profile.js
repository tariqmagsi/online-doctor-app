import React, { Component } from "react";
import { View, Text } from "react-native";
import { responsiveWidth } from "react-native-responsive-dimensions";
import { FontAwesome5 } from "@expo/vector-icons";
import { Container, Content, Body, List, ListItem, Footer, Button, Card, CardItem, Left, Right, Item } from "native-base";

export default class DoctorProfile extends Component {
  state = {
    isLoading: true,
  };


  render() {
      return (
        <Container style={{backgroundColor:"#f4f4f4"}}>
            <View style={{alignItems: "center", }}>
                <View style={{backgroundColor: "#f7f7f7", width: responsiveWidth(100)}}>
                    <FontAwesome5 name="user" size={60} color="gray" style={{textAlign: "center", marginTop: 20}}/>
                    <Text style={{textAlign: "center", fontSize: 18, color: "gray", fontWeight: "bold", marginBottom: 25}}>Doctor's Profile</Text>
                </View>
            </View>
            <Content>
                <List style={{backgroundColor: "#f4f4f4"}}>
                    <ListItem>
                        <Text >Name: {this.props.route.params.name}</Text>
                    </ListItem>
                    <ListItem>
                        <Text>Speciality: {this.props.route.params.speciality}</Text>
                    </ListItem>
                    <ListItem>
                        <Text>Designation: {this.props.route.params.designation}</Text>
                    </ListItem>
                    {/* <ListItem>
                        <Text>Location: Abc</Text>
                    </ListItem> */}
                </List>
            </Content>
            <Card noShadow style={{ width: responsiveWidth(100), marginLeft: 0, marginBottom: 0, borderRadius: 0, marginTop: 0}} >
                <CardItem button onPress={() => { this.props.navigation.navigate("Appointment", this.props.route.params) }} style={{backgroundColor: "green"}}>
                    <Left/>  
                    <Body style={{alignItems: "center", }}>
                        <Text style={{color: "white", fontSize: 16}}>APPOINTMENT</Text>
                    </Body>
                    <Right/>
                </CardItem>
            </Card>
        </Container>
      );
  }
}

