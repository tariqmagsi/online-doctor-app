import React, { Component } from "react";
import { Text } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Container, Content, List, ListItem, Left, Body, Right, Icon, Button } from "native-base";
import { responsiveWidth } from "react-native-responsive-dimensions";

export default class VideocallHistory extends Component {
  state = {
    data: [
          "This is call history",
          "This is call history","This is call history",
          "This is call history","This is call history",
        ],
    isLoading: true
  }

  async componentDidMount(){
    setTimeout(() => this.setState({isLoading: false}), 0)
  }

  render() {
    if(this.state.isLoading) {
      return <Container/>
    }
      return (
        <Container>
          <Text style={{alignItems: "center", padding: 20, fontSize: 18, color: "gray", backgroundColor: "#f7f7f7"}}>
                Call Logs
          </Text>
          <Content></Content>
            
            {/*<Content>
              <List>
                  {this.state.data.map((item,i) =>
                      <ListItem button key={i} icon onPress={() => {this.props.navigation.navigate("Prescription")}}>
                          <Left>
                            <MaterialCommunityIcons name="phone" color="green" size={20}/>
                          </Left>
                          <Body>
                            <Text>{item}</Text>
                          </Body>
                          <Right>
                            <Icon active name="arrow-forward" />
                          </Right>
                      </ListItem>
                  )}
              </List>
            </Content> */}
            <Button 
              style={{width: responsiveWidth(100), borderRadius: 0, alignItems: "center", justifyContent: "center", backgroundColor: "green"}}
              onPress={() => this.props.navigation.navigate("Calling", this.props.route.params)}
            >
              <Text style={{color: "white", fontSize: 20}}>
                <MaterialCommunityIcons size={22} name="video"/>
                {"  "}
                Call Now
              </Text>
            </Button>
        </Container>
      );
  }
}

