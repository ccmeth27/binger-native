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
    const color = labelColor || 'white';
    const fontSize = labelTextSize || 16;
    const inputColor = textColor || 'white';
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
                borderBottomColor: borderBottom,
                height: 30, 
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
      justifyContent: 'center',
      height: 50,
      marginTop: 20,
    },
    label: { 
        fontWeight: "700", 
        marginTop: 10,
        marginBottom: 5,
        marginLeft: 30, 
    },
    input: {
      borderBottomWidth: 1,
      marginBottom: 5,
      marginLeft: 40,
      marginRight: 40,
    }
  });
  export default InputField;