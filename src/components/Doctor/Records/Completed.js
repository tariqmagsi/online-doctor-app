import React, { Component } from 'react';
import { Container, Content } from 'native-base';
import CompletedCard from './CompletedCard';
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
    getFromStorage("doctor")
    .then(res => {
      const headers = {
        headers: { "Content-Type" : "application/json" }
      }

      const body = {
        task: "getAppointmentList",
        doctor_id: res.data[0].id.toString(),
        status: "1"
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
          {this.state.data.map((item, i) => <CompletedCard navigation={this.props.navigation} item={item} key={item.appointment_id}/>)}
        </Content>
      </Container>
    );
  }
}