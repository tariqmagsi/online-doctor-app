import React, { Component } from "react";
import { Content, Card, CardItem, Text, Body, Button, Right, Icon, Left } from "native-base";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { responsiveWidth } from "react-native-responsive-dimensions";

export default class Cards extends Component {
  state = {
    selected: undefined
  }
  render() {
    const { item } = this.props
  
    return (
        <Content padder style={{backgroundColor: "#f7f7f7", marginTop: -15}}>
            <Card noShadow style={{ width: responsiveWidth(100), marginLeft: -10, marginTop: 0, borderColor: "white"}} >
                <CardItem button onPress={() => this.props.navigation.navigate("Doctor Profile", item)}>  
                  <Body>
                    <Text style={{fontWeight: "bold"}}>{item.name}</Text>
                    <Text style={{ fontSize: 12, marginTop: 5 }}>{item.speciality}</Text>
                    <Text style={{ color: "gray", fontSize: 12 }}>{item.designation}</Text>
                  </Body>
                  <Right>
                    <Icon name="arrow-forward" color="steelblue"/>
                  </Right>
                </CardItem>
                <CardItem footer bordered style={{borderBottomColor: "white"}}>
                  {/* <Body style={{a}}> */}
                    <Button small style={{backgroundColor: "steelblue"}} onPress={() => {this.props.navigation.navigate("Appointment", item)}}>
                      <Text>Appointment</Text>
                    </Button>
                  {/* </Body> */}
                  {/* <Right>
                    <Button small style={{backgroundColor: "green"}} onPress={() => {this.props.navigation.navigate("Video Call", item)}}>
                      <Text>
                        <MaterialCommunityIcons size={15} name="video"/>
                        {" "}
                        Video Call
                      </Text>
                    </Button>
                  </Right> */}
                </CardItem>
            </Card>
        </Content>
    );
  }
}