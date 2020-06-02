import React, { Component } from "react";
import { View, Text } from "react-native";
import { responsiveWidth } from "react-native-responsive-dimensions";
import { FontAwesome5 } from "@expo/vector-icons";
import { Container, Content, Body, List, ListItem } from "native-base";

export default class Profile extends Component {
  state = {
    isLoading: true,
  };


  render() {
      return (
        <Container style={{backgroundColor: "#f7f7f7"}}>
            <View style={{alignItems: "center"}}>
                <View style={{backgroundColor: "#f7f7f7", width: responsiveWidth(100)}}>
                    <FontAwesome5 name="user" size={60} color="gray" style={{textAlign: "center", marginTop: 20}}/>
                    <Text style={{textAlign: "center", fontSize: 18, color: "gray", fontWeight: "bold", marginBottom: 25}}>Profile Information</Text>
                </View>
            </View>
            <Content>
                <List style={{backgroundColor: "#f4f4f4"}}>
                    <ListItem>
                        <Text>Name: Abc</Text>
                    </ListItem>
                    <ListItem>
                        <Text>Age: 43</Text>
                    </ListItem>
                    <ListItem>
                        <Text>Gender: Male</Text>
                    </ListItem>
                    <ListItem>
                        <Text>Address: Abc</Text>
                    </ListItem>
                    <ListItem>
                        <Text>Email: Abc@email.com</Text>
                    </ListItem>
                    <ListItem>
                        <Text>Mobile Number: +54354654</Text>
                    </ListItem>
                </List>
            </Content>
        </Container>
      );
  }
}

