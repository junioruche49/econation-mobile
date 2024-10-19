import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Modal,
  ScrollView,
  TouchableOpacity,
  Text,
  StatusBar,
} from "react-native";
import Step1PurchaseOrder from "../components/purchaseOrder/forms/Step1PurchaseOrder";
import ConfirmDetails from "../components/purchaseOrder/forms/ConfirmDetails";
import AntDesign from "@expo/vector-icons/AntDesign";
import { getStatusBarHeight } from "react-native-status-bar-height";
import Success from "../components/success/Success";
import useClientCommand from "../hooks/useClientCommand";
import { ApiServiceFacade } from "../services/apiServiceFacade";
import { API_URL } from "../constants/constant";

function PurchaseOrder({ navigation }) {
  const apiServiceFacade = new ApiServiceFacade(API_URL);
  const [step, setStep] = useState(1);
  const [volumeTons, setVolumeTons] = useState();
  const [bottlePrice, setBottlePrice] = useState();
  const [truckPrice, setTruckPrice] = useState();
  const [bagging, setBagging] = useState();
  const [posPrice, setPosPrice] = useState();
  const [vendor, setVendor] = useState();
  const [loading, setLoading] = useState(false);

  const { data, error } = useClientCommand("/api/v1/vendors");

  const vendors = data.map((vendor) => {
    return {
      label: vendor.firstName + " " + vendor.lastName,
      value: vendor.id,
    };
  });

  const handleProceed = () => {
    setStep((prev) => prev + 1);
  };

  const handleBack = () => {
    if (step === 1) {
      setBagging();
      setBottlePrice();
      setPosPrice();
      setTruckPrice();
      setVolumeTons();
      setVendor();
      navigation.goBack();
    } else {
      setStep((prev) => prev - 1);
    }
  };
  const handleSubmit = async () => {
    setLoading(true);
    try {
      await apiServiceFacade.post("/api/v1/purchase-orders", {
        inputVolume: parseInt(volumeTons),
        bottlePrice: parseInt(bottlePrice),
        truckingPrice: parseInt(truckPrice),
        bagging: parseInt(bagging),
        posPrice: parseInt(posPrice),
        vendor: vendor,
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
    setBagging();
    setBottlePrice();
    setPosPrice();
    setTruckPrice();
    setVolumeTons();
    setVendor();
    navigation.goBack();
  };
  return (
    // <Modal visible={IsPO} animationType="slide">
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
            {step === 2 ? "Confirm details" : "Create Purchase Order"}
          </Text>
        </View>
      )}
      <View>
        {step === 1 && (
          <Step1PurchaseOrder
            posPrice={posPrice}
            setPosPrice={setPosPrice}
            setBagging={setBagging}
            bagging={bagging}
            truckPrice={truckPrice}
            setTruckPrice={setTruckPrice}
            bottlePrice={bottlePrice}
            setBottlePrice={setBottlePrice}
            volumeTons={volumeTons}
            setVolumeTons={setVolumeTons}
            handleProceed={handleProceed}
            vendors={vendors}
            setVendor={setVendor}
            vendor={vendor}
          />
        )}
        {step === 2 && (
          <ConfirmDetails
            volumeTons={volumeTons}
            posPrice={posPrice}
            bagging={bagging}
            bottlePrice={bottlePrice}
            truckPrice={truckPrice}
            handleSubmit={handleSubmit}
            vendor={vendors.find((data) => data.value == vendor)}
            loading={loading}
          />
        )}
        {step === 3 && (
          <Success doneHandle={reset}>
            Purchase Order has been created successfully
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
export default PurchaseOrder;
