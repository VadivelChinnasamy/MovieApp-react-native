import React, { Component } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  FlatList,
  Image,
  RefreshControl,
  StatusBar,
  TouchableOpacity,
  Button
} from "react-native";
import styles from "../Styles/Common";
import axios from "axios";
import config from "../Constant/Config";
import { NavigationActions } from "react-navigation";
export const menu_icon = require("../assets/ic_menu.png");
class PopularMovies extends Component {
  constructor(props) {
    super(props);
    (this.page = 1),
      (this.state = {
        isLoading: true,
        response: []
      });
  }

  componentDidMount() {
    this.getPopularMovieLst(1);
    StatusBar.setHidden(false);
  }

  handleLoadMore = () => {
    console.log("Refresh Loadmore");
    if (!this.state.isLoading) {
      this.page = this.page + 1;
      this.getPopularMovieLst(this.page);
    }
  };
  onRefresh = () => {
    if (!this.state.isLoading) {
      this.page = 1;
      this.getPopularMovieLst(this.page);
    }
  };

  getPopularMovieLst(page) {
    axios.get(config.movies.popular + "&page=" + page).then(res => {
      let listdata = this.state.response;
      let data = listdata.concat(res.data.results);
      this.setState({
        isLoading: false,
        response: data
      });
    });
  }
  onClickEvent(item) {
    this.props.navigation.navigate("MovieDetail", {
      itemId: item.id,
      movieName: item.title,
      type: NavigationActions.RESET
    });
  }
  //https://reactnavigation.org/docs/en/navigation-prop.html#replace//
  //   this.props.navigation.navigate('MovieDetail', {
  //     itemId: 86,
  //     otherParam: 'anything you want here',
  //   });
  render() {
    if (this.state.isLoading) {
      return (
        <View style={styles.activityIndicator}>
          <ActivityIndicator />
        </View>
      );
    }

    return (
      <View style={styles.container}>
        <StatusBar hidden={true} />

        <View style={styles.headerContainer}>
          <TouchableOpacity
            style={styles.headerIconView}
            onPress={() => this.props.navigation.openDrawer()}
          >
            <Image source={menu_icon} style={styles.icon} />
          </TouchableOpacity>
          <View style={styles.headerTitle}>
            <Text style={styles.text}>Title </Text>
          </View>
        </View>
        <View style={styleView.container}>
          <FlatList
            data={this.state.response}
            refreshControl={
              <RefreshControl
                refreshing={this.state.isLoading}
                onRefresh={this.onRefresh.bind(this)}
              />
            }
            renderItem={({ item }) => (
              <View
                style={styles.itemRow}
                onPress={() => this.onClickEvent(item)}
              >
                <View style={styles.itemRowImg}>
                  <TouchableOpacity onPress={() => this.onClickEvent(item)}>
                    <Image
                      source={{
                        uri: config.movies.imageBaseUrl + item.backdrop_path
                      }}
                      style={styles.movie_img}
                    />
                  </TouchableOpacity>
                </View>
                <View style={styles.itemRowContent}>
                  <Text style={styles.movieTitle}>{item.title}</Text>
                  <Text
                    numberOfLines={1}
                    ellipsizeMode="middle"
                    style={styles.short_desc}
                  >
                    {item.overview}
                  </Text>

                  <Text style={styleView.releaseDate}>
                    Release Date: {item.release_date}
                  </Text>
                </View>
              </View>
            )}
            onEndReachedThreshold={0.4}
            onEndReached={this.handleLoadMore.bind(this)}
          />
        </View>
      </View>
    );
  }
}

export default PopularMovies;

const styleView = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    marginBottom: 5
  },
  dateRatingView: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  releaseDate: {
    color: "#01579b"
  }
});

// onPress={() => this.props.navigation.navigate("Details")}
// onPress={() => this.props.navigation.setParams({otherParam: 'Updated!'})}
