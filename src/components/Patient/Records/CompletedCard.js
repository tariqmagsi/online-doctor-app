import React, { Component } from "react";
import { Content, Card, CardItem, Text, Body} from "native-base";
import { responsiveWidth } from "react-native-responsive-dimensions";
import moment from 'moment'

export default class CompletedCard extends Component {

  render() {
    const { item } = this.props
    return (
        <Content padder style={{backgroundColor: "#f7f7f7", marginTop: -15}}>
            <Card noShadow style={{ width: responsiveWidth(100), marginLeft: -10, marginTop: 0, borderColor: "white"}} >
                <CardItem button onPress={() => this.props.navigation.navigate("Appointment Details", item)}>  
                  <Body>
                    <Text style={{fontWeight: "bold"}}>Appointment No. {item.appointment_id}</Text>
                    {/* <Text style={{ color: "silver", fontSize: 14 }}>name</Text> */}
                    <Text style={{ fontSize: 14 }}>{moment(parseInt(this.props.item.start_time), "YYYYMMDDhhmmss").format("DD/MM/YYYY hh:mm A")}</Text>
                  </Body>
                </CardItem>
            </Card>
        </Content>
    );
  }
}