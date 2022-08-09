import React from "react";
import { View, TextInput, TextInputProps } from "react-native";
import { Text } from "lybrid-component";
import { Colors } from "lybrid-common";
import styles from "./style";

var pHiragana =
  "[\\u3041-\\u3096\\u309D-\\u309F]|\\uD82C\\uDC01|\\uD83C\\uDE00";
var pKatakana =
  "[\\u30A1-\\u30FA\\u30FD-\\u30FF\\u31F0-\\u31FF\\u32D0-\\u32FE\\u3300-\\u3357\\uFF66-\\uFF6F\\uFF71-\\uFF9D]|\\uD82C\\uDC00";
var pHan =
  "[\\u2E80-\\u2E99\\u2E9B-\\u2EF3\\u2F00-\\u2FD5\\u3005\\u3007\\u3021-\\u3029\\u3038-\\u303B\\u3400-\\u4DB5\\u4E00-\\u9FD5\\uF900-\\uFA6D\\uFA70-\\uFAD9]|[\\uD840-\\uD868\\uD86A-\\uD86C\\uD86F-\\uD872][\\uDC00-\\uDFFF]|\\uD869[\\uDC00-\\uDED6\\uDF00-\\uDFFF]|\\uD86D[\\uDC00-\\uDF34\\uDF40-\\uDFFF]|\\uD86E[\\uDC00-\\uDC1D\\uDC20-\\uDFFF]|\\uD873[\\uDC00-\\uDEA1]|\\uD87E[\\uDC00-\\uDE1D]";
var rx = new RegExp(
  "^([\\w- @.－ー*%&$@]|" + pHiragana + "|" + pKatakana + "|" + pHan + ")+$"
);

interface InputProps extends TextInputProps {
  inputStyle: any,
  titleStyle: any,
  wrapContainerStyle: any,
  inputTextStyle: any,
  title: any,
  isRequire: any,
  keyboardType: any,
  readOnly: any,
  value: any,
  view: any,
  regex: any,
  tag: any,
  readOnlyStyle: any,
  blocked: any,
  onChangeText: any,
}

class Input extends React.PureComponent<InputProps> {

  static defaultProps: {
    inputStyle: undefined,
    titleStyle: undefined,
    wrapContainerStyle: undefined,
    inputTextStyle: undefined,
    title: undefined,
    isRequire: undefined,
    keyboardType: undefined,
    readOnly: undefined,
    value: undefined,
    view: undefined,
    regex: undefined,
    tag: undefined,
    readOnlyStyle: undefined,
    blocked: undefined,
    onChangeText: undefined,
  }

  input: TextInput | null | undefined;

  componentDidMount() {
    // if (this.props.autoFocus && this.input) {
    //      setTimeout(() => {
    //         this.input.focus()
    //     }, 500)
    // }
  }

  focus() {
    this.input?.focus();
  }

  render() {
    const {
      inputStyle,
      titleStyle,
      wrapContainerStyle,
      inputTextStyle,
      title,
      isRequire,
      keyboardType,
      readOnly,
      value,
      view,
      regex,
      tag,
      readOnlyStyle,
      blocked = false,
      onChangeText
    } = this.props;
    return (
      <View style={[styles.wrapContainer, wrapContainerStyle]}>
        {title && (
          <Text style={[styles.title, titleStyle]}>
            {title}
            {isRequire && !readOnly ? (
              <Text style={{ color: "#F04D41" }}> *</Text>
            ) : (
              ""
            )}
          </Text>
        )}
        <View
          style={[styles.container, readOnly && styles.readOnly, inputStyle, blocked && { backgroundColor: Colors.blockedInput },]}
        >
          {!readOnly && (
            <TextInput
              ref={(input) => {
                view && view(input);
                this.input = input;
              }}
              editable={!blocked}
              maxLength={500}
              underlineColorAndroid="transparent"
              style={[styles.input, inputTextStyle]}
              selectionColor={Colors.Text}
              {...this.props}
              autoFocus={false}
              onChangeText={(value) => {
                if (regex) {
                  if (regex.test(value)) {
                    onChangeText && onChangeText(value);
                  }
                } else {
                  onChangeText && onChangeText(value);
                }
              }}
            />
          )}
          {readOnly && (
            <View style={[styles.wrapReadonly, readOnlyStyle && readOnlyStyle]}>
              <Text
                style={[styles.inputText, inputTextStyle, { margin: 0 }]}
                {...this.props}
              >
                {value}
              </Text>
            </View>
          )}
          {!readOnly && tag && (
            <View
              style={{
                padding: 5,
                borderRadius: 5,
                backgroundColor: tag?.backgroundColor,
              }}
            >
              <Text style={styles.tag}>{tag?.name || ""}</Text>
            </View>
          )}
        </View>
      </View>
    );
  }
}

export default Input;
