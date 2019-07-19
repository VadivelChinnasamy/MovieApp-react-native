import React, { Component } from "react";
import {
  createDrawerNavigator,
  DrawerItems,
  SafeAreaView,
  createAppContainer
} from "react-navigation"; // Version can be specified in package.json
import PopularMovies from "./Screens/PopularMovies";
import DetailScreen from "./Screens/DetailScreen";
import Trending from "./Screens/Trending";
import SearchMovies from "./Screens/SearchMovies";
import TvList from "./Screens/TvList";
import TvDetail from "./Screens/TvDetail";

import {
  View,
  Text,
  ScrollView,
  StatusBar,
  Dimensions,
  Image
} from "react-native";

const { width } = Dimensions.get("window");
export default class App extends Component {
  render() {
    return <MyApp />;
  }
}
class Hidden extends React.Component {
  render() {
    return null;
  }
}

const CustomDrawerContentComponent = props => (
  <SafeAreaView>
    <ScrollView>
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Image
          style={{
            width: 100,
            height: 100,
            resizeMode: "stretch"
          }}
          source={{
            uri: "https://facebook.github.io/react/logo-og.png"
          }}
        />
        <Text>Movie App</Text>
      </View>
      <DrawerItems {...props} />
    </ScrollView>
  </SafeAreaView>
);

const MyDrawerNavigator = createDrawerNavigator(
  {
    Home: {
      screen: TvList
    },
    Trending: {
      screen: Trending
    },
    MovieDetail: {
      screen: DetailScreen,
      navigationOptions: {
        // drawerLabel: "Simple Screen 3",
        drawerLabel: <Hidden />
      }
    },
    Search: {
      screen: SearchMovies
    },
    TvDetail: {
      screen: TvDetail
    },
    TV: {
      screen: TvList
    }
  },

  {
    contentComponent: CustomDrawerContentComponent,
    drawerWidth: width / 1.5,
    contentOptions: {
      activeTintColor: "blue"
    }
  }
);
const MyApp = createAppContainer(MyDrawerNavigator);

// PASSIGN PARAMS VALUES - https://reactnavigation.org/docs/en/params.html
// onPress = {() => {
//   /* 1. Navigate to the Details route with params */
//   this.props.navigation.navigate('Details', {
//     itemId: 86,
//     otherParam: 'anything you want here',
//   });

// // GETING VALUES
// const { navigation } = this.props;
// const itemId = navigation.getParam('itemId', 'NO-ID');
// const otherParam = navigation.getParam('otherParam', 'some default value');

//  CreateMessage: {
//       screen: CreateMessageScreen,
//       navigationOptions: {
//         header: {
//           visible: false
//         }
//       }
//     },
