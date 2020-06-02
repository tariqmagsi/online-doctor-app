import React, { Component } from "react";
import { Content, Card, CardItem, Text, Body, Button, Right, Icon, Left } from "native-base";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { responsiveWidth } from "react-native-responsive-dimensions";
import moment from 'moment';

export default class Cards extends Component {
  state = {
    selected: undefined
  }

  timeFormat = (time) => {
    let am_pm = 'AM';
    let hour = parseInt(time.toTimeString().substr(0, 2));
    let minute = time.toTimeString().substr(3,2)
    if(hour>11){
        am_pm = 'PM';
        if(hour>12){
            hour = hour - 12;
        }
    }
    
    if(hour == 0){
        hour = 12;
    }
    const selectTime = `${hour}:${minute} ${am_pm}` ;
    return selectTime;
  }
  render() {
    const { item } = this.props
    console.log(item.start_time)
    return (
        <Content padder style={{backgroundColor: "#f7f7f7", marginTop: -15}}>
            <Card noShadow style={{ width: responsiveWidth(100), marginLeft: -10, marginTop: 0, borderColor: "white"}} >
                <CardItem button onPress={() => this.props.navigation.navigate("Appointment Details Doctor", item)}>  
                  <Body>
                    <Text style={{fontWeight: "bold"}}>Appointment No. {item.appointment_id}</Text>
                    {/* <Text style={{ color: "silver", fontSize: 14 }}>{item.designation}</Text> */}
                    <Text style={{ fontSize: 14 }}>{moment(parseInt(this.props.item.start_time), 'YYYYMMDDhhmmss').format("DD/MM/YYYY hh:mm A")}</Text>
                  </Body>
                  <Right>
                    <Icon name="arrow-forward" color="steelblue"/>
                  </Right>
                </CardItem>
            </Card>
        </Content>
    );
  }
}