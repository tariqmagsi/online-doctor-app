import React from 'react';
import LottieView from "lottie-react-native";

export default class Loader extends React.Component {

  componentDidMount() {
    this.animation.play();
  }

  render() {
    return (
        <LottieView
          ref={animation => {
            this.animation = animation;
          }}
          style={{
            width: this.props.width,
            height: this.props.height,
            backgroundColor: 'white'
          }}
          autoPlay
          loop
          source={require('../../utils/loader.json')}
        />
    );
  }
}
