import React, { Component } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Home from '../Home/Home';
import Doctor from '../Doctor/Doctor';
import Settings from '../Settings/Settings';
import Alerts from "../Alerts/Alerts"
import Records from '../Records/Records';
import { Container } from 'native-base';

const Tab = createBottomTabNavigator();

export default class TabBar extends Component {
  state = { isLoading: true }

  async componentDidMount(){
    this.setState({isLoading: false})
  }

  render() {

    if(this.state.isLoading) {
      return <Container/>
    }

      return (
        <Tab.Navigator 
          initialRouteName="Home"
          tabBarOptions={{
            activeTintColor: 'steelblue',
            inactiveTintColor: "silver",
            inactiveBackgroundColor: "#f7f7f7",
            activeBackgroundColor: "#f7f7f7"
          }}
          lazy={true}
        >
          <Tab.Screen name="Home" component={Home} 
            options={{
              tabBarLabel: 'Home',
              tabBarIcon: ({ color, size }) => (
                <MaterialCommunityIcons name="home" color={color} size={size} />
              ),
            }}
          />
          <Tab.Screen name="Records" component={Records} 
            options={{
              tabBarLabel: 'Records',
              tabBarIcon: ({ color, size }) => (
                <MaterialCommunityIcons name="book" color={color} size={size} />
              ),
            }}
          />
          <Tab.Screen name="Doctor" component={Doctor} 
            options={{
              tabBarLabel: 'Doctors',
              tabBarIcon: ({ color, size }) => (
                <MaterialCommunityIcons name="doctor" color={color} size={size} />
              ),
            }}
          />
          <Tab.Screen name="Alerts" component={Alerts} 
            options={{
              tabBarLabel: 'Alerts',
              tabBarIcon: ({ color, size }) => (
                <MaterialCommunityIcons name="bell" color={color} size={size}/>
              ),
            }}
          />
          <Tab.Screen name="Settings" component={Settings} 
            options={{
              tabBarLabel: 'Settings',
              tabBarIcon: ({ color, size }) => (
                <MaterialCommunityIcons name="settings" color={color} size={size} />
              ),
            }}
          />
          
      </Tab.Navigator>
      );
    }
  }