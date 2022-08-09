import { StyleSheet } from "react-native";
import { Colors, Constants, Styles } from "lybrid-common";

export default StyleSheet.create({
  container: {
    // paddingLeft: Constants.MeasureSize(5),
    // paddingRight: Constants.MeasureSize(5),
    // backgroundColor: Colors.AppColor,
    // justifyContent: 'center',
    // borderRadius: 4,
    // height: 30,
    ...Styles.hyperLink,
  },
  wrapText: {
  },
  text: {
    // fontSize: Constants.FontSize.tiny,
    // color: Colors.buttonText,
    ...Styles.hyperLinkText,
  },
  arrow: {
    width: Constants.MeasureSize(40),
    height: Constants.MeasureSize(40),
    right: 10,
    position: "absolute",
    resizeMode: "center",
  },
  arrowContainer: {
    width: Constants.MeasureSize(40),
    height: Constants.MeasureSize(40),
    right: 0,
    position: "absolute",
    resizeMode: "center",
  },
  arrowleft: {
    width: Constants.MeasureSize(40),
    height: Constants.MeasureSize(40),
    left: 10,
    position: "absolute",
    resizeMode: "center",
  },
});
