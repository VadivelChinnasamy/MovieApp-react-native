import { StyleSheet } from "react-native";
export default StyleSheet.create({
  headerTitle: {
    flex: 1,
    alignItems: "flex-start",
    justifyContent: "center"
  },
  text: {
    fontSize: 18,
    color: "#ffffff"
  },
  headerContainer: {
    flexDirection: "row",
    height: 60,
    marginBottom: 5,
    backgroundColor: "#1593e7"
  },

  icon: {
    width: 20,
    height: 20
  },
  headerIconView: {
    alignItems: "flex-start",
    padding: 10,
    justifyContent: "center"
  },
  container: {
    flex: 1,
    flexDirection: "column"
  },
  activityIndicator: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  },
  itemRow: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    margin: 8
  },
  itemRowImg: {
    width: 90
  },
  itemRowContent: {
    flex: 7.8,
    flexDirection: "column",
    alignItems: "flex-start",
    padding: 5,
    justifyContent: "center"
  },
  movie_img: {
    width: 90,
    height: 90,
    borderRadius: 90
  },
  movieTitle: {
    fontSize: 18,
    fontWeight: "500"
  },
  paddingValue: { padding: 8 },

  short_desc: {
    fontSize: 13,
    color: "grey"
  }
});
