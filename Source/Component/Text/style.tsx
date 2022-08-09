import { Platform, StyleSheet } from "react-native";
import { Colors, Constants, Styles } from "lybrid-common";

export default StyleSheet.create({
  container: {
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.AppColor,
  },
  text: Platform.select({
    ios: {
      fontSize: Constants.FontSize.small,
      color: "#515C6F",
      ...Styles.fontRegular,
    },
    android: {
      fontSize: Constants.FontSize.small,
      color: "#515C6F",
      ...Styles.fontRegular,
    },
  }),
});
