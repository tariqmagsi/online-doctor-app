import React, { Component } from "react";
import { View, Text, TextInput, Picker } from "react-native";
import { TouchableOpacity, TouchableHighlight } from "react-native-gesture-handler";
import { responsiveWidth } from "react-native-responsive-dimensions";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import DateTimePicker from '@react-native-community/datetimepicker';
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default class Appointment extends Component {
    state = {
        isLoading: true,
        token: "",
        gender: "",
        name: "",
        age: "",
        phone: "",
        isLoggedIn: false,
        mode: "date",
        showDate: false,
        showTime: false,
        selectDate: "Select Date",
        selectTime: "Select Time",
        date: new Date(),
        time: new Date(),
        minDate: new Date(),
        maxDate: new Date()
    };
    handleColor = color => {
        this.setState({ bgColor: color });
    };
    
    submitHandler = () => {
        const { name, phone, age, gender } = this.state;
    };

    timeFormat = () => {
        let am_pm = 'AM';
        let hour = parseInt(this.state.time.toTimeString().substr(0, 2));
        let minute = this.state.time.toTimeString().substr(3,2)
        if(hour>11){
            am_pm = 'PM';
            if(hour>12){
                hour = hour - 12;
            }
        }
        
        if(hour == 0){
            hour = 12;
        }
        const selectTime = `${hour}:${minute} ${am_pm}` ;
        this.setState({ selectTime })
    }   

    setDates = () => {
        // var current = new Date(); 
        // var weekstart = current.getDay() === 0 ? current.getDate() - current.getDay() - 6 : current.getDate() - current.getDay() + 1; 
        // startDate = new Date(current.setDate(weekstart));  
        // endDate = new Date();
        // this.setState({ minDate: startDate, maxDate: endDate })
        var currentDate = new Date(); 
        var start = currentDate.getDate() + 6; 
        const startDate = new Date();   
        const endDate = new Date(currentDate.setDate(start)); 
      }
  
    async componentDidMount(){
        this.setDates()

    }

    render() {

        return (
            <KeyboardAwareScrollView
            style={{
                flex: 1,
                flexDirection: "column",
                backgroundColor: "white",
            }}
            >
                <View style={{alignItems: "center"}}>
                    <View style={{backgroundColor: "#f7f7f7", width: responsiveWidth(100)}}>
                        <MaterialCommunityIcons name="doctor" size={60} color="gray" style={{textAlign: "center", marginTop: 20}}/>
                        <Text style={{textAlign: "center", fontSize: 18, color: "gray", fontWeight: "bold", marginBottom: 25}}>Appointment Form</Text>
                    </View>
                <View>
                    {this.state.showDate &&
                        <DateTimePicker
                            testID="dateTimePicker"
                            timeZoneOffsetInMinutes={0}
                            value={this.state.date}
                            mode={'date'}
                            maximumDate={this.state.maxDate}
                            minimumDate={this.state.minDate}
                            is24Hour={false}
                            display="default"
                            onChange={(e, selectedDate) => { this.setState({ date: selectedDate ? selectedDate : this.state.date, showDate: false }, () => { this.setState({selectDate: this.state.date.toString().substr(4, 12)}) }) }}
                        />
                    }
                    {this.state.showTime &&
                        <DateTimePicker
                            testID="dateTimePicker"
                            timeZoneOffsetInMinutes={0}
                            value={this.state.time}
                            mode={'time'}
                            is24Hour={false}
                            display="default"
                            onChange={(e, selectedTime) => { console.log(selectedTime)
                                this.setState({ time: selectedTime ? selectedTime : this.state.time, showTime: false }, () => { this.setState({selectTime: ""}, () => { this.timeFormat() }) }) }}
                        />
                    }
                    <Text
                        style={{
                            color: "gray",
                            textAlign: "left",
                            fontSize: 14,
                            marginTop: 20,
                            zIndex: 1
                        }}
                    >
                        Date
                    </Text>
                    <TouchableOpacity
                        onPress={value => this.setState({ showDate: true })}
                    >
                        <Text style={{
                            fontSize: 16,
                            color: this.state.selectDate === "Select Date" ? "silver" : "steelblue",
                            backgroundColor: "white",
                            width: responsiveWidth(90),
                            height: 25,
                            borderRadius: 2,
                            paddingTop: 2,
                            textAlign: "left",
                        }}>
                            <MaterialCommunityIcons name="calendar" size={20}/>{"  "}
                            {this.state.selectDate}
                        </Text>
                    </TouchableOpacity>
                    <Text
                        style={{
                            color: "gray",
                            textAlign: "left",
                            fontSize: 14,
                            marginTop: 20,
                            zIndex: 1
                        }}
                    >
                        Time
                    </Text>
                    <TouchableOpacity
                    onPress={value => this.setState({ showTime: true })}
                    >
                        <Text style={{
                            fontSize: 16,
                            color: this.state.selectTime === "Select Time" ? "silver" : "steelblue",
                            backgroundColor: "white",
                            width: responsiveWidth(90),
                            height: 25,
                            borderRadius: 2,
                            paddingTop: 2,
                            textAlign: "left",
                        }}>
                            <MaterialCommunityIcons name="timer" size={20}/>{"  "}
                            {this.state.selectTime}
                        </Text>
                    </TouchableOpacity>
                    <Text
                        style={{
                            color: "gray",
                            textAlign: "left",
                            fontSize: 14,
                            marginBottom: -6,
                            marginTop: 20,
                            zIndex: 1
                        }}
                    >
                        Name
                    </Text>
                    <TextInput
                        placeholder="Name"
                        style={{
                            height: 40,
                            borderTopColor: "white",
                            borderBottomColor: "silver",
                            borderLeftColor: "white",
                            borderRightColor: "white",
                            borderWidth: 1,
                            backgroundColor: "white",
                            width: responsiveWidth(90)
                        }}
                        name="name"
                        onChangeText={value => this.setState({ name: value })}
                        value={this.state.name}
                    />
                    <Text
                        style={{
                            color: "gray",
                            textAlign: "left",
                            fontSize: 14,
                            marginBottom: -6,
                            zIndex: 1,
                            marginTop: 20
                        }}
                    >
                        Age
                    </Text>
                    <TextInput
                        placeholder="Age"
                        keyboardType="numeric"
                        style={{
                            height: 40,
                            borderTopColor: "white",
                            borderBottomColor: "silver",
                            borderLeftColor: "white",
                            borderRightColor: "white",
                            borderWidth: 1,
                            backgroundColor: "white",
                            width: responsiveWidth(90)
                        }}
                        name="age"
                        onChangeText={value => this.setState({ age: value })}
                        value={this.state.age}
                    />
                    <Text
                        style={{
                            color: "gray",
                            textAlign: "left",
                            fontSize: 14,
                            marginBottom: -6,
                            zIndex: 1,
                            marginTop: 20,
                        }}
                    >
                        Gender
                    </Text>
                    <View style={{
                            borderTopColor: "white",
                            borderLeftColor: "white",
                            borderRightColor: "white",
                            borderBottomColor: "silver",
                            borderWidth: 1,
                            backgroundColor: "white",
                            borderRadius: 4
                        }}
                    >
                        <Picker
                            placeholder="Gender"
                            style={{
                                height: 40,
                                borderTopColor: "white",
                                borderBottomColor: "silver",
                                borderWidth: 1,
                                backgroundColor: "white",
                                width: responsiveWidth(90),
                                color: this.state.gender === "" ? "silver" : "black"
                            }}
                            mode="dropdown"
                            name="gender"
                            onValueChange={value => this.setState({ gender: value })}
                            selectedValue={this.state.gender}
                        >
                            <Picker.Item label="None" value="" />
                            <Picker.Item label="Male" value="male" />
                            <Picker.Item label="Female" value="female" />
                        </Picker>
                    </View>
                    <Text
                        style={{
                            color: "gray",
                            textAlign: "left",
                            fontSize: 14,
                            marginBottom: -6,
                            zIndex: 1,
                            marginTop: 20
                        }}
                    >
                        Phone Number
                    </Text>
                    <TextInput
                        placeholder="Phone Number"
                        keyboardType="phone-pad"
                        style={{
                            height: 40,
                            borderTopColor: "white",
                            borderBottomColor: "silver",
                            borderLeftColor: "white",
                            borderRightColor: "white",
                            borderWidth: 1,
                            backgroundColor: "white",
                            width: responsiveWidth(90)
                        }}
                        name="phone"
                        onChangeText={value => this.setState({ phone: value })}
                        value={this.state.phone}
                    />
                </View>
                <TouchableHighlight onPress={this.submitHandler} style={{marginBottom: 25, marginTop: 25}}>
                    <Text
                        style={{
                            fontSize: 20,
                            color: "white",
                            backgroundColor: "#4BB543",
                            width: responsiveWidth(90),
                            height: 40,
                            borderRadius: 2,
                            paddingTop: 5,
                            textAlign: "center",
                        }}
                    >
                        Submit
                    </Text>
                </TouchableHighlight>
                </View>
            </KeyboardAwareScrollView>
        );
    }
}

