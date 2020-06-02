import React, { Component } from 'react';
import { Container, Header, Content, Button, ListItem, Text, Icon, Left, Body, Right, Switch, Title } from 'native-base';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { removeFromStorage, getFromStorage } from '../../../utils/storage';

export default class Settings extends Component {

  state = { isLoading: true }

  async componentDidMount(){
    this.setState({isLoading: false})
  }

  render() {

    if(this.state.isLoading) {
      return <Container />
    }

    return (
      <Container>
        <Text style={{alignItems: "center", padding: 20, fontSize: 18, color: "gray", backgroundColor: "#f7f7f7"}}>
            Settings
        </Text>
        <Content>
          <ListItem icon button onPress={() => {this.props.navigation.navigate("Profile Information")}}>
            <Left>
              <Button style={{ backgroundColor: "steelblue" }}>
                <Icon active name="person" />
              </Button>
            </Left>
            <Body>
              <Text>Name</Text>
            </Body>
          </ListItem>
          <ListItem icon button onPress={() => {this.props.navigation.navigate("Billing Setup")}}>
            <Left>
              <Button style={{ backgroundColor: "green" }}>
                <Icon active name="paper" />
              </Button>
            </Left>
            <Body>
              <Text>Billing Setup</Text>
            </Body>
            <Right>
              <Icon active name="arrow-forward" />
            </Right>
          </ListItem>
          <ListItem icon button onPress={() => {this.props.navigation.navigate("Edit Profile")}}>
            <Left>
              <Button style={{ backgroundColor: "#f0ad4e" }}>
                <MaterialCommunityIcons active name="marker" style={{color: "white"}} size={20}/>
              </Button>
            </Left>
            <Body>
              <Text>Edit Profile</Text>
            </Body>
            <Right>
              <Icon active name="arrow-forward" />
            </Right>
          </ListItem>
          <ListItem icon button onPress={() => {this.props.navigation.navigate("Change Password")}}>
            <Left>
              <Button style={{ backgroundColor: "#22bb33" }}>
                <Icon active name="lock" />
              </Button>
            </Left>
            <Body>
              <Text>Change Password</Text>
            </Body>
            <Right>
              <Icon active name="arrow-forward" />
            </Right>
          </ListItem>
          <ListItem icon button onPress={() => {
            removeFromStorage("patient")
            this.props.navigation.replace("Start")
          }}>
            <Left>
              <Button style={{ backgroundColor: "#bb2124" }}>
                <MaterialCommunityIcons active name="logout" style={{color: "white"}} size={20}/>
              </Button>
            </Left>
            <Body>
              <Text>Logout</Text>
            </Body>
            <Right>
              <Icon active name="arrow-forward" />
            </Right>
          </ListItem>
        </Content>
      </Container>
    );
  }
}