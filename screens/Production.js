import React from "react";

import {
  View,
  StyleSheet,
  Text,
  SafeAreaView,
  Platform,
  Image,
  StatusBar,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import SO from "../assets/SO.png";
import HO from "../assets/HO.png";
import Group from "../assets/Group.png";
import Profile from "../components/Profile";
import HomeBg from "../components/HomeBg";
import useClientCommand from "../hooks/useClientCommand";
import { History } from "./Home";
import { useNavigation } from "@react-navigation/native";

function Production() {
  const navigation = useNavigation();

  const { data, error } = useClientCommand("/api/v1/transactions");
  const salesHistory = data.slice(data.length - 5, data.length);

  const handeleCrushProduction = () => {
    navigation.navigate("CrushProduction");
  };
  const handeleHotWashProduction = () => {
    navigation.navigate("HotWashProduction");
  };
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Profile />
        <HomeBg title={"Inventory"}>
          <View style={styles.headerIcons}>
            {/* <View style={styles.headerIconlLayout}>
              <Text style={styles.headerIconlLayout1}>Available Bottles</Text>
              <Text style={styles.headerIconlLayout2}>500.00 Tons</Text>
            </View> */}
            <TouchableOpacity
              onPress={handeleCrushProduction}
              style={styles.headerIcon}
            >
              <Image source={SO} style={styles.icon} />
              <Text style={styles.iconText}>Crush Production</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handeleHotWashProduction}
              style={styles.headerIcon}
            >
              <Image source={SO} style={styles.icon} />
              <Text style={styles.iconText}>Hot Wash Production</Text>
            </TouchableOpacity>
          </View>
        </HomeBg>
        <View style={styles.qoute}>
          <View style={styles.qouteLngTxtCover}>
            <View style={styles.qouteLngTxt}>
              <Text style={styles.qouteText}>
                “When you put the whole picture together, recycling is the right
                thing to do.”
              </Text>
              <Text style={styles.qouteUser}>- Pam Shoemaker, Author</Text>
            </View>
          </View>
          <View>
            <Image source={Group} style={styles.qouteImg} />
          </View>
        </View>
        <View style={styles.historyView}>
          <Text style={styles.historyText}>History</Text>
        </View>
        <View style={styles.historySection}>
          {salesHistory.map((sales, id) => {
            if (id <= 4) {
              return <History sales={sales} key={id} />;
            }
          })}
          <View style={styles.seeAll}>
            <Text style={styles.seeAllText}>See all</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    backgroundColor: "#fff",
  },
  headerIconlLayout: {
    // flex: 1,
  },
  headerIconlLayout1: {
    fontSize: 10,
    color: "#89C540",
  },
  headerIconlLayout2: {
    fontSize: 25,
    fontWeight: "500",
    color: "#fff",
  },
  headerIcons: {
    flexDirection: "row",
    marginLeft: 35,
    marginTop: 20,
    gap: 30,
  },
  headerIcon: {
    width: 65,
    textAlign: "center",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  icon: {
    textAlign: "center",
  },
  iconText: {
    marginTop: 5,
    color: "#fff",
    fontSize: 10,
    fontWeight: "600",
    textAlign: "center",
  },
  qoute: {
    flexDirection: "row",
    marginTop: 30,
    borderColor: "#B5830D",
    borderWidth: 1,
    backgroundColor: "#FCF0D4",
    borderRadius: 8,
    padding: 10,
    paddingHorizontal: 15,
    marginHorizontal: 18,
  },
  qouteText: {
    color: "#B5830D",
    fontWeight: "500",
    fontSize: 13,
  },
  qouteUser: {
    marginTop: 5,
    fontSize: 10,
    fontStyle: "italic",
    color: "#B5830D",
    fontWeight: "300",
  },
  qouteImg: {},
  qouteLngTxt: {
    display: "flex",
    flexDirection: "column",
  },
  qouteLngTxtCover: {
    width: "80%",
  },
  historyView: {
    marginTop: 30,
    marginBottom: 15,
    marginHorizontal: 18,
  },
  historyText: {
    fontSize: 17,
    fontWeight: "500",
  },
  historySection: {
    backgroundColor: "#F7F8F9",
    borderColor: "#E8ECF4",
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    marginHorizontal: 18,
    paddingBottom: 20,
    marginBottom: 20,
    paddingTop: 20,
    display: "flex",
  },
  historyDiv: {
    flexDirection: "row",
    paddingHorizontal: 10,
    justifyContent: "space-between",
    marginBottom: 25,
  },
  historyOrder: {
    flexDirection: "row",
    justifyContent: "center",
    // alignItems: "center",
    gap: 8,
  },
  historyHead: {
    fontWeight: "400",
    fontSize: 13,
    marginBottom: 4,
  },
  historyLightText: {
    fontWeight: "200",
    fontSize: 10,
  },
  seeAll: {
    flexDirection: "row",
    justifyContent: "center",
  },
  seeAllText: {
    color: "#89C540",
  },
});
export default Production;
