import React, { Component } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  FlatList,
  ImageBackground,
  Image,
  TextInput,
  Button,
  Dimensions,
  TouchableOpacity
} from "react-native";
import styles from "../Styles/Common";
import axios from "axios";
import config from "../Constant/Config";
const { width } = Dimensions.get("window");
export const menu_icon = require("../assets/ic_menu.png");
class PopularMovies extends Component {
  constructor(props) {
    super(props);
    (this.page = 1),
      (this.state = {
        isLoading: false,
        response: [],
        searchText: ""
      });
  }

  // componentDidMount() {
  //   this.getTrendingLst();
  // }

  onChange(text) {
    this.setState({ searchText: text });
    if (this.state.searchText.length == 1) {
      this.setState({ response: [] });
    }

    //this.setState({ searchText: text });
  }

  onClickEvent(item) {
    this.props.navigation.navigate("MovieDetail", {
      itemId: item.id,
      movieName: item.title
    });
  }

  getTrendingLst = () => {
    axios
      .get(
        config.movies.search +
          "&query=" +
          this.state.searchText +
          "&include_adult=true"
      )
      .then(res => {
        let listdata = this.state.response;
        let data = listdata.concat(res.data.results);
        this.setState({
          isLoading: false,
          response: data
        });
      });
  };

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
        <View style={styles.headerContainer}>
          <TouchableOpacity
            style={styles.headerIconView}
            onPress={() => this.props.navigation.openDrawer()}
          >
            <Image source={menu_icon} style={styles.icon} />
          </TouchableOpacity>
          <View style={styles.headerTitle}>
            <Text style={styles.text}>Search Movies </Text>
          </View>
        </View>
        <View style={pageStyle.container}>
          <View style={pageStyle.searchView}>
            <TextInput
              style={pageStyle.input}
              numberOfLines={1}
              onChangeText={searchText => this.onChange(searchText)}
              placeholder="Search by Keyword"
            />
            <Button
              style={pageStyle.buttonView}
              title="Search"
              onPress={this.getTrendingLst}
            >
              <Text>Search</Text>
            </Button>
          </View>

          {this.state.response.length == 0 ? (
            <View style={pageStyle.noResult}>
              <Text style={pageStyle.noResultLable}>No result found</Text>
            </View>
          ) : null}

          <FlatList
            data={this.state.response}
            renderItem={({ item }) => (
              <View style={pageStyle.itemInRow}>
                <TouchableOpacity onPress={() => this.onClickEvent(item)}>
                  <ImageBackground
                    resizeMode="cover"
                    source={{
                      uri: config.movies.imagew500 + item.poster_path
                    }}
                    style={pageStyle.movie_img}
                  >
                    <View style={pageStyle.ratingView}>
                      <Text style={pageStyle.rating} numberOfLines={1}>
                        Rating: {item.vote_average}/10
                      </Text>
                    </View>
                  </ImageBackground>
                </TouchableOpacity>
                <View style={pageStyle.itemRowContent}>
                  <Text style={pageStyle.title}>{item.original_title}</Text>
                  <Text
                    numberOfLines={10}
                    style={[pageStyle.desc, styles.short_desc]}
                  >
                    {item.overview}
                  </Text>
                </View>
                <View style={pageStyle.divider} />
              </View>
            )}
            onEndReachedThreshold={0.4}
          />
        </View>
      </View>
    );
  }
}

export default PopularMovies;

const pageStyle = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    alignContent: "center",
    justifyContent: "center",
    marginBottom: 5
  },
  title: {
    color: "#000",
    fontSize: 15,
    marginTop: "10",
    fontWeight: "500"
  },
  noResult: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  },
  noResultLable: {
    backgroundColor: "#1593e7",
    borderRadius: 3,
    padding: 10,
    width: 150,
    color: "#fff",
    textAlign: "center"
  },
  movie_img: {
    width: width,
    height: width / 2
  },
  buttonView: {
    width: 100,
    height: 40,
    margin: 5
  },
  input: {
    flex: 1,
    borderRadius: 2,
    borderColor: "grey",
    borderWidth: 0.5,
    padding: 5,
    height: 35,
    margin: 4
  },
  divider: {
    backgroundColor: "grey",
    width: width,
    height: 0.8
  },
  ratingView: {
    alignItems: "flex-end",
    justifyContent: "flex-end",
    flexDirection: "column",
    flex: 1
  },
  rating: {
    textAlign: "right",
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    alignItems: "flex-end",
    justifyContent: "flex-end",
    color: "#fff",
    padding: 10,
    marginEnd: 10
  },
  desc: { paddingTop: 5, paddingBottom: 10, textAlign: "justify" },
  itemInRow: {
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "center",
    paddingHorizontal: 5
  },
  itemRowContent: {
    backgroundColor: "#fff"
  },
  searchView: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  }
});

// onPress={() => this.props.navigation.navigate("Details")}
// onPress={() => this.props.navigation.setParams({otherParam: 'Updated!'})}
