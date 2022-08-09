import React from 'react';
import { View, Image } from 'react-native';
import { TouchableOpacityEx, Text } from 'lybrid-component';
import styles from './style';

interface ButtonProps {
  onPress: () => void,
  title: string,
  style: any,
  textStyle: any,
  disable: boolean,
  icon: any,
  iconleft: any,
  iconleftStyle: any,
  iconAction: boolean,
  iconActionPress: () => void
}

class Button extends React.PureComponent<ButtonProps> {
  static defaultProps: {
    onPress: undefined,
    title: undefined,
    style: undefined,
    textStyle: undefined,
    disable: undefined,
    icon: undefined,
    iconleft: undefined,
    iconleftStyle: undefined,
    iconAction: undefined,
    iconActionPress: undefined
  }
  render() {
    const { onPress, title, style, textStyle, disable, icon, iconleft, iconleftStyle, iconAction, iconActionPress } = this.props;
    const disabledStyle = disable ? { opacity: 0.5 } : {};
    if (disable) {
      return (
        <View style={[styles.container, disabledStyle, style]}>
          {iconleft && (
            <Image
              style={[styles.arrowleft, iconleftStyle || {}]}
              source={
                iconleft ? iconleft : require('lybrid-image/ic_arrow_save.png')
              }
            />
          )}
          <View style={[styles.wrapText]}>
            <Text style={[styles.text, textStyle]}>
              {title}
            </Text>
          </View>
          {icon && (
            <Image
              style={styles.arrow}
              source={icon ? icon : require('lybrid-image/ic_arrow_save.png')}
            />
          )}
        </View>
      );
    } else {
      return (
        <TouchableOpacityEx
          onPress={() => onPress && onPress()}
          style={[styles.container, style, disabledStyle]}
          disabled={disable}>
          {iconleft && (
            <Image
              style={[styles.arrowleft, iconleftStyle || {}]}
              source={
                iconleft ? iconleft : require('lybrid-image/ic_arrow_save.png')
              }
            />
          )}
          <View style={[styles.wrapText]}>
            <Text style={[styles.text, textStyle]}>
              {title}
            </Text>
          </View>
          {icon && (
            <Image
              style={styles.arrow}
              source={icon ? icon : require('lybrid-image/ic_arrow_save.png')}
            />
          )}
          {iconAction && (
            <TouchableOpacityEx style={[styles.arrowContainer]} onPress={() => iconActionPress && iconActionPress()}>
              <Image
                style={styles.arrow}
                source={iconAction ? iconAction : require('lybrid-image/ic_arrow_save.png')}
              />
            </TouchableOpacityEx>
          )}
        </TouchableOpacityEx>
      );
    }
  }
}

export default Button;
