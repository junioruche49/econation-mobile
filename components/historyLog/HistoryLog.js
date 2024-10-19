import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Modal,
  Text,
  Platform,
  StatusBar,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import { getStatusBarHeight } from "react-native-status-bar-height";
import useClientCommand from "../../hooks/useClientCommand";
import { History } from "../../screens/Home";

function HistoryLog({ navigation }) {
  const [step, setStep] = useState(1);

  const handleBack = () => {
    if (step === 1) {
      navigation.goBack();
    } else {
      setStep((prev) => prev - 1);
    }
  };
  const { data: salesHistory, error } = useClientCommand(
    "/api/v1/transactions"
  );

  return (
    // <Modal visible={isHistoryLog} animationType="slide">
    <ScrollView style={styles.container}>
      <View style={styles.modalHeader}>
        <TouchableOpacity
          onPress={handleBack}
          accessibilityIgnoresInvertColors={true}
          style={styles.modalBackIcon}
        >
          <AntDesign name="left" size={18} color="black" />
        </TouchableOpacity>
        <Text style={styles.modalText}>History Log</Text>
      </View>
      {salesHistory.map((sales, id) => {
        return <History sales={sales} key={id} />;
      })}
    </ScrollView>
    // </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flex: 1,
    paddingTop:
      Platform.OS === "android"
        ? StatusBar.currentHeight
        : getStatusBarHeight() + 40,
    backgroundColor: "#fff",
    paddingHorizontal: 18,
    // paddingBottom: 60,
  },
  modalHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
    marginBottom: 20,
  },
  modalBackIcon: {
    padding: 7,
    borderColor: "#E8ECF4",
    borderWidth: 1,
    borderRadius: 10,
  },
  modalText: {
    fontSize: 14,
    fontWeight: "500",
  },
});
export default HistoryLog;
