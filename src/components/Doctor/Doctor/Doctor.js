import React, { Component } from "react";
import { View, Text, TextInput, Picker } from "react-native";
import { TouchableOpacity, TouchableHighlight } from "react-native-gesture-handler";
import { responsiveWidth } from "react-native-responsive-dimensions";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import DateTimePicker from '@react-native-community/datetimepicker';
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { List, ListItem, Button } from "native-base";
import { Table, TableWrapper, Row, Rows, Col } from 'react-native-table-component';
import { getFromStorage } from "../../../utils/storage"
import axios from 'axios';
import Api from "../../../Api/Api.json"

export default class Appointment extends Component {
    state = {
        isLoading: true,
        token: "",
        day: "",
        gender: "",
        name: "",
        age: "",
        phone: "",
        isLoggedIn: false,
        mode: "date",
        showDate: false,
        showTime: false,
        showEndTime: false,
        selectDate: "Select Date",
        selectTime: "Select Start Time",
        selectEndTime: "Select End Time",
        date: new Date(),
        time: new Date(),
        endTime: new Date(),
        minDate: new Date(),
        maxDate: new Date(),
        tableHead: ['Start Time', 'End Time'],
        timeArray: [],
        timeTemp: [],
        tableData: [],
        minuteInterval: 30
    };
    handleColor = color => {
        this.setState({ bgColor: color });
    };

    dateTimeChecker = item => {
        if (item.startTime < this.state.endTime && item.endTime > this.state.time) {
          return true;
        }
        return false;
    };

    submitApi = () => {
        
        getFromStorage("doctor")
        .then(res => {
            if(res) {
                const headers = {
                    headers: {"Content-Type": "application/json"}
                }

                const body = {
                    task: "setDocCalendar",
                    doctor_id: res.data[0].id,
                    timeslots: this.state.timeArray
                }
                axios 
                .post(Api.DOCTOR_API, body, headers)
                .then(res => {
                    if(res.data){
                        this.setState({tableData: [], timeArray: [], selectTime: "Select Start Time",
                        selectEndTime: "Select End Time", day: ""})
                        alert("Calender Set Successfully")
                    } else {
                        alert("Something went wrong")
                    }
                })
                .catch(err => alert("Something went wrong"))
            }
        })
        .catch(err => alert("Something went wrong"))
        
    }
    
    submitHandler = () => {
        if(this.state.selectTime !== "Select Start Time" && this.state.selectEndTime !== "Select End Time" && this.state.day !== "") {
            if(new Date(this.state.time).setSeconds(0) === new Date(this.state.endTime).setSeconds(0)) {
                alert("Start time and end time should not be equal")
            } else if(new Date(this.state.time) > new Date(this.state.endTime)) {
                alert("Start Time should be before End Time")
            } else {
                if(parseInt(this.state.selectEndTime.split(":")[0]) > 12 && this.state.selectEndTime.split(" ")[1] === "AM") {
                    alert("End Time should be before 12:00 AM")
                } else {
                    const arr = this.state.timeArray;
                    const arr2 = this.state.timeTemp;

                    if(arr.length === 0) {
                        arr2.push({
                            day: this.state.day,
                            startTime: this.state.time,
                            endTime: this.state.endTime
                        })
                        arr.push({
                            day: this.state.day,
                            startTime: this.state.selectTime,
                            endTime: this.state.selectEndTime
                        })
                        this.setState({
                            timeArray: arr, tableData: arr.map(item => [item.startTime , item.endTime]), 
                            selectDate: "Select Date",
                            selectTime: "Select Start Time",
                            selectEndTime: "Select End Time",
                            date: new Date(),
                            time: new Date(),
                            endTime: new Date(),
                        })
                    } else {
                        if(arr2.find(item => this.dateTimeChecker(item))) {
                            alert("This slot is not available")
                        } else {
                            arr2.push({
                                day: this.state.day,
                                startTime: this.state.time,
                                endTime: this.state.endTime
                            })
                            arr.push({
                                day: this.state.day,
                                startTime: this.state.selectTime,
                                endTime: this.state.selectEndTime
                            })
                            this.setState({
                                timeArray: arr, tableData: arr.map(item => [item.startTime, item.endTime]), 
                                selectDate: "Select Date",
                                selectTime: "Select Start Time",
                                selectEndTime: "Select End Time",
                                date: new Date(),
                                time: new Date(),
                                endTime: new Date(),
                            })
                        }
                    }
                    
                }
            }
        } else {
            alert("All Fields Required")
        }
    
    };

