import React, { Component } from 'react';
import { Container, Tab, Tabs, Card, CardItem, Text, List, ListItem, View, Icon } from 'native-base';
import { FontAwesome5 } from '@expo/vector-icons';
import { responsiveWidth } from 'react-native-responsive-dimensions';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default class BillingInformation extends Component {

  state = { isLoading: true }

  async componentDidMount(){
    setTimeout(() => this.setState({isLoading: false}), 0)
  }

  render() {

    if(this.state.isLoading) {
      return <Container />
    }
    return (
      <Container>
        <Tabs tabBarUnderlineStyle={{ backgroundColor: "steelblue" }}>
          <Tab heading="Card Information" tabStyle={{backgroundColor: '#f7f7f7'}} textStyle={{color: 'gray'}} activeTabStyle={{backgroundColor: '#f7f7f7'}} activeTextStyle={{color: 'steelblue', fontWeight: "bold"}}>
            <View style={{alignItems: "center"}}>
                <View style={{backgroundColor: "#f7f7f7", width: responsiveWidth(100)}}>
                  <Icon name="card" style={{textAlign: "center", color: "gray", fontSize: 60, marginTop: 20}}/>
                  <Text style={{textAlign: "center", fontSize: 18, color: "gray", fontWeight: "bold", marginBottom: 25}}>Card Information</Text>
                </View>
            </View>
            <List>
              <ListItem>
                <Text>Card Setting</Text>
              </ListItem>
              <ListItem>
                <Text>Card Type</Text>
              </ListItem>
              <ListItem>
                <Text>Card Info</Text>
              </ListItem>
            </List>
            <View style={{position: 'absolute', left: 0, right: 0, bottom: 0}}>
              <TouchableOpacity onPress={() => {alert("Save Card Information")}}>
                <Text
                    style={{
                        fontSize: 20,
                        color: "white",
                        backgroundColor: "#4BB543",
                        width: responsiveWidth(100),
                        height: 50,
                        borderRadius: 2,
                        textAlign: "center",
                        zIndex: 1,
                        paddingTop: 10
                    }}
                >
                    Save Card Information
                </Text>
              </TouchableOpacity>
            </View>
          </Tab>
          <Tab heading="Recharge" tabStyle={{backgroundColor: '#f7f7f7'}} textStyle={{color: 'gray'}} activeTabStyle={{backgroundColor: '#f7f7f7'}} activeTextStyle={{color: 'steelblue', fontWeight: "bold"}}>
            <View style={{alignItems: "center"}}>
                <View style={{backgroundColor: "#f7f7f7", width: responsiveWidth(100)}}>
                  <Icon name="card" style={{textAlign: "center", color: "gray", fontSize: 60, marginTop: 20}}/>
                  <Text style={{textAlign: "center", fontSize: 18, color: "gray", fontWeight: "bold", marginBottom: 25}}>Recharge</Text>
                </View>
            </View>
            <List>
              <ListItem>
                <Text>Available Balance:</Text>
              </ListItem>
              <ListItem>
                <Text>Recharge Amount:</Text>
              </ListItem>
            </List>
            <View style={{position: 'absolute', left: 0, right: 0, bottom: 0}}>
              <TouchableOpacity onPress={() => {alert("Recharge Now")}}>
                <Text
                    style={{
                        fontSize: 20,
                        color: "white",
                        backgroundColor: "green",
                        width: responsiveWidth(100),
                        height: 50,
                        borderRadius: 2,
                        textAlign: "center",
                        zIndex: 1,
                        paddingTop: 10
                    }}
                >
                    Recharge Now
                </Text>
              </TouchableOpacity>
            </View>
          </Tab>
        </Tabs>
      </Container>
    );
  }
}