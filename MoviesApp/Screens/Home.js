import React from "react";

import { StackNavigator } from "react-navigation";
import ScreenOne from "./PopularMovies";
import ScreenTwo from "./DetailScreen";
import ScreenThree from "./SearchMovies";

const App = StackNavigator({
  ScreenOne: { screen: ScreenOne },
  ScreenTwo: { screen: ScreenTwo },
  ScreenThree: { screen: ScreenThree }
});

export default App;
