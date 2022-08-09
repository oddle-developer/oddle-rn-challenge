import React from "react";
import { View, Text, Image, ImageSourcePropType } from "react-native";
import { TouchableOpacityEx } from "lybrid-component";
import { Colors } from 'lybrid-common';
import styles from "./style";

export interface ToolBarProps {
  rightView: any | undefined,
  onPressRight: () => void | undefined,
  onPressLeft: () => void | undefined,
  right: ImageSourcePropType | undefined,
  style: any | undefined,
  back: boolean | undefined,
  leftIcon: ImageSourcePropType | undefined,
  backgroundColor: string | undefined,
  textColor: string | undefined,
  title: string | undefined,
}

export default class ToolBar extends React.Component<ToolBarProps> {
  static defaultProps: {
    rightView: undefined,
    onPressRight: undefined,
    onPressLeft: undefined,
    right: undefined,
    style: undefined,
    back: undefined,
    leftIcon: undefined,
    backgroundColor: undefined,
    textColor: undefined,
    title: undefined,
  };

  constructor(props: ToolBarProps) {
    super(props);
  }

  render() {
    let { rightView, onPressRight, style } = this.props;
    return (
      <View style={{
        backgroundColor: this.props.backgroundColor ? this.props.backgroundColor : Colors.AppColor,
      }}>
        <View
          style={[
            styles.containerTool,
            style,
            this.props.backgroundColor && {
              backgroundColor: this.props.backgroundColor,
            },
          ]}
        >
          <View style={styles.left}>
            <Text
              style={[
                styles.title,
                {
                  color: this.props.textColor
                    ? this.props.textColor
                    : Colors.ToolBarText,
                },
              ]}
              numberOfLines={2}
              ellipsizeMode={"tail"}
            >
              {this.props.title}
            </Text>
          </View>
          {this.props.back && <TouchableOpacityEx
            style={styles.center}
            onPress={() => {
              if (this.props.onPressLeft) {
                this.props.onPressLeft();
              }
            }}
          >
            {/* <Icon size={24} color='white' name={this.props.hideLeft == true ? null : (this.props.back ? "arrow-left" : "menu")} /> */}
            <Image
              style={styles.appIcon}
              source={
                this.props.back
                  ? require('lybrid-image/ic_back.png')
                  : this.props.leftIcon
              }
            />
          </TouchableOpacityEx>}
          {!rightView && onPressRight && (
            <TouchableOpacityEx
              style={styles.right}
              onPress={() => {
                if (onPressRight) {
                  onPressRight();
                }
              }}
            >
              {/* <Icon size={24} color={Colors.Icon} name={this.props.right} /> */}
              <Image style={styles.icon} source={this.props.right} />
            </TouchableOpacityEx>
          )}
          {rightView && onPressRight && (
            <TouchableOpacityEx
              style={styles.rightAuto}
              onPress={() => {
                if (onPressRight) {
                  onPressRight();
                }
              }}
            >
              {rightView}
            </TouchableOpacityEx>
          )}
        </View>
      </View>
    );
  }
}