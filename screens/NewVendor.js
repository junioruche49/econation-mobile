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
import Step1VendorForm from "../components/newVendor/forms/Step1VendorForm";
import Step2VendorForm from "../components/newVendor/forms/Step2VendorForm";
import ConfirmDetails from "../components/newVendor/forms/ConfirmDetails";
import { getStatusBarHeight } from "react-native-status-bar-height";
import { ApiServiceFacade } from "../services/apiServiceFacade";
import { API_URL } from "../constants/constant";
import Success from "../components/success/Success";

function NewVendor({ route, navigation }) {
  const [step, setStep] = useState(1);
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [middleName, setMiddleName] = useState();
  const [phoneNumber, setPhoneNumber] = useState();
  const [email, setEmail] = useState();
  const [address, setAddress] = useState();
  const [accountName, setAccountName] = useState();
  const [accountNumber, setAccountNumber] = useState();
  const [bankName, setBankName] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(undefined);
  const apiServiceFacade = new ApiServiceFacade(API_URL);

  const handleProceed = () => {
    setStep((prev) => prev + 1);
  };

  const handleBack = () => {
    if (step === 1) {
      setAddress();
      setEmail();
      setPhoneNumber();
      setMiddleName();
      setLastName();
      setFirstName();
      setBankName();
      setAccountNumber();
      setAccountName();
      navigation.goBack();
      // toggleHandler();
    } else {
      setStep((prev) => prev - 1);
    }
  };
  const handleSubmit = async () => {
    setLoading(true);
    try {
      await apiServiceFacade.post("/api/v1/vendors", {
        firstName: firstName,
        lastName: lastName,
        middleName: middleName,
        email: email,
        phoneNumber: phoneNumber,
        address: address,
        accountName: accountName,
        accountNumber: accountNumber,
        bankName: bankName,
        idCardUrl: "",
      });
      setLoading(false);
      setStep(4);
    } catch (error) {
      setLoading(false);
      setError(error.response?.data?.message);
    }
  };
  const reset = () => {
    setStep(1);
    setAddress();
    setEmail();
    setPhoneNumber();
    setMiddleName();
    setLastName();
    setFirstName();
    setBankName();
    setAccountNumber();
    setAccountName();
    navigation.goBack();
  };
  return (
    // <Modal visible={isNewVendor} animationType="slide">
    <ScrollView style={styles.container}>
      {step !== 4 && (
        <View style={styles.modalHeader}>
          <TouchableOpacity
            onPress={handleBack}
            accessibilityIgnoresInvertColors={true}
            style={styles.modalBackIcon}
          >
            <AntDesign name="left" size={18} color="black" />
          </TouchableOpacity>
          <Text style={styles.modalText}>
            {step === 3 ? "Confirm details" : "Register New Vendor"}
          </Text>
        </View>
      )}
      <View>
        {step === 1 && (
          <Step1VendorForm
            setAddress={setAddress}
            setEmail={setEmail}
            setPhoneNumber={setPhoneNumber}
            setMiddleName={setMiddleName}
            setLastName={setLastName}
            setFirstName={setFirstName}
            address={address}
            email={email}
            phoneNumber={phoneNumber}
            middleName={middleName}
            lastName={lastName}
            firstName={firstName}
            handleProceed={handleProceed}
          />
        )}
        {step === 2 && (
          <Step2VendorForm
            setBankName={setBankName}
            setAccountNumber={setAccountNumber}
            setAccountName={setAccountName}
            bankName={bankName}
            accountNumber={accountNumber}
            accountName={accountName}
            handleProceed={handleProceed}
          />
        )}
        {step === 3 && (
          <ConfirmDetails
            address={address}
            email={email}
            phoneNumber={phoneNumber}
            middleName={middleName}
            lastName={lastName}
            firstName={firstName}
            bankName={bankName}
            accountNumber={accountNumber}
            accountName={accountName}
            handleProceed={handleSubmit}
            loading={loading}
          />
        )}
        {step === 4 && (
          <Success doneHandle={reset}>Successful Vendor Registration</Success>
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
export default NewVendor;
