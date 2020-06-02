import React, { Component } from "react";
import { View, Text } from "react-native";
import { responsiveWidth } from "react-native-responsive-dimensions";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Content, Container, Button } from "native-base";

export default class Appointment extends Component {
  render() {
      return (
        <Container>
            <View style={{alignItems: "center"}}>
                <View style={{backgroundColor: "#f7f7f7", width: responsiveWidth(100)}}>
                    <MaterialCommunityIcons name="book" size={60} color="steelblue" style={{textAlign: "center", marginTop: 20}}/>
                    <Text style={{textAlign: "center", fontSize: 18, color: "gray", fontWeight: "bold", marginBottom: 25}}>Prescription</Text>
                </View>
            </View>
            <Content style={{margin: 20}}>
                <Text>
                    This is your prescription
                </Text>
            </Content>
            <Button style={{width: responsiveWidth(100), borderRadius: 0, alignItems: "center", justifyContent: "center", backgroundColor: "steelblue"}}>
              <Text style={{color: "white", fontSize: 20}}>
                <MaterialCommunityIcons size={22} name="download"/>
                {"  "}
                Download Attachment
              </Text>
            </Button>
        </Container>
      );
  }
}

