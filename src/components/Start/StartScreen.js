import React, { Component } from "react";
import { View, Text, ImageBackground } from "react-native";
import { responsiveWidth, responsiveHeight } from "react-native-responsive-dimensions";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import LoginImage from "../../images/login.jpg"
import { TouchableOpacity } from "react-native-gesture-handler";

class StartScreen extends Component {
  render() {
      return (      
        <View style={{alignItems: "center", flex: 1, flexDirection: "column"}}>
            <ImageBackground 
                source={LoginImage} 
                style={{
                    flex: 1,
                    resizeMode: "cover",
                    justifyContent: "center",
                    backgroundColor: "black", 
                    opacity: 0.7,
                    width: responsiveWidth(100), 
                    height: responsiveHeight(100)
                }}
            >
              <View style={{alignItems: "center"}}>
                <TouchableOpacity
                  style={{
                      borderWidth:1,
                      borderColor:'white',
                      alignItems:'center',
                      justifyContent:'center',
                      width:150,
                      height:150,
                      backgroundColor:'white',
                      borderRadius:75
                    }}
                    onPress={() => {
                      this.props.navigation.navigate("Login", {role: "patient"})
                    }}
                >
                  <Text style={{fontSize: 30, fontWeight: "bold"}}>Patient</Text>
                  <Icon name={"hospital"}  size={40} color="red" />
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                      borderWidth:1,
                      borderColor:'white',
                      alignItems:'center',
                      justifyContent:'center',
                      width:150,
                      height:150,
                      backgroundColor:'white',
                      borderRadius:75,
                      marginTop: 50
                    }}
                    onPress={() => {
                      this.props.navigation.navigate("Login", {role: "doctor"})
                    }}
                >
                  <Text style={{fontSize: 30, fontWeight: "bold"}}>Doctor</Text>
                  <Icon name={"doctor"}  size={40} color="green" />
                </TouchableOpacity>
              </View>
            </ImageBackground>
        </View>
      );
  }
}

export default StartScreen;
