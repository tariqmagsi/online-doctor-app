import React, { Component } from "react";
import { Left, Body, Icon, Container, Text, Card, CardItem, Right, List, ListItem, Header, Title } from "native-base";
import Cards from "../Doctor/Card";
import { responsiveWidth } from "react-native-responsive-dimensions";
import { FlatList } from "react-native-gesture-handler";
import axios from "axios";
import Api from "../../../Api/Api.json"
import Loader from "../../Loader/Loader";

class Home extends Component {
    state = {
      data: [],
      isLoading: true
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
      .then(res => this.setState({data: res.data.length > 5 ? [res.data[0], res.data[1], res.data[2], res.data[3], res.data[4]] : res.data, isLoading: false}))
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
            <Title style={{color: "gray", paddingTop: 20, backgroundColor: "#f7f7f7"}}>Online Doctor Application</Title>
            <Text style={{alignItems: "center", padding: 20, fontSize: 18, color: "gray", backgroundColor: "#f7f7f7"}}>
                Available Doctors
            </Text>

            <FlatList
                data={this.state.data}
                renderItem={this.renderList}
                keyExtractor={item => item.id.toString()}
            />
            
            <Card noShadow style={{ width: responsiveWidth(100), marginLeft: -10, marginTop: 0, borderColor: "white", backgroundColor: "#f7f7f7"}} >
                <CardItem button onPress={() => { this.props.navigation.navigate("Doctor") }}>
                    <Left/>  
                    <Body style={{alignItems: "center", }}>
                        <Text style={{color: "steelblue"}}>View More</Text>
                    </Body>
                    <Right>
                        <Icon name="arrow-forward" color="steelblue"/>
                    </Right>
                </CardItem>
            </Card>
        </Container>
      );
  }
}
export default Home;
