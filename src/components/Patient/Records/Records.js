import React, { Component } from 'react';
import { Container, Tab, Tabs } from 'native-base';
import Upcoming from './Upcoming';
import Completed from './Completed';

export default class Records extends Component {

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
          <Tab heading="Upcoming" tabStyle={{backgroundColor: '#f7f7f7'}} textStyle={{color: 'gray'}} activeTabStyle={{backgroundColor: '#f7f7f7'}} activeTextStyle={{color: 'steelblue', fontWeight: "bold"}}>
            <Upcoming navigation={this.props.navigation}/>
          </Tab>
          <Tab heading="Completed" tabStyle={{backgroundColor: '#f7f7f7'}} textStyle={{color: 'gray'}} activeTabStyle={{backgroundColor: '#f7f7f7'}} activeTextStyle={{color: 'steelblue', fontWeight: "bold"}}>
            <Completed navigation={this.props.navigation}/>
          </Tab>
        </Tabs>
      </Container>
    );
  }
}