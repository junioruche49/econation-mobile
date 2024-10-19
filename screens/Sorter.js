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
import Step1HistoryLog from "../components/sorter/forms/Step1HistoryLog";
import Step2HistoryLog from "../components/sorter/forms/Step2HistoryLog";
import { getStatusBarHeight } from "react-native-status-bar-height";
import ConfirmDetails from "../components/sorter/forms/ConfirmDetails";
import useClientCommand from "../hooks/useClientCommand";
import Success from "../components/success/Success";
import { ApiServiceFacade } from "../services/apiServiceFacade";
import { API_URL } from "../constants/constant";

function Sorter({ navigation }) {
  const apiServiceFacade = new ApiServiceFacade(API_URL);

  const [step, setStep] = useState(1);
  const [sortingDate, setSortingDate] = useState(new Date());
  const [inputQuantity, setInputQuantity] = useState();
  const [sortedBottles, setSortedBottles] = useState();
  const [greenBottles, setGreenBottles] = useState();
  const [amberBottles, setAmberBottles] = useState();
  const [actualWaste, setActualWaste] = useState();
  const [loading, setLoading] = useState(false);

  const [selectedSorter, setSelectedSorter] = useState([{ id: "" }]);
  const handleProceed = () => {
    setStep((prev) => prev + 1);
  };

  const handleBack = () => {
    if (step === 1) {
      navigation.goBack();
    } else {
      setStep((prev) => prev - 1);
    }
  };
  const { data, error } = useClientCommand("/api/v1/sorters");

  const sorters = data.map((sorter) => {
    return {
      label: sorter.firstName + " " + sorter.lastName,
      value: sorter.id,
    };
  });
  const handleSubmit = async () => {
    setLoading(true);
    try {
      await apiServiceFacade.post("/api/v1/sorting-operations", {
        sortingDate: sortingDate,
        inputQuantity: parseInt(inputQuantity),
        sortedBottles: parseInt(sortedBottles),
        greenBottles: parseInt(greenBottles),
        amberBottles: parseInt(amberBottles),
        actualWaste: parseInt(actualWaste),
        sorters: selectedSorter,
      });
      setLoading(false);
      setStep(4);
    } catch (error) {
      console.log("error", error);
      setLoading(false);
      setError(error.response?.data?.message);
    }
  };
  const reset = () => {
    setStep(1);
    setActualWaste();
    setAmberBottles();
    setGreenBottles();
    setSortedBottles();
    setInputQuantity();
    setSortingDate(new Date());
    setSelectedSorter([{ id: "" }]);
    navigation.goBack();
  };

  return (
    // <Modal visible={isHistoryLog} animationType="slide">
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
            {step === 3 ? "Confirm details" : " New Sorting operation"}
          </Text>
        </View>
      )}
      <View>
        {step === 1 && (
          <Step1HistoryLog
            allSorters={selectedSorter}
            setAllSorters={setSelectedSorter}
            sorters={sorters}
            sortingDate={sortingDate}
            setSortingDate={setSortingDate}
            handleProceed={handleProceed}
          />
        )}
        {step === 2 && (
          <Step2HistoryLog
            setActualWaste={setActualWaste}
            setAmberBottles={setAmberBottles}
            setGreenBottles={setGreenBottles}
            setSortedBottles={setSortedBottles}
            setInputQuantity={setInputQuantity}
            actualWaste={actualWaste}
            amberBottles={amberBottles}
            greenBottles={greenBottles}
            sortedBottles={sortedBottles}
            inputQuantity={inputQuantity}
            handleProceed={handleProceed}
          />
        )}
        {step === 3 && (
          <ConfirmDetails
            actualWaste={actualWaste}
            amberBottles={amberBottles}
            greenBottles={greenBottles}
            sortedBottles={sortedBottles}
            inputQuantity={inputQuantity}
            allSorters={selectedSorter}
            sorters={sorters}
            loading={loading}
            handleSubmit={handleSubmit}
          />
        )}
        {step === 4 && (
          <Success doneHandle={reset}>
            Your Sorting Operation has been submitted successfully
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
export default Sorter;
