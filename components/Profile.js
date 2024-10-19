import React from "react";
import { View, StyleSheet, Text, Alert, TouchableOpacity } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useAccount } from "../store/useAccount";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import AntDesign from "@expo/vector-icons/AntDesign";

function Profile() {
  const account = useAccount((state) => state.account);
  const logout = useAccount((state) => state.logout);
  const navigation = useNavigation();

  const logOut = () => {
    AsyncStorage.clear();
    logout();
    navigation.navigate("Login");
  };

  const createButtonAlert = () =>
    Alert.alert("Logout", "Are you sure you want to logout?", [
      {
        text: "Cancel",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel",
      },
      { text: "OK", onPress: logOut },
    ]);

  return (
    <View style={styles.divAlarm}>
      <View>
        <Text style={styles.headerName}>{account?.name}</Text>
        <Text style={styles.headerSite}>{account?.location} Site</Text>
      </View>
      <View style={styles.profileIcon}>
        <Ionicons name="notifications-outline" size={24} color="black" />
        <TouchableOpacity onPress={createButtonAlert}>
          <AntDesign name="logout" size={24} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  divAlarm: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    marginBottom: 15,
    marginHorizontal: 18,
  },
  headerName: {
    fontSize: 17,
    fontWeight: "400",
  },
  headerSite: {
    fontWeight: "300",
    fontSize: 12,
    color: "#2E6738",
  },
  profileIcon: {
    display: "flex",
    flexDirection: "row",
    gap: 10,
    justifyContent: "space-between",
  },
});
export default Profile;
