import { Platform, StyleSheet } from "react-native";
import { Colors, Constants, Utils, Styles } from "lybrid-common";

export default StyleSheet.create({
  container: {
    height: 60,
    paddingTop: 0,
    width: "100%",
    backgroundColor: Colors.AppColor,
    flexDirection: "row",
  },
  containerTool: {
    width: "100%",
    height: 50,
    marginTop: Utils.isIphoneXorAbove() ? 30 : 20,
    backgroundColor: Colors.AppColor,
    flexDirection: "row",
    // ...Styles.shadowSmall
  },
  appIcon: {
    width: 20,
    height: 20,
  },
  icon: {
    width: 20,
    height: 20,
    resizeMode: "center",
    tintColor: Colors.Icon,
  },
  left: {
    paddingHorizontal: 50,
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
  },
  right: {
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    width: 60,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  rightAuto: {
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    width: "auto",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  center: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    width: 60,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
  },

  title: {
    fontSize: Constants.FontSize.medium,
    textAlign: "center",
    fontWeight: "bold",
    // color: Colors.ToolBarText
  },

  text: {
    fontSize: Constants.FontSize.big,
    fontWeight: "bold",
    color: "#000",
  },
});
