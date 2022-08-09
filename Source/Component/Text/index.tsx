import React from "react";
import { StyleProp, TextProps, TextStyle } from "react-native";
import { Text } from "react-native-paper";
import styles from "./style";

interface TextExProps extends TextProps {
  style: StyleProp<TextStyle> | undefined,
  children: any | undefined
}

class TextControl extends React.PureComponent<TextExProps> {
  isString(value: any) {
    if (typeof value === "string" || value instanceof String) return true;
    else return false;
  }

  static defaultProps: {
    style: undefined,
    children: undefined,
  }

  render() {
    const { style } = this.props;
    return (
      <Text {...this.props} style={[styles.text, style]}>
        {this.isString(this.props.children)
          ? this.props.children.trim()
          : this.props.children}
      </Text>
    );
  }
}

export default TextControl;
