import React, { Component } from 'react';
import { Container, Content } from 'native-base';
import UpcomingCard from './UpcomingCard';
import Loader from '../../Loader/Loader';
import { getFromStorage } from '../../../utils/storage';
import axios from 'axios';
import Api from '../../../Api/Api.json'

export default class Alerts extends Component {
  state = {
    data: [],
    isLoading: true 
  }
  fetchAppointmentList = () =>  {
    getFromStorage("patient")
    .then(res => {
      const headers = {
        headers: { "Content-Type" : "application/json" }
      }
      const body = {
        task: "showAppointments",
        patient_id: res.data[0].di_id.toString(),
        status: "0"
      }

      if(res) {
        axios
        .post(Api.PATIENT_API, body, headers)
        .then(res => this.setState({data: res.data, isLoading: false}))
        .catch(err => this.setState({isLoading: false}))
      } else {
        this.setState({isLoading: false})
      }
    })
    .catch(err => this.setState({isLoading: false}))
    
  }
  componentDidMount(){
    this.fetchAppointmentList()
  }
  componentDidUpdate() {
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
        <Content>
          {this.state.data.map((item, i) => <UpcomingCard navigation={this.props.navigation} item={item} key={i}/>)}
        </Content>
      </Container>
    );
  }
}