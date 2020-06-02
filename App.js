import React, { Component } from 'react';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar, Platform, View, Text } from 'react-native';
import Login from "./src/components/Login/Login"
import Signup from './src/components/Signup/Signup';
import StartScreen from './src/components/Start/StartScreen';
import ForgotPassword from './src/components/Login/Forgotpassword';
import { Ionicons } from '@expo/vector-icons';
import TabBar from './src/components/Patient/TabBar/TabBar';
import Appointment from './src/components/Patient/Doctor/Appointment';
import VideocallHistory from './src/components/Patient/Videocall/VideocallHistory';
import Prescription from './src/components/Patient/Videocall/Prescription';
import EditProfile from './src/components/Patient/Settings/EditProfile';
import EditProfileDoctor from './src/components/Doctor/Settings/EditProfile';
import ChangePassword from './src/components/Patient/Settings/ChangePassword';
import ChangePasswordDoctor from './src/components/Doctor/Settings/ChangePassword';
import BillingInformation from './src/components/Patient/Settings/BillingInformation';
import Profile from './src/components/Patient/Settings/Profile';
import ProfileDoctor from './src/components/Doctor/Settings/Profile';
import DoctorProfile from './src/components/Patient/Doctor/Profile';
import AppointmentDetails from './src/components/Patient/Records/AppointmentDetails';
import AppointmentDetailsDoctor from './src/components/Doctor/Home/AppointmentDetails';
import TabBarDoctor from './src/components/Doctor/TabBar/TabBar';
import UploadPrescription from './src/components/Doctor/Home/UploadPrescription';
import SignupDoctor from "./src/components/Signup/DoctorSigup"
import Call from "./src/components/Patient/Videocall/Call";
import DoctorCalling from "./src/components/Doctor/Videocall/Call";
import DoctorVideoCall from "./src/components/Doctor/Videocall/VideocallHistory";

const Stack = createStackNavigator();

export default class App extends Component {

  async componentDidMount() {
    await Expo.Font.loadAsync({
      Roboto: require('native-base/Fonts/Roboto.ttf'),
      Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
      ...Ionicons.font,
    });
  }

