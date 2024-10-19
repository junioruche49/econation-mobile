import React from "react";
import { StyleSheet, TouchableHighlight, Text } from "react-native";

function Button({ children, press, disabled = false }) {
  return (
    <TouchableHighlight
      style={styles.loginBtn}
      onPress={press}
      disabled={disabled}
    >
      <Text style={styles.loginBtnText}>{children}</Text>
    </TouchableHighlight>
  );
}

const styles = StyleSheet.create({
  loginBtn: {
    marginTop: 40,
    borderRadius: 5,
    backgroundColor: "#0D261A",
    width: "100%",
    padding: 15,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  loginBtnText: {
    color: "#fff",
    fontSize: 18,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
});
export default Button;
