import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  AsyncStorage
} from "react-native";
import Button from "./Button";
import * as Expo from "expo";
import Forecast from "./Forecast";
import LocationButton from "./LocationButton";
import textStyles from "./styles/typography.js";

const STORAGE_KEY = "@SmarterWeather:zip";

import OpenWeatherMap from "./open_weather_map";

// This version uses flowers.png from local assets
//import PhotoBackdrop from "./PhotoBackdrop/local_image";

// This version pulls a specified photo from the camera roll
 import PhotoBackdrop from './PhotoBackdrop/local_image';

class WeatherProject extends Component {
  constructor(props) {
    super(props);
    this.state={forcast: null, clock:" "}
    this.state = { forecast: null,curTime:0,imageArray:[require('./images/1.jpg'),require('./images/2.jpg'),require('./images/3.jpg'),require('./images/4.jpg'),require('./images/5.jpg')],curIndex:0 };
  }
  // imageArray:require{"PhotoBackgroup/flowers.png)"}
  /*incrementTime = () => {
    var newIndex = this.state.curIndex+1;

    if(newIndex>=this.state.imageArray.length)
      newIndex=0;
    this.setState({curIndex:new Date().getHours});
  } */   
  checkMultiPermissions = async() => {
    const { Permissions, FileSystem } = Expo;
    console.log(FileSystem.documentDirectory);
    let { status, expires, permissions } = await Permissions.getAsync(Permissions.CAMERA_ROLL)
    if (status !== 'granted') {
      console.log('Hey! You heve not enabled selected permissions');
      const { newStatus, expires, permissions } = await Permissions.askAsync(Permissions.CAMERA_ROLL)
      status = newStatus;
    }
    if(status === 'granted') {
        console.log("Granted!");
        let result = await Expo.ImagePicker.launchImageLibraryAsync({
          allowsEditing: true,
        })

        console.log(result);
          if (!result.cancelled) {
            console.log(this);
            console.log("Accepted!");
            this.setState({ newPostImage:result.uri, createPostModalVisible: true })
            FileSystem.copyAsync({from:result.uri,to:FileSystem.documentDirectory+"myimage.jpg"})
            .then(() => console.log("Moved to location"));
            try {
              await AsyncStorage.setItem('@MySuperStore:key', result.uri)
              .then(() => console.log("Saved selection to disk: " + result.uri))
              .catch(error => console.error("AsyncStorage error: " + error.message))
              .done();
              console.log("saved");
              this._retrieveData();
            } catch (error) {
              // Error saving data
            }
          }
      }
      
  }      
  _retrieveData = async () => {
      console.log("Retrieving Data");
        try {
          const value = await AsyncStorage.getItem('@MySuperStore:key');
          if (value !== null) {
            // We have data!!
            console.log("Got data");
            console.log(value);
            this.setState({ newPostImage:value, createPostModalVisible: true })
          } else {
            console.log("No data");
          }
        } catch (error) {
          console.log(error);
          // Error retrieving data
        }
      }
//
retrieveData=async ()=>{
}

updateClock = ()=>{
  let time =(new Date()).toLocaleTimeString();
this.setState ({clock: time})
}
  componentDidMount() {
    this.updateClock();
    setInterval (this.updateClock, 1000);
    AsyncStorage
      .getItem(STORAGE_KEY)
      .then(value => {
        if (value !== null) {
          this._getForecastForZip(value);
        }
      })
      .catch(error => console.error("AsyncStorage error: " + error.message))
      .done();
      this._retrieveData();
//      setInterval(this.incrementTime,1000);
  }

  _getForecastForZip = zip => {
    // Store zip code
    AsyncStorage
      .setItem(STORAGE_KEY, zip)
      .then(() => console.log("Saved selection to disk: " + zip))
      .catch(error => console.error("AsyncStorage error: " + error.message))
      .done();

    OpenWeatherMap.fetchZipForecast(zip).then(forecast => {
      this.setState({ forecast: forecast });
    });
  };

  _getForecastForCoords = (lat, lon) => {
    OpenWeatherMap.fetchLatLonForecast(lat, lon)
      .then(forecast => {
        this.setState({ forecast: forecast });
    });
  };

  _handleTextChange = event => {
    let zip = event.nativeEvent.text;
    this._getForecastForZip(zip);
  };

  render() {
    let content = null;
    //console.log("Rendered" + this.state.newPostImage);
    if (this.state.forecast !== null) {
      content = (
        <View style={styles.row}>
          <Forecast
            main={this.state.forecast.main}
            temp={this.state.forecast.temp}
          />
        </View>
      );
    }

    return (
      <PhotoBackdrop image={this.state.image} >
        <View style={styles.overlay}>
          <View style={styles.row}>
            <Text style={textStyles.mainText}>{this.state.clock}</Text>
          </View>
          <View style={styles.row}>
            <LocationButton onGetCoords={this._getForecastForCoords} />
          </View>
          <View style={styles.row}>
            <Button onPress={this.checkMultiPermissions} label="Choose Image"></Button>
          </View>
          {content}
        </View>
      </PhotoBackdrop>
    );
  }
}

const styles = StyleSheet.create({
  overlay: { backgroundColor: "rgba(0,0,0,0.1)" },
  row: {
    flexDirection: "row",
    flexWrap: "nowrap",
    alignItems: "center",
    justifyContent: "center",
    padding: 24
  },
  zipContainer: {
    borderBottomColor: "#DDDDDD",
    borderBottomWidth: 1,
    marginLeft: 5,
    marginTop: 3,
    width: 80,
    height: textStyles.baseFontSize * 2,
    justifyContent: "flex-end"
  },
  zipCode: { flex: 1 }
});

export default WeatherProject;
