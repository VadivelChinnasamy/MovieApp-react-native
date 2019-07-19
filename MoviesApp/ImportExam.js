import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  Linking,
  AsyncStorage,
  ActivityIndicator,
  View
} from "react-native";
import axios from "axios";
import ConfigFile from "./Config/Config.js";
class App extends Component {
  constructor(props) {
    super(props);
    this.state = { isLoading: true, response: [] };
  }

  _storeData = async () => {
    try {
      await AsyncStorage.setItem("@MySuperStore:key", "I like to save it.");
    } catch (error) {
      // Error saving data
    }
  };

  _retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem("TASKS");
      if (value !== null) {
        // We have data!!
        console.log("#######" + value);
      }
    } catch (error) {
      // Error retrieving data
    }
  };
  componentDidMount = () => {
    Linking.getInitialURL()
      .then(url => {
        if (url) {
          console.log("Initial url is: " + url);
        }
      })
      .catch(err => console.error("An error occurred", err));

    axios
      .get(
        "https://api.themoviedb.org/3/movie/550?api_key=824e6813a740068e24a630f5083b0811",
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
          }
        }
      )
      .then(res => {
        console.log(res);
        this.setState({ isLoading: false });
        console.log(res.data);
        this.setState({ response: res.data.production_companies });
      });
  };

  render() {
    var SampleNameArray = [
      "Pankaj",
      "Rita",
      "Mohan",
      "Amit",
      "Babulal",
      "Sakshi"
    ];

    if (this.state.isLoading) {
      return (
        <View style={{ flex: 1, padding: 20 }}>
          <ActivityIndicator />
        </View>
      );
    }

    return (
      <View>
        <View>
          <Text>Test Moview API</Text>
          <Text> {this._storeData}</Text>
          <Text>{this._retrieveData}</Text>
          {this.state.response.map((item, key) => (
            <Text key={key}>
              Production CompanyName :{key} {item.name}
            </Text>
          ))}
        </View>
      </View>
    );
  }
}
export default App;
/*
         // {SampleNameArray.map((item, key) => (
            <Text />
          ))}
          */
