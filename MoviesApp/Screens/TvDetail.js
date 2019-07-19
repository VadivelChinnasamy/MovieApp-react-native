import React, { Component } from "react";
import {
  View,
  Text,
  Image,
  Dimensions,
  StyleSheet,
  FlatList,
  Linking,
  BackHandler,
  TouchableOpacity
} from "react-native";
import axios from "axios";
import config from "../Constant/Config";
import styles from "../Styles/Common";
import { ScrollView } from "react-native-gesture-handler";
export const menu_icon = require("../assets/ic_back.png");
const { width } = Dimensions.get("window");
class DetailScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      response: [],
      review: [],
      bannerImage: "",
      movieTitle: ""
    };
  }

  componentDidMount() {
    const { navigation } = this.props;
    const itemId = navigation.getParam("itemId", "NO-ID");
    this.getTvDetail(itemId);
    BackHandler.addEventListener("hardwareBackPress", this.handleBackPress);
  }
  componentWillUnmount() {
    BackHandler.removeEventListener("hardwareBackPress", this.handleBackPress);
  }
  getTvDetail(itemId) {
    console.log(
      "TV DETAIL PAGE : " +
        config.movies.TvDetail +
        itemId +
        config.movies.apiKey
    );

    axios
      .get(config.movies.TvDetail + itemId + config.movies.apiKey)
      .then(res => {
        this.setState({
          response: res.data
        });
      });
    //  this.getReviewLst(itemId);
  }

  getReviewLst(itemId) {
    axios
      .get(
        config.movies.movieDetail + itemId + "/reviews" + config.movies.apiKey
      )
      .then(res => {
        this.setState({
          review: res.data
        });
      });
  }

  handleBackPress = () => {
    this.props.navigation.navigate("Home");
    // this.goBack(); // works best when the goBack is async
    //return true;
  };

  // onError(error) {
  //   this.setState({ image: require("your_local_image.path") });
  // }

  render() {
    const { navigation } = this.props;
    const movieName = navigation.getParam("movieName", "NO-ID");

    return (
      <ScrollView style={styles.container}>
        <View style={styles.headerContainer}>
          <TouchableOpacity
            style={styles.headerIconView}
            onPress={() => this.props.navigation.goBack()}
          >
            <Image source={menu_icon} style={styles.icon} />
          </TouchableOpacity>
          <View style={styles.headerTitle}>
            <Text numberOfLines={1} ellipsizeMode="middle" style={styles.text}>
              {movieName}
            </Text>
          </View>
        </View>
        {/* Detail View  */}
        <View style={[styles.container, styles.paddingValue]}>
          <Image
            style={pageStyle.bannerImg}
            resizeMode="cover"
            source={{
              uri:
                config.movies.bannerimageUrl + this.state.response.backdrop_path
            }}
          />
          <Text style={pageStyle.desc}>{this.state.response.overview}</Text>
          <Text
            style={{ color: "blue", marginTop: 10 }}
            onPress={() => Linking.openURL(this.state.response.homepage)}
          >
            Visit Website
          </Text>
          <Text style={{ color: "skyblue", fontSize: 16, marginTop: 10 }}>
            Production Companies:
          </Text>
          <FlatList
            //            horizontal={true}
            data={this.state.response.production_companies}
            renderItem={({ item }) => (
              <View style={pageStyle.productionView}>
                <View style={pageStyle.productionAdapterView}>
                  <Image
                    style={pageStyle.production_img}
                    resizeMode="cover"
                    //  onError={this.onError.bind(this)}
                    source={{
                      uri: config.movies.imageBaseUrl + item.logo_path
                    }}
                  />
                  <Text style={pageStyle.prodCompanyName} numberOfLines={1}>
                    {item.name}
                  </Text>
                </View>
              </View>
            )}
          />
          <Text style={{ color: "skyblue", fontSize: 16, marginTop: 10 }}>
            Story Genres:
          </Text>
          <FlatList
            horizontal={true}
            data={this.state.response.genres}
            renderItem={({ item }) => (
              <View style={pageStyle.genresView}>
                <View style={pageStyle.genres}>
                  <Text style={pageStyle.genresTitle}>{item.name}</Text>
                </View>
              </View>
            )}
          />
        </View>
      </ScrollView>
    );
  }
}

export default DetailScreen;

const pageStyle = StyleSheet.create({
  bannerImg: {
    width: width,
    height: width / 2
  },
  desc: {
    color: "#000",
    marginTop: 10
  },
  budgetRatingView: {
    flex: 1,
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
    backgroundColor: "#CCFF0000"
  },
  production_img: {
    width: 50,
    height: 50,
    borderRadius: 90
  },
  productionView: {
    flexDirection: "column"
  },
  prodCompanyName: {
    justifyContent: "center",
    alignItems: "center",
    textAlign: "left",
    fontWeight: "500",
    padding: 8
  },
  productionAdapterView: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    margin: 5
  },
  genresView: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  },
  genres: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#1e88e5",
    borderRadius: 20,
    borderWidth: 0.8,
    margin: 5
  },
  genresTitle: {
    borderRadius: 12,
    borderColor: "#000",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    alignItems: "center",
    margin: 5
  },
  reviewView: {
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start"
  },
  reviewAuthor: {
    justifyContent: "flex-start",
    alignItems: "flex-start",
    textAlign: "left",
    fontWeight: "500",
    padding: 5
  },
  reviewComment: {
    justifyContent: "flex-start",
    alignItems: "flex-start",
    textAlign: "left",
    fontSize: 13,
    padding: 5
  },
  budget: {
    flex: 5,
    alignItems: "center",
    justifyContent: "center",
    textAlign: "left",
    padding: 10
  },
  rating: {
    flex: 5,
    height: 80,
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    textAlign: "right"
  }
});
