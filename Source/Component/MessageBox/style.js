import { StyleSheet } from "react-native";
import { TouchableOpacityEx } from "@components";
import { Colors, Constants, Styles } from "@common";

export default StyleSheet.create({
  wrap_mes: {
    flex: 1, 
    // top: 0, left: 0,
    position: "absolute",
    right: 0,
    bottom: 0,
    // left: 0,
    alignItems: "flex-end",
    justifyContent: "flex-end",
    zIndex: 9999,
    elevation: 9999,
    paddingBottom: 20,
    // backgroundColor: 'red'
  },

  wrap_sys_mess: {
    flex: 1,
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "flex-end",
    paddingTop: 20,
    paddingRight: 30,
    // backgroundColor: 'green'
  },
  iconAvatar: {
    width: 81,
    height: 81,
    resizeMode: "contain",
  },

  wrap_mes_txt: {
    minHeight: 55,
    justifyContent: 'center',
    alignItems: 'center'
  },

  mes_txt: {
    fontSize: Constants.FontSize.tiny,
    lineHeight: Constants.FontSize.big,
    color: "#000",
  },

  system_mes: {
    height: 78,
    maxWidth: 270,
    padding: 10,
    paddingRight: 25,
    resizeMode: "contain",
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor: 'green'
  },

  wrap_mess: {
    borderColor: "#B4C55B",
    borderWidth: 2,
    borderRadius: 20,
    backgroundColor: "#F0FFE6",
    padding: 10,
    marginRight: 20,
  },

  triagle: {
    position: "absolute",
    right: -18,
    bottom: 28,
    backgroundColor: "transparent",
    borderStyle: "solid",
    borderTopWidth: 10,
    borderBottomWidth: 10,
    borderRightWidth: 0,
    borderLeftWidth: 20,
    borderTopColor: "transparent",
    borderRightColor: "transparent",
    borderBottomColor: "transparent",
    borderLeftColor: "#F0FFE6",
  },
  bd: {
    position: "absolute",
    right: -17,
    bottom: 31,
  },
  triagleTop: {
    width: 20,
    height: 6,
    borderTopColor: "#B4C55B",
    borderTopWidth: 2,
    transform: [{ rotate: "30deg" }],
  },
  triagleBottom: {
    width: 20,
    height: 6,
    borderBottomColor: "#B4C55B",
    borderBottomWidth: 2,
    transform: [{ rotate: "-30deg" }],
  },
});