  render(){
    return (
      <View style={{flex: 1}}>
        <StatusBar
          barStyle="dark-content"
          hidden={false}
          backgroundColor="#f7f7f7"
          translucent={false}
          networkActivityIndicatorVisible={true}
        />
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen 
              name="Start" 
              component={StartScreen}  
              options={{headerShown: false}}
            />
            <Stack.Screen 
              name="Login" 
              component={Login}  
              options={{
                headerShown: Platform.OS === "ios",
                headerTintColor: "gray",
                headerStyle: {
                  backgroundColor: "#f7f7f7"
                }
              }}
            />
            <Stack.Screen 
              name="Signup" 
              component={Signup}  
              options={{
                headerShown: Platform.OS === "ios",
                headerTintColor: "gray",
                headerStyle: {
                  backgroundColor: "#f7f7f7"
                }
              }}
            />
            <Stack.Screen 
              name="Signup Doctor" 
              component={SignupDoctor}  
              options={{
                headerShown: Platform.OS === "ios",
                headerTintColor: "gray",
                headerStyle: {
                  backgroundColor: "#f7f7f7"
                },
                headerTitle: "Signup"
              }}
            />
            <Stack.Screen 
              name="Forgot Password" 
              component={ForgotPassword}  
              options={{
                headerTintColor: "gray",
                headerStyle: {
                  backgroundColor: "#f7f7f7"
                }
              }}
            />
            <Stack.Screen 
              name="Appointment" 
              component={Appointment}  
              options={{
                headerTintColor: "gray",
                headerStyle: {
                  backgroundColor: "#f7f7f7"
                }
              }}
            />
            <Stack.Screen 
              name="Video Call" 
              component={VideocallHistory}  
              options={{
                headerTintColor: "gray",
                headerStyle: {
                  backgroundColor: "#f7f7f7"
                }
              }}
            />
            <Stack.Screen 
              name="Doctor Video Call" 
              component={DoctorVideoCall}  
              options={{
                headerTintColor: "gray",
                headerStyle: {
                  backgroundColor: "#f7f7f7"
                },
                title: "Video Call"
              }}
            />
            <Stack.Screen 
              name="Prescription" 
              component={Prescription}  
              options={{
                headerTintColor: "gray",
                headerStyle: {
                  backgroundColor: "#f7f7f7"
                }
              }}
            />
            <Stack.Screen 
              name="Edit Profile" 
              component={EditProfile}  
              options={{
                headerTintColor: "gray",
                headerStyle: {
                  backgroundColor: "#f7f7f7"
                }
              }}
            />
            <Stack.Screen 
              name="Change Password" 
              component={ChangePassword}  
              options={{
                headerTintColor: "gray",
                headerStyle: {
                  backgroundColor: "#f7f7f7"
                }
              }}
            />
            <Stack.Screen 
              name="Billing Setup" 
              component={BillingInformation}  
              options={{
                headerTintColor: "gray",
                headerStyle: {
                  backgroundColor: "#f7f7f7"
                }
              }}
            />
            <Stack.Screen 
              name="Profile Information" 
              component={Profile}  
              options={{
                headerTintColor: "gray",
                headerStyle: {
                  backgroundColor: "#f7f7f7"
                }
              }}
            />
            <Stack.Screen 
              name="Profile Information Doctor" 
              component={ProfileDoctor}  
              options={{
                headerTintColor: "gray",
                headerStyle: {
                  backgroundColor: "#f7f7f7"
                },
                headerTitle: "Profile Information"
              }}
            />
            <Stack.Screen 
              name="Doctor Profile" 
              component={DoctorProfile}  
              options={{
                headerTintColor: "gray",
                headerStyle: {
                  backgroundColor: "#f7f7f7"
                }
              }}
            />
            <Stack.Screen 
              name="Appointment Details" 
              component={AppointmentDetails}  
              options={{
                headerTintColor: "gray",
                headerStyle: {
                  backgroundColor: "#f7f7f7"
                }
              }}
            />
            <Stack.Screen 
              name="Appointment Details Doctor" 
              component={AppointmentDetailsDoctor}  
              options={{
                headerTintColor: "gray",
                headerStyle: {
                  backgroundColor: "#f7f7f7"
                },
                headerTitle: "Appointment Details"
              }}
            />
            <Stack.Screen 
              name="Upload Prescription" 
              component={UploadPrescription}  
              options={{
                headerTintColor: "gray",
                headerStyle: {
                  backgroundColor: "#f7f7f7"
                }
              }}
            />
            <Stack.Screen 
              name="Edit Profile Doctor" 
              component={EditProfileDoctor}  
              options={{
                headerTintColor: "gray",
                headerStyle: {
                  backgroundColor: "#f7f7f7"
                },
                headerTitle: "Edit Profile"
              }}
            />
            <Stack.Screen 
              name="Change Password Doctor" 
              component={ChangePasswordDoctor}  
              options={{
                headerTintColor: "gray",
                headerStyle: {
                  backgroundColor: '#f7f7f7',
                },
                headerTitle: 'Change Password',
              }}
            />
            <Stack.Screen 
              name="Tabbar" 
              component={TabBar}  
              options={{headerShown: false}}
            />
            <Stack.Screen 
              name="Doctor Calling" 
              component={DoctorCalling}  
              options={{headerShown: false}}
            />
            <Stack.Screen 
              name="Calling" 
              component={Call}  
              options={{headerShown: false}}
            />
            <Stack.Screen 
              name="TabbarDoctor" 
              component={TabBarDoctor}  
              options={{headerShown: false}}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </View>
    );
  }
}

