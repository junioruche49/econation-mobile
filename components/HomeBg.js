import React from "react";
import { View, StyleSheet, ImageBackground, Text } from "react-native";

function HomeBg({ children, title }) {
  return (
    <ImageBackground
      source={require("../assets/HomeBg.png")}
      imageStyle={{ borderRadius: 6 }}
      resizeMode="cover"
      style={styles.imgBg}
    >
      <View>
        <Text style={styles.headerText}>{title}</Text>
      </View>
      {children}
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  imgBg: {
    height: 170,
    borderRadius: 15,
    paddingTop: 30,
    marginHorizontal: 18,
    paddingRight: 20,
  },
  headerText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
    paddingLeft: 30,
  },
});
export default HomeBg;
