import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Modal,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  Text,
} from "react-native";
import ConfirmDetails from "./forms/ConfirmDetails";
import AntDesign from "@expo/vector-icons/AntDesign";
import { getStatusBarHeight } from "react-native-status-bar-height";
import Step1SalesOrder from "./forms/Step1SalesOrder";
import { ApiServiceFacade } from "../../services/apiServiceFacade";
import Success from "../success/Success";
import { API_URL } from "../../constants/constant";

function SalesOrder({ navigation }) {
  const apiServiceFacade = new ApiServiceFacade(API_URL);
  const [step, setStep] = useState(1);
  const [date, setDate] = useState(new Date());
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(undefined);

  const [customerName, setCustomerName] = useState("");
  const [volumeLoaded, setVolumeLoaded] = useState("");

  const handleProceed = () => {
    setStep((prev) => prev + 1);
  };

  const handleBack = () => {
    if (step === 1) {
      setDate(new Date());
      setCustomerName();
      setVolumeLoaded();
      navigation.goBack();
    } else {
      setStep((prev) => prev - 1);
    }
  };
  const handleSubmit = async () => {
    setLoading(true);
    try {
      await apiServiceFacade.post("/api/v1/sales-orders", {
        transactionDate: date,
        customerName: customerName,
        volumeLoaded: parseInt(volumeLoaded),
      });
      setLoading(false);
      setStep(3);
    } catch (error) {
      setLoading(false);
      setError(error.response?.data?.message);
    }
  };

  const reset = () => {
    setStep(1);
    setDate(new Date());
    setCustomerName();
    setVolumeLoaded();
    navigation.goBack();
  };

  return (
    // <Modal visible={IsSalesOrder} animationType="slide">
    <ScrollView style={styles.container}>
      {step !== 3 && (
        <View style={styles.modalHeader}>
          <TouchableOpacity
            onPress={handleBack}
            accessibilityIgnoresInvertColors={true}
            style={styles.modalBackIcon}
          >
            <AntDesign name="left" size={18} color="black" />
          </TouchableOpacity>
          <Text style={styles.modalText}>
            {step === 2 ? "Confirm details" : "Create Sales Order"}
          </Text>
        </View>
      )}
      <View>
        {step === 1 && (
          <Step1SalesOrder
            handleProceed={handleProceed}
            soDate={date}
            dateHandler={setDate}
            customerName={customerName}
            setCustomerName={setCustomerName}
            volumeLoaded={volumeLoaded}
            setVolumeLoaded={setVolumeLoaded}
          />
        )}
        {step === 2 && (
          <ConfirmDetails
            handleProceed={handleProceed}
            date={date}
            volumeLoaded={volumeLoaded}
            customerName={customerName}
            handleSubmit={handleSubmit}
            loading={loading}
          />
        )}
        {step === 3 && (
          <Success doneHandle={reset}>
            Sales Order has been created successfully
          </Success>
        )}
      </View>
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
  },
  modalHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
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
export default SalesOrder;
