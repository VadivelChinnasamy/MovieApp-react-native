import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import React, { Component } from "react";
export const menu_icon = require("../assets/ic_menu.png");

class HeaderView extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.container}>
          <View style={styles.headerIconView}>
            <Image source={menu_icon} style={styles.icon} />
          </View>
          <View style={styles.headerTitle}>
            <Text style={styles.text}>Title</Text>
          </View>
        </View>
      </View>
    );
  }
}

export default HeaderView;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    height: 60,
    marginBottom: 5,
    backgroundColor: "#1593e7"
  },
  title: {
    flex: 1,
    alignItems: "flex-start",
    justifyContent: "center"
  },
  text: {
    fontSize: 18
  },
  icon: {
    width: 20,
    height: 20
  },
  iconView: {
    alignItems: "flex-start",
    padding: 10,

    justifyContent: "center"
  }
});