    getCalendar = () => {
        getFromStorage("doctor")
        .then(res => {
            if(res) {
                const headers = {
                    headers: {"Content-Type": "application/json"}
                }
                const body = {
                    task: "getDocCalendar",
                    doctor_id: res.data[0].id,
                }
                axios 
                .post(Api.DOCTOR_API, body, headers)
                .then(res => {
                    if(res.data){
                        this.setState({tableData: [], timeArray: []})
                    } else {
                        alert("Something went wrong")
                    }
                })
                .catch(err => alert("Something went wrong"))
            }
        })
        .catch(err => alert("Something went wrong"))
    }

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
    timeFormatEnd = () => {
      let am_pm = 'AM';
      let hour = parseInt(this.state.endTime.toTimeString().substr(0, 2));
      let minute = this.state.endTime.toTimeString().substr(3,2)
      if(hour>11){
          am_pm = 'PM';
          if(hour>12){
              hour = hour - 12;
          }
      }
      
      if(hour == 0){
          hour = 12;
      }
      const selectEndTime = `${hour}:${minute} ${am_pm}` ;
      this.setState({ selectEndTime })
  }   

    componentDidMount(){
        this.getCalendar()
    }

    render() {
        const { state } = this
        return (
            <KeyboardAwareScrollView
                style={{
                    flex: 1,
                    flexDirection: "column",
                    backgroundColor: "white",
                }}
            >
                <Text style={{alignItems: "center", padding: 20, fontSize: 18, color: "gray", backgroundColor: "#f7f7f7"}}>
                  Set Availability
                </Text>
            
                {
                 this.state.tableData.length > 0 && 
                <View style={{justifyContent: "center"}}>
                    <Table borderStyle={{borderWidth: 1}}>
                        <Row data={state.tableHead} flexArr={[1, 2]} style={styles.head} textStyle={styles.text}/>
                        <TableWrapper style={styles.wrapper}>
                            <Rows data={state.tableData} flexArr={[1,2]} style={styles.row} textStyle={styles.text}/>
                        </TableWrapper>
                    </Table>
                    <TouchableOpacity onPress={this.submitApi} style={{marginTop: 25, alignItems: "center"}}>
                        <Text
                            style={{
                                fontSize: 16,
                                color: "white",
                                backgroundColor: "#4BB543",
                                width: responsiveWidth(90),
                                borderRadius: 2,
                                paddingTop: 5,
                                paddingBottom: 5,
                                textAlign: "center",
                            }}
                        >
                            Confirm
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.setState({tableData: [], timeArray: []})} style={{marginTop: 10, alignItems: "center"}}>
                        <Text
                            style={{
                                fontSize: 16,
                                color: "white",
                                backgroundColor: "red",
                                width: responsiveWidth(90),
                                borderRadius: 2,
                                paddingTop: 5,
                                paddingBottom: 5,
                                textAlign: "center",
                            }}
                        >
                            Clear
                        </Text>
                    </TouchableOpacity>
                </View>
                }
                
                <View style={{alignItems: "center"}}>
                    
                <View>
                    {this.state.showTime &&
                        <DateTimePicker
                            testID="dateTimePicker"
                            timeZoneOffsetInMinutes={0}
                            value={this.state.time}
                            mode={'time'}
                            is24Hour={false}
                            display="spinner"
                            minuteInterval={30}
                            onChange={(e, selectedTime) => {
                                    this.setState({showTime: false})
                                    if(selectedTime) {
                                        this.setState({ time: selectedTime.getMinutes() <= 15 ? new Date(new Date(selectedTime.setSeconds(0)).setMinutes(0)) : selectedTime.getMinutes() <= 30 ? new Date(new Date(selectedTime.setSeconds(0)).setMinutes(30)) : selectedTime.getMinutes() <= 45 ? new Date(new Date(selectedTime.setSeconds(0)).setMinutes(30)) : new Date(new Date(new Date(selectedTime.setSeconds(0)).setMinutes(0)).setHours(selectedTime.getHours() + 1)), showTime: false }, () => { this.setState({selectTime: ""}, () => { this.timeFormat() }) }) 
                                    }
                                    
                                }
                            }
                        />
                    }
                    {this.state.showEndTime &&
                        <DateTimePicker
                            testID="dateTimePicker"
                            timeZoneOffsetInMinutes={0}
                            value={this.state.endTime}
                            mode={'time'}
                            is24Hour={false}
                            minuteInterval={30}
                            display="spinner"
                            onChange={(e, selectEndTime) => { 
                                    this.setState({showEndTime: false})
                                    if(selectEndTime) {
                                        this.setState({ endTime: selectEndTime.getMinutes() <= 15 ? new Date(new Date(selectEndTime.setSeconds(0)).setMinutes(0)) : selectEndTime.getMinutes() <= 30 ? new Date(new Date(selectEndTime.setSeconds(0)).setMinutes(30)) : selectEndTime.getMinutes() <= 45 ? new Date(new Date(selectEndTime.setSeconds(0)).setMinutes(30)) : new Date(new Date(new Date(selectEndTime.setSeconds(0)).setMinutes(0)).setHours(selectEndTime.getHours() + 1)), showEndTime: false }, () => { this.setState({selectEndTime: ""}, () => { this.timeFormatEnd() }) }) 
                                    }
                                }
                            }
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
                        Date<Text style={{color: "red"}}>*</Text>
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
                            style={{
                                height: 40,
                                borderTopColor: "white",
                                borderBottomColor: "silver",
                                borderWidth: 1,
                                backgroundColor: "white",
                                width: responsiveWidth(90),
                                color: this.state.day === "" ? "silver" : "black"
                            }}
                            mode="dropdown"
                            name="day"
                            onValueChange={value => this.setState({ day: value})}
                            selectedValue={this.state.day}
                        >
                            <Picker.Item label="Select Day" value="" />
                            {["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"].map((item, i) => 
                                <Picker.Item label={item} value={item.toLowerCase()} key={item}/>
                            )}
                        </Picker>
                    </View>
                    <Text
                        style={{
                            color: "gray",
                            textAlign: "left",
                            fontSize: 14,
                            marginTop: 20,
                            zIndex: 1
                        }}
                    >
                        Start Time<Text style={{color: "red"}}>*</Text><Text style={{color: "silver", fontSize: 12}}>{"  "}(30 minutes interval)</Text>
                    </Text>
                    <TouchableOpacity
                      onPress={value => this.setState({ showTime: true })}
                    >
                        <Text style={{
                            fontSize: 16,
                            color: this.state.selectTime === "Select Start Time" ? "silver" : "steelblue",
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
                            marginTop: 20,
                            zIndex: 1
                        }}
                    >
                        End Time<Text style={{color: "red"}}>*</Text><Text style={{color: "silver", fontSize: 12}}>{"  "}(30 minutes interval)</Text>
                    </Text>
                    <TouchableOpacity
                      onPress={value => this.setState({ showEndTime: true })}
                    >
                        <Text style={{
                            fontSize: 16,
                            color: this.state.selectEndTime === "Select End Time" ? "silver" : "steelblue",
                            backgroundColor: "white",
                            width: responsiveWidth(90),
                            height: 25,
                            borderRadius: 2,
                            paddingTop: 2,
                            textAlign: "left",
                        }}>
                            <MaterialCommunityIcons name="timer" size={20}/>{"  "}
                            {this.state.selectEndTime}
                        </Text>
                    </TouchableOpacity>
                    
                </View>
                
                <TouchableHighlight onPress={this.submitHandler} style={{marginTop: 25}}>
                    <Text
                        style={{
                            fontSize: 18,
                            color: "white",
                            backgroundColor: "#4BB543",
                            width: responsiveWidth(90),
                            height: 35,
                            borderRadius: 2,
                            paddingTop: 5,
                            textAlign: "center",
                        }}
                    >
                        Add Time
                    </Text>
                </TouchableHighlight>
                </View>
            </KeyboardAwareScrollView>
        );
    }
}
const styles = {
    container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff' },
    head: {  height: 40,  backgroundColor: '#f1f8ff'  },
    wrapper: { flexDirection: 'row' },
    title: { flex: 1, backgroundColor: '#f6f8fa' },
    text: { textAlign: 'center' }
};
