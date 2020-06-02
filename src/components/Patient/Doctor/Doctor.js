import React, { Component } from "react";
import { FlatList, View,  } from "react-native";
import { Container, Icon, Picker, Form, Text, Content, Right } from "native-base";
import { responsiveWidth } from "react-native-responsive-dimensions";
import Cards from "./Card";
import { ScrollView } from "react-native-gesture-handler";
import axios from 'axios';
import Api from "../../../Api/Api.json";
import Loader from "../../Loader/Loader";

export default class Doctor extends Component {
    state = {
        gender: "",
        data: [],
        speciality: undefined,
        location: undefined,
        designation: undefined,
        isLoading: true,
        designations: ["Bariatrics", "Burn Care", "Cancer Care", "Complex Spine Center", "Diabetes", "Digestive Health", "Emergency Medicine", "Family Medicine", "Heart Care", "Infectious Disease", "Internal Medicine", "Neurosciences", "Orthopaedics", "Pathology", "Pediatrics", "Pregnancy & Childbirth", "Psychiatry", "Radiology", "Speech & Hearing", "Stroke Care", "Surgery", "Trauma", "Urology", "USA Health Dramatology", "Women's Care"]
    }

    fetchDoctorsList = () => {
      let body = {
        task: "getDocList",
        speciality: this.state.speciality ? this.state.speciality : "",
        designation: this.state.designation ? this.state.designation : ""
      };
      let headers = { headers: { "Content-Type" : "application/json" } }
      axios
      .post(Api.PATIENT_API, body, headers)
      .then(res => this.setState({data: res.data, isLoading: false}))
      .catch(err => this.setState({isLoading: false}))
    }

  renderList = ({ item }) => <Cards item={item} navigation={this.props.navigation}/>

  async componentDidMount(){
    this.fetchDoctorsList()
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
            <Text style={{alignItems: "center", padding: 20, fontSize: 18, color: "gray", backgroundColor: "#f4f3ef"}}>
                Search Doctors
            </Text>
            <ScrollView  style={{height: 120}}>
            <Form style={{backgroundColor: "#f7f7f7"}}>   
                <Text
                  style={{
                      color: "gray",
                      textAlign: "left",
                      fontSize: 14,
                      marginBottom: -6,
                      zIndex: 1,
                      marginLeft: 5
                  }}
                >
                  Speciality 
                </Text>  
              <Picker
                mode="dialog"
                iosIcon={<Icon name="arrow-down" />}
                style={{ width: responsiveWidth(100), color: this.state.speciality === "" ? "silver" : "black" }}
                selectedValue={this.state.speciality}
                onValueChange={(value) => { this.setState({speciality: value, isLoading: true}, () => this.fetchDoctorsList()) }}
              >
                <Picker.Item label="Select Speciality" value="" />
                {["Consultant", "Assistant Professor", "Associate Professor", "Professor"].map(item => <Picker.Item label={item} value={item} key={item}/>)}
              </Picker>
              <Text
                  style={{
                      color: "gray",
                      textAlign: "left",
                      fontSize: 14,
                      marginBottom: -6,
                      zIndex: 1,
                      marginLeft: 5
                  }}
                >
                  Designation 
                </Text>  
              <Picker
                mode="dialog"
                iosIcon={<Icon name="arrow-down" />}
                style={{ width: responsiveWidth(100), color: this.state.designation === "" ? "silver" : "black" }}
                selectedValue={this.state.designation}
                onValueChange={(value) => { this.setState({designation: value, isLoading: true}, () => this.fetchDoctorsList()) }}
              >
                <Picker.Item label="Select Designation" value="" />
                {this.state.designations.map(item => <Picker.Item label={item} value={item} key={item}/>)}
              </Picker>
              <Text
                  style={{
                      color: "gray",
                      textAlign: "left",
                      fontSize: 14,
                      marginBottom: -6,
                      zIndex: 1,
                      marginLeft: 5
                  }}
                >
                  Location 
                </Text>  
              <Picker
                mode="dialog"
                iosIcon={<Icon name="arrow-down" />}
                style={{ width: responsiveWidth(100) }}
                selectedValue={this.state.location}
                onValueChange={(value) => { this.setState({location: value}) }}
              >
                <Picker.Item label="All" value="key0" />
                <Picker.Item label="Location1" value="key1" />
                <Picker.Item label="Location2" value="key2" />
                <Picker.Item label="Location3" value="key3" />
                <Picker.Item label="Location4" value="key4" />
              </Picker>
            </Form>
            </ScrollView>
            <FlatList
              data={this.state.data}
              renderItem={this.renderList}
              keyExtractor={item => item.id.toString()}
            />
           
        </Container>
      );
  }
}
