import React, { Component } from 'react';
import {
  WebView
} from 'react-native-webview';
import { Platform} from 'react-native';
import * as Permissions from "expo-permissions";
import { getIPv4Address } from '../../ip/ip';
import { Container } from 'native-base';
import Loader from '../../Loader/Loader';
import { getFromStorage } from '../../../utils/storage';

export default class Call extends Component {
  state = {isLoading: true, id: ""}
  requestCameraPermission = async () => {
    try {
      Permissions.askAsync(Permissions.CAMERA, Permissions.AUDIO_RECORDING).then(
        ({ status }) => {
          if (status === "granted") {
              console.log("Permission Granted")
          }
        }
      );
    } catch (err) {
      console.warn(err);
    }
  };


  componentDidMount(){
    this.requestCameraPermission();
    getFromStorage("patient")
    .then(res => {
      if(res) {
        this.setState({id: res.data[0].di_id, isLoading: false})
      } else {
        this.setState({isLoading: false})
        alert("Something went wrong")
      }
    })
    .catch(err => {
      alert("Something went wrong")
      this.setState({isLoading: false})
    })
    
  }
  render() {
    if(this.state.isLoading) {
      return (
            <Container style={{flex: 1, flexDirection: "row", alignItems: "center", justifyContent: "center"}}>
                <Loader width={200} height={200}/>
            </Container>)
    }
    return (
      <WebView
        source={{
          uri: `https://twilio.semionmed.com/`
        }}
        ref={webView => (this.webView = webView)}
        onLoadEnd={event => {
          const data = {
            appointment_id: this.props.route.params.appointment_id.toString(),
            id: this.state.id
          }
          const clientResponseCode = `
            window.postMessage(${JSON.stringify(data)}, "*");
            true;
          `;
          if (this.webView) {
            this.webView.injectJavaScript(clientResponseCode);
          }
        }}
      />
    );
  }
}