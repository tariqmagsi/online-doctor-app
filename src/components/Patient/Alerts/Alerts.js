import React, { Component } from 'react';
import { Container, Header, Content, List, ListItem, Text, Body, Icon, Button, Left } from 'native-base';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default class Alerts extends Component {
  state = {
    data: [
          "This is alert notification",
          "This is alert notification","This is alert notification",
          "This is alert notification","This is alert notification",
          "This is alert notification",
        ],
    isLoading: true
        
  }

  async componentDidMount(){
    this.setState({isLoading: false})
  }

  render() {

    if(this.state.isLoading) {
      return <Container/>
    }

    return (
      <Container>
       <Text style={{alignItems: "center", padding: 20, fontSize: 18, color: "gray", backgroundColor: "#f7f7f7"}}>
            Alerts
        </Text>
        <Content>
          <List>
            {this.state.data.map((item,i) =>
              <ListItem button key={i} icon>
                <Left>
                  <MaterialCommunityIcons name="bell" color="steelblue" size={20}/>
                </Left>
                <Body>
                  <Text>{item}</Text>
                </Body>
              </ListItem>
            )}
          </List>
        </Content>
      </Container>
    );
  }
}