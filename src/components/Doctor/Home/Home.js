import React, { Component } from "react";
import { Left, Body, Icon, Container, Text, Card, CardItem, Right, List, ListItem, Header, Title } from "native-base";
import Cards from "../Doctor/Card";
import { responsiveWidth } from "react-native-responsive-dimensions";
import { FlatList } from "react-native-gesture-handler";
import { getFromStorage } from "../../../utils/storage";
import Api from "../../../Api/Api.json"
import axios from 'axios'
import Loader from "../../Loader/Loader";


class Home extends Component {
    state = {
        data: [],
      isLoading: true
    }
    

  fetchAppointmentList = () =>  {
    getFromStorage("doctor")
    .then(res => {
      const headers = {
        headers: { "Content-Type" : "application/json" }
      }

      const body = {
        task: "getAppointmentList",
        doctor_id: res.data[0].id.toString(),
        status: "0"
      }

      if(res) {
        axios
        .post(Api.DOCTOR_API, body, headers)
        .then(res => this.setState({data: res.data, isLoading: false}))
        .catch(err => this.setState({isLoading: false}))
      } else {
        this.setState({isLoading: false})
      }
    })
    .catch(err => this.setState({isLoading: false}))
    
  }

  renderList = ({ item }) => <Cards item={item} navigation={this.props.navigation}/>

  componentDidMount(){
    this.fetchAppointmentList()
  }
  
  render() {
      if(this.state.isLoading) {
        return (
              <Container style={{flex: 1, flexDirection: "row", alignItems: "center", justifyContent: "center"}}>
                  <Loader width={200} height={200}/>
              </Container>)
      }

      return (
        <Container>
            <Title style={{color: "gray", paddingTop: 20, backgroundColor: "#f7f7f7"}}>Online Doctor Application</Title>
            <Text style={{alignItems: "center", padding: 20, fontSize: 18, color: "gray", backgroundColor: "#f7f7f7"}}>
              List of Upcoming Appointments
            </Text>

            <FlatList
                data={this.state.data}
                renderItem={this.renderList}
                keyExtractor={item => item.appointment_id.toString()}
            />
        </Container>
      );
  }
}
export default Home;
