import React from "react";
import { View, StyleSheet, Image, Text } from "react-native";
import SuccessImg from "../../assets/charm_tick.png";
import Button from "../button/Button";

function Success({ children, doneHandle }) {
  return (
    <View style={styles.container}>
      <View>
        <Image source={SuccessImg} />
      </View>
      <View>
        <Text style={{ fontWeight: "500" }}>{children}</Text>
      </View>
      <View style={{ width: "100%" }}>
        <Button press={doneHandle}>Done</Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 30,
    gap: 10,
  },
});
export default Success;
