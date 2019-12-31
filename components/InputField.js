import React, { Component } from "react";
import { View, Text, StyleSheet, TextInput } from "react-native";

class InputField extends Component {
  render() {
    const {
      labelText,
      labelTextSize,
      labelColor,
      textColor,
      borderBottomColor,
      inputType,
      customStyle,
    } = this.props;
    const color = labelColor || 'black';
    const fontSize = labelTextSize || 14;
    const inputColor = textColor || 'black';
    const borderBottom = borderBottomColor || "black";
    return (
        <View style={[customStyle, styles.wrapper]}>
          <Text style={[{ color, fontSize }, styles.label]}>{labelText}</Text>
          <TextInput
            onBlur={this.props.onBlur}
            onFocus={this.props.onFocus}
            onChangeText={this.props.onChangeText}
            onChange={this.props.onChange}
            onEndEditing={this.props.onEndEditing}
            autoCorrect={false}
            autoCapitalize={"none"}
            style={[
              { color: inputColor, 
                borderBottomColor: borderBottom 
                },
                styles.input
            ]}
            secureTextEntry={inputType === "password"}
          />
        </View>
      );
    }
  }
  const styles = StyleSheet.create({
    wrapper: {
      display: "flex",
      justifyContent: 'center'
    },
    label: { 
        fontWeight: "700", 
        marginTop: 10,
        marginBottom: 5,
        marginLeft: 30, 
    },
    input: {
      borderBottomWidth: 1,
      paddingTop: 5,
      marginBottom: 5,
      marginLeft: 30,
      marginRight: 30,
    }
  });
  export default InputField;