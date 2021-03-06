import React, { Component } from "react";

import { ImageBackground } from "react-native";

import styles from "./style.js";

class PhotoBackdrop extends Component {
  state = {image:this.props.image, index:0};
  componentDidMount() {
    setInterval(this.pass,5000);
  }
  pass=()=>{
    console.log("MNHT");
    this.setState({index:(this.state.index+1) % 5})
  }
  render() {
    // console.log(this.props.image)
    if(this.props.image == undefined)
      this.state.image = [
        require('../images/1.jpg'),
      require('../images/2.jpg'),
      require('../images/3.jpg'),
      require('../images/4.jpg'),
      require('../images/5.jpg')];

    else
      this.state.image = {uri:this.props.image};
    return (
      <ImageBackground
        style={styles.backdrop}
        source={this.state.image[this.state.index ]}
        resizeMode="cover"
      >
        {this.props.children}
      </ImageBackground>
    );
  }
}

export default PhotoBackdrop;
