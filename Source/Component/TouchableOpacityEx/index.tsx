import React from "react";
import debounce from "lodash.debounce"; // 4.0.8
import { StyleProp, TouchableOpacity, ViewStyle } from "react-native";
import Global from "lybrid-global";

interface TouchableOpacityEx {
  onPress: () => void | undefined;
  style: StyleProp<ViewStyle> | undefined;
  activeOpacity?: number | undefined;
  disabled: boolean;
}

export default class PreventDoubleClick extends React.PureComponent<TouchableOpacityEx> {
  static defaultProps: {
    onPress: undefined,
    style: undefined,
    disabled: false
  };

  debouncedOnPress = () => {
    if (new Date().getTime() - Global.lastClick > 200) {
      Global.lastClick = new Date().getTime();
      this.props.onPress && this.props.onPress();
    } else {
      Global.lastClick = new Date().getTime();
    }
  };

  onPress = debounce(this.debouncedOnPress, 200, {
    leading: true,
    trailing: false,
  });

  render() {
    return (
      <TouchableOpacity
        activeOpacity={0.7}
        {...this.props}
        onPress={this.onPress}
      />
    );
  }
}
