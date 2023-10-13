import React from "react";
import { StyleSheet, TextInput } from "react-native";

const CustomTextInput = ({
  placeholderVal,
  changeLstnr,
  initialVal,
  isSecure,
  keyboardTypeVal,
  maxLengthVal,
}) => {
  return (
    <TextInput
      autoCapitalize="none"
      maxLength={maxLengthVal ? maxLengthVal : 100}
      secureTextEntry={isSecure ? isSecure : false }
      style={styles.inputStyle}
      placeholder={placeholderVal}
      onChangeText={changeLstnr}
      value={initialVal}
      keyboardType={keyboardTypeVal ? keyboardTypeVal : "default"}
    />
  );
};

export default CustomTextInput;

const styles = StyleSheet.create({
  inputStyle: {
    paddingLeft: 10,
    borderRadius: 5,
    height: 40,
    width: "80%",
    backgroundColor: "#fff",
  },
});
