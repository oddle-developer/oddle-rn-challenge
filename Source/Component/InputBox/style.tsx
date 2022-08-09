import { StyleSheet } from "react-native";
import { Colors, Constants } from "lybrid-common";

export default StyleSheet.create({
  wrapContainer: {
    width: "100%",
  },
  container: {
    borderRadius: Constants.MeasureSize(4),
    backgroundColor: "#EFEFF4",
    flexDirection: 'row',
  },
  readOnly: {
    height: Constants.MeasureSize(10),
    borderRadius: 0,
    opacity: 0.5,
  },
  wrapReadonly: {
    width: "auto",
    justifyContent: "center",
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#DDDDDD",
    marginHorizontal: 5,
  },
  title: {
    color: "#515C6F",
    fontSize: Constants.FontSize.small,
    marginBottom: 2,
    marginTop: 5,
  },
  input: {
    flex: 1,
    padding: 0,
    // margin: 5,
    color: "#515C6F", //update color
    fontSize: Constants.FontSize.small,
    // fontFamily: "SFProDisplay-Regular"
  },
  inputText: {
    color: "#515C6F", //update color
    padding: 0,
    margin: 5,
    fontSize: Constants.FontSize.medium,
  },
  tag: {
    color: "#ffffff",
    fontSize: Constants.FontSize.tiny,
  }
});
