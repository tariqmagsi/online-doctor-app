import React, { Component } from "react";
import { View, Text, TextInput, Picker } from "react-native";
import { TouchableOpacity, TouchableHighlight } from "react-native-gesture-handler";
import { responsiveWidth } from "react-native-responsive-dimensions";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import DateTimePicker from '@react-native-community/datetimepicker';
import { MaterialCommunityIcons } from "@expo/vector-icons";
import axios from 'axios';
import Api from "../../../Api/Api.json";
import { getFromStorage } from "../../../utils/storage";
import { Container } from "native-base";
import Loader from "../../Loader/Loader";
import moment from 'moment';

export default class Appointment extends Component {
    state = {
        times: ["00:30", "01:00", "01:30", "02:00", "02:30", "03:00", "03:30", "04:00", "04:30", "05:00", "05:30", "06:00", "06:30", "07:00", "07:30", "08:00", "08:30", "09:00", "09:30", "10:00", "10:30", "11:00", "11:30", "12:00", "00:30", "01:00", "01:30", "02:00", "02:30", "03:00", "03:30", "04:00", "04:30", "05:00", "05:30", "06:00", "06:30", "07:00", "07:30", "08:00", "08:30", "09:00", "09:30", "10:00", "10:30", "11:00", "11:30", "12:00", "00:30", "01:00", "01:30", "02:00", "02:30", "03:00", "03:30", "04:00", "04:30", "05:00", "05:30", "06:00", "06:30", "07:00", "07:30", "08:00", "08:30", "09:00", "09:30", "10:00", "10:30", "11:00", "11:30", "12:00", "00:30", "01:00", "01:30", "02:00", "02:30", "03:00", "03:30", "04:00", "04:30", "05:00", "05:30", "06:00", "06:30", "07:00", "07:30", "08:00", "08:30", "09:00", "09:30", "10:00", "10:30", "11:00", "11:30", "12:00"],
        dates: [],
        isLoading: true,
        isLoggedIn: false,
        isSubmitting: false,
        isSubmit: false,
        arrays: [],
        day: "",
        time: "",
        doctorCalendar: [],
        showDate: false,
        date: new Date(),
        minDate: new Date(),
        maxDate: new Date(),
        array: [],
        selectDate: "Select Date"
    };
    handleColor = color => {
        this.setState({ bgColor: color });
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

    checkAvailability = (data) => {
        if(item) {
            return true;
        }
        return false;
    }

    nextWeek = () => {
        var dates = [];
        var start = moment(this.state.minDate).add(1, 'week');
        var end = moment(this.state.maxDate).add(1, 'week');

        this.setState({minDate: new Date(start), maxDate: new Date(end),  selectDate: `${start.format("DD/MM/YYYY")} - ${end.format("DD/MM/YYYY")}` }, () => {
            this.getDoctorCalendar()
        })
        dates.push(start.format('YYYY-MM-DD'));          
        while(!start.isSame(end.format('YYYY-MM-DD'))){
            start = start.add(1, 'days');
            dates.push(start.format('YYYY-MM-DD'));
        }
        this.setState({ dates: dates.filter(item => new Date(item) >= new Date()), time: "", day: ""})
    }

    setDates = () => {
        var dates = [];
        var startDate = moment().startOf('week')
        var endDate = moment().endOf('week')
        
        this.setState({ 
            minDate: new Date(startDate), 
            maxDate: new Date(endDate), 
            selectDate: `${startDate.format("DD/MM/YYYY")} - ${endDate.format("DD/MM/YYYY")}` 
        }, () => {
            this.getDoctorCalendar();
        })

        dates.push(startDate.format('YYYY-MM-DD'));          
        while(!startDate.isSame(endDate.format('YYYY-MM-DD'))){
            startDate = startDate.add(1, 'days');
            dates.push(startDate.format('YYYY-MM-DD'));
        }
        this.setState({ dates: dates.filter(item => new Date(item) >= new Date()), time: "", day: "" })
    }

    previousWeek = () => {
        var dates = [];
        var start = moment(this.state.minDate).subtract(1, 'week');
        var end = moment(this.state.maxDate).subtract(1, 'week');

        this.setState({minDate: new Date(start), maxDate: new Date(end),  selectDate: `${start.format("DD/MM/YYYY")} - ${end.format("DD/MM/YYYY")}` }, () => {
            this.getDoctorCalendar();
        })
        dates.push(start.format('YYYY-MM-DD'));          
        while(!start.isSame(end.format('YYYY-MM-DD'))){
            start = start.add(1, 'days');
            dates.push(start.format('YYYY-MM-DD'));
        }
        this.setState({ dates:  dates.filter(item => new Date(item) >= new Date()), time: "", day: ""})
    }

    getDoctorCalendar = () => {
        const headers = {
            headers: {"Content-Type": "application/json"}
        }
        const body = {
            task: "getDocCalendar",
            doctor_id: this.props.route.params.id,
            start_date: moment(this.state.minDate).format("YYYY-MM-DD 12:00:00")
        }
        axios 
        .post(Api.PATIENT_API, body, headers)
        .then(res => {
            if(res.data[0]){
                this.setState({doctorCalendar: res.data}, () => {

                    let arr1 = [], arr2 = [], arr3 = [], arr4 = [], arr5 = [], arr6 = [], arr7 = [];
                    res.data[0][0].forEach((item, i) => {
                        if(parseInt(item) === 0) 
                            arr1.push(this.state.times[i] + `${" AM"}`) 
                    })
                    res.data[0][1].forEach((item, i) => {
                        if(parseInt(item) === 0) 
                            arr1.push(this.state.times[i] + `${" PM"}`) 
                    })
                    res.data[1][0].forEach((item, i) => {
                        if(parseInt(item) === 0) 
                            arr2.push(this.state.times[i] + `${" AM"}`) 
                    })
                    res.data[1][1].forEach((item, i) => {
                        if(parseInt(item) === 0) 
                            arr2.push(this.state.times[i] + `${" PM"}`) 
                    })
                    
                    res.data[2][0].forEach((item, i) => {
                        if(parseInt(item) === 0) 
                            arr3.push(this.state.times[i] + `${" AM"}`) 
                    })
                    res.data[2][1].forEach((item, i) => {
                        if(parseInt(item) === 0) 
                            arr3.push(this.state.times[i] + `${" PM"}`) 
                    })
                    res.data[3][0].forEach((item, i) => {
                        if(parseInt(item) === 0) 
                            arr4.push(this.state.times[i] + `${" AM"}`) 
                    })
                    res.data[3][1].forEach((item, i) => {
                        if(parseInt(item) === 0) 
                            arr4.push(this.state.times[i] + `${" PM"}`) 
                    })

                    res.data[4][0].forEach((item, i) => {
                        if(parseInt(item) === 0) 
                            arr5.push(this.state.times[i] + `${" AM"}`) 
                    })
                    res.data[4][1].forEach((item, i) => {
                        if(parseInt(item) === 0) 
                            arr5.push(this.state.times[i] + `${" PM"}`) 
                    })
                    res.data[5][0].forEach((item, i) => {
                        if(parseInt(item) === 0) 
                            arr6.push(this.state.times[i] + `${" AM"}`) 
                    })
                    res.data[5][1].forEach((item, i) => {
                        if(parseInt(item) === 0) 
                            arr6.push(this.state.times[i] + `${" PM"}`) 
                    })

                    res.data[6][0].forEach((item, i) => {
                        if(parseInt(item) === 0) 
                            arr7.push(this.state.times[i] + `${" AM"}`) 
                    })
                    res.data[6][1].forEach((item, i) => {
                        if(parseInt(item) === 0) 
                            arr7.push(this.state.times[i] + `${" PM"}`) 
                    })
                    this.setState({arrays: [
                        arr1,
                        arr2,
                        arr3,
                        arr4,
                        arr5,
                        arr6,
                        arr7
                    ]})
                    this.setState({ isLoading: false})
                })
            } else {
                this.setState({isLoading: false})
                alert("Something went wrong")
            }
        })
        .catch(err => {
            this.setState({isLoading: false})
            alert("Something went wrong")
        })
    }

    setAppointment = () => {
        this.setState({ isSubmitting: true}, () => {
            if(this.state.day !== "" && this.state.time !== "") {
                getFromStorage("patient")
                .then(res => {
                    if(res) {
                        const headers = {
                            headers: {"Content-Type": "application/json"}
                        }
                        const body = {
                            task: "createAppointment",
                            doctor_id: this.props.route.params.id,
                            patient_id: res.data[0].di_id,
                            time_slot: moment(this.state.day.split("$")[0]).format("YYYYMMDD") + moment(this.state.time, ["h:mm A"]).format("HHmm") + "00"
                        }
                        axios 
                        .post(Api.PATIENT_API, body, headers)
                        .then(res => {
                            if(res.data === 200){
                                alert("Appointment set successfully")
                                this.setDates()
                            } else {
                                alert("Something went wrong")
                            }
                            this.setState({isSubmitting: false})
                        })
                        .catch(err => {
                            this.setState({isSubmitting: false})
                            alert("Something went wrong")
                        })
                    }
                })
                .catch(err => alert("Something went wrong"))
            } else {
                alert("All Fields Required")
                this.setState({isSubmitting: false})
            }
        })
    }
  
    componentDidMount(){
        this.setState({isLoading: false})
        this.setDates()
    }

    render() {
        if(this.state.isLoading) {
            return (
                  <Container style={{flex: 1, flexDirection: "row", alignItems: "center", justifyContent: "center"}}>
                      <Loader width={200} height={200}/>
                  </Container>)
        }
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
                        Weekly Date Range<Text style={{color: "red"}}>*</Text>
                    </Text>
                    <TouchableOpacity>
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
                            <MaterialCommunityIcons name="timer" size={20}/>{"  "}
                            {this.state.selectDate}
                        </Text>
                    </TouchableOpacity>
                        <Text style={{backgroundColor: "silver", padding: 5, borderRadius: 50, width: 30, marginTop: 10}} onPress={this.previousWeek}><MaterialCommunityIcons name="arrow-left" size={20}/></Text>
                        <Text style={{backgroundColor: "silver", padding: 5, borderRadius: 50, width: 30, marginTop: -30, marginLeft: 60,}} onPress={this.nextWeek}><MaterialCommunityIcons name="arrow-right" size={20}/></Text>
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
                            onValueChange={value => this.setState({ day: value, time: "" })}
                            selectedValue={this.state.day}
                        >
                            <Picker.Item label="Select Date" value="" />
                            {this.state.dates.map((item, i) => 
                                <Picker.Item label={item} value={item + "$" + i} key={item}/>
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
                        Time<Text style={{color: "red"}}>*</Text>
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
                                color: this.state.time === "" ? "silver" : "black"
                            }}
                            mode="dropdown"
                            name="day"
                            onValueChange={value => this.setState({ time: value })}
                            selectedValue={this.state.time}
                        >
                            <Picker.Item label="Select Time" value="" />
                            {parseInt(this.state.day.split("$")[1]) === 0 ?
                            this.state.arrays[0].map((item, i) => 
                               <Picker.Item label={item} value={item} key={item}/>
                            ) : parseInt(this.state.day.split("$")[1]) === 1 ?
                            this.state.arrays[1].map((item, i) => 
                                <Picker.Item label={item} value={item} key={item}/>
                            ) : parseInt(this.state.day.split("$")[1]) === 2 ?
                            this.state.arrays[2].map((item, i) => 
                                <Picker.Item label={item} value={item} key={item}/>
                            ) : parseInt(this.state.day.split("$")[1]) === 3 ?
                            this.state.arrays[3].map((item, i) => 
                                <Picker.Item label={item} value={item} key={item}/>
                            ) : parseInt(this.state.day.split("$")[1]) === 4 ?
                            this.state.arrays[4].map((item, i) => 
                                <Picker.Item label={item} value={item} key={item}/>
                            ) : parseInt(this.state.day.split("$")[1]) === 5 ? 
                            this.state.arrays[5].map((item, i) => 
                                <Picker.Item label={item} value={item} key={item}/>
                            ) : parseInt(this.state.day.split("$")[1]) === 6 && 
                            this.state.arrays[6].map((item, i) => 
                                <Picker.Item label={item} value={item} key={item}/>
                            )}
                             
                        </Picker>
                    </View>
                </View>
                <TouchableHighlight onPress={this.setAppointment} style={{marginBottom: 25, marginTop: 25}} disabled={this.state.isSubmitting}>
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
                        {!this.state.isSubmitting ? "Submit" : "Loading..."}
                    </Text>
                </TouchableHighlight>
                </View>
            </KeyboardAwareScrollView>
        );
    }
}

