import React from "react";
import { View, StyleSheet, TextInput } from "react-native";

function CustomTextInput({
  placeholder,
  changeTextHandler,
  secureTextEntry = false,
  onBlur,
  value,
  inputMode = "text",
  keyboardType = "default",
}) {
  return (
    <TextInput
      style={styles.input}
      placeholder={placeholder}
      placeholderTextColor={"#8391A1"}
      onChangeText={changeTextHandler}
      onBlur={onBlur}
      secureTextEntry={secureTextEntry}
      value={value}
      inputMode={inputMode}
      keyboardType={keyboardType}
    />
  );
}

const styles = StyleSheet.create({
  container: {},
  input: {
    borderColor: "#E8ECF4",
    borderWidth: 1,
    paddingVertical: 15,
    paddingHorizontal: 25,
    color: "#8391A1",
    backgroundColor: "#F7F8F9",
    borderRadius: 8,
    marginBottom: 15,
    fontSize: 15,
  },
});
export default CustomTextInput;
