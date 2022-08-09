import { Text, TouchableOpacityEx } from "@components";
import React from "react";
import { Image, TouchableWithoutFeedback, View } from "react-native";
import styles from "./style";

export default class MessageBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // isHiden: (global.guidelines != null && props.keyScreen != null && props.keyScreen.length > 0) ? global.guidelines[`${props.keyScreen}`] : false
      isHiden: global.popupGuide != null && props.keyScreen != null && props.keyScreen.length > 0 ? global.popupGuide[`${props.keyScreen}`] : false,
    };
  }

  render() {
    const { title, icon, styleIcon, keyScreen, style, styleTriagle, styleBd, styleHidden } = this.props;
    return (
      <View style={[styles.wrap_mes, !this.state.isHiden && { left: 0 }, style]}>
        <TouchableWithoutFeedback
          onPress={() => {
            if (this.props.onPress) {
              this.props.onPress();
              return;
            }
            this.setState({ isHiden: true });
            if (keyScreen) {
              global.popupGuide[`${keyScreen}`] = !global.popupGuide[`${keyScreen}`];
              // global.guidelines[`${keyScreen}`] = true;
              // AsyncStorage.setItem(Constants.Store.Guidelines, JSON.stringify(global.guidelines));
            }
          }}
        >
          <View style={styles.wrap_sys_mess}>
            {!this.state.isHiden && (
              <View
                style={{
                  flex: 1,
                  // backgroundColor: 'green',
                  marginLeft: 30
                }}
              >
                {/* <ImageBackground style={styles.system_mes} imageStyle={{ resizeMode: "contain" }} source={require('@images/wrap_mes.png')}>
                            <ScrollView>
                                <View onStartShouldSetResponder={() => true} >
                                    <Text style={styles.mes_txt}>{title || ''}</Text>
                                </View>
                            </ScrollView>
                        </ImageBackground> */}
                <View style={styles.wrap_mess}>
                  <View style={styles.wrap_mes_txt}><Text style={styles.mes_txt}>{title || ""}</Text></View>
                  <View style={[styles.triagle, styleTriagle]} />
                  <View style={[styles.bd, styleBd]}>
                    <View style={styles.triagleTop} />
                    <View style={styles.triagleBottom} />
                  </View>
                </View>
              </View>
            )}
            <TouchableOpacityEx
              onPress={() => {
                this.setState({ isHiden: !this.state.isHiden });
              }}
            >
              <View
                style={[
                  { height: 80, width: 80, justifyContent: "center", alignItems: "center" },
                  this.state.isHiden && styleHidden,
                ]}
              >
                <Image style={styleIcon ? styleIcon : styles.iconAvatar} source={icon ? icon : require("@images/ic_mes_confirm.png")} />
              </View>
            </TouchableOpacityEx>
          </View>
        </TouchableWithoutFeedback>
      </View>
    );
  }
}
