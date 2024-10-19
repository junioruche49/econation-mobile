import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  Platform,
  StatusBar,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { getStatusBarHeight } from "react-native-status-bar-height";
import AntDesign from "@expo/vector-icons/AntDesign";
import { ApiServiceFacade } from "../services/apiServiceFacade";
import { API_URL } from "../constants/constant";
import Success from "../components/success/Success";
import Step1HotWashProduction from "../components/hotWashProduction/forms/Step1HotWashProduction";
import Step2HotWashProduction from "../components/hotWashProduction/forms/Step2HotWashProduction";
import ConfirmDetails from "../components/hotWashProduction/forms/ConfirmDetails";

function HotWashProduction({ navigation }) {
  const [date, setDate] = useState();
  const [plannedOperatingHours, setPlannedOperatingHours] = useState();
  const [plannedDowntimeHours, setPlannedDowntimeHours] = useState();
  const [plannedRunningHours, setPlannedRunningHours] = useState();
  const [actualRunningHours, setActualRunningHours] = useState();
  const [actualDowntimeHours, setActualDowntimeHours] = useState();
  const [firstBagLoadedAt, setFirstBagLoadedAt] = useState();
  const [coldWashFlakes, setColdWashFlakes] = useState();
  const [hotWashedFlakes, setHotWashedFlakes] = useState();
  const [floaters, setFloaters] = useState();
  const [color, setColor] = useState();
  const [labels, setLabels] = useState();
  const [fines, setFines] = useState();
  const [psRejects, setPsRejects] = useState();
  const [ami, setAmi] = useState();
  const [waste, setWaste] = useState();
  const [comments, setComments] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(undefined);
  const [step, setStep] = useState(1);

  const apiServiceFacade = new ApiServiceFacade(API_URL);
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
  const handleSubmit = async () => {
    setLoading(true);
    try {
      const response = await apiServiceFacade.post(
        "/api/v1/hot-wash-production",
        {
          productionDate: date,
          plannedOperatingHours: plannedOperatingHours,
          plannedDowntimeHours: plannedDowntimeHours,
          plannedRunningHours: plannedRunningHours,
          actualRunningHours: actualRunningHours,
          actualDowntimeHours: actualDowntimeHours,
          firstBagLoadedAt: firstBagLoadedAt,
          coldWashFlakes: parseInt(coldWashFlakes),
          hotWashedFlakes: parseInt(hotWashedFlakes),
          floaters: parseInt(floaters),
          color: parseInt(color),
          labels: parseInt(labels),
          fines: parseInt(fines),
          psRejects: parseInt(psRejects),
          ami: parseInt(ami),
          waste: parseInt(waste),
          comments: comments,
        }
      );
      setLoading(false);
      setStep(4);
    } catch (error) {
      setLoading(false);
      setError(error.response?.data?.message);
    }
  };
  const reset = () => {
    setStep(1);
    navigation.goBack();
  };
  return (
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
            {step === 3 ? "Confirm details" : "Register New Sorter"}
          </Text>
        </View>
      )}
      <View>
        {step === 1 && (
          <Step1HotWashProduction
            setDate={setDate}
            setPlannedOperatingHours={setPlannedOperatingHours}
            setPlannedDowntimeHours={setPlannedDowntimeHours}
            setPlannedRunningHours={setPlannedRunningHours}
            setActualRunningHours={setActualRunningHours}
            setActualDowntimeHours={setActualDowntimeHours}
            date={date}
            plannedOperatingHours={plannedOperatingHours}
            plannedDowntimeHours={plannedDowntimeHours}
            plannedRunningHours={plannedRunningHours}
            actualRunningHours={actualRunningHours}
            actualDowntimeHours={actualDowntimeHours}
            handleProceed={handleProceed}
          />
        )}
        {step === 2 && (
          <Step2HotWashProduction
            firstBagLoadedAt={firstBagLoadedAt}
            coldWashFlakes={coldWashFlakes}
            hotWashedFlakes={hotWashedFlakes}
            floaters={floaters}
            color={color}
            labels={labels}
            fines={fines}
            psRejects={psRejects}
            ami={ami}
            waste={waste}
            comments={comments}
            setFirstBagLoadedAt={setFirstBagLoadedAt}
            setColdWashFlakes={setColdWashFlakes}
            setHotWashedFlakes={setHotWashedFlakes}
            setFloaters={setFloaters}
            setColor={setColor}
            setLabels={setLabels}
            setFines={setFines}
            setPsRejects={setPsRejects}
            setAmi={setAmi}
            setWaste={setWaste}
            setComments={setComments}
            handleProceed={handleProceed}
          />
        )}
        {step === 3 && (
          <ConfirmDetails
            date={date}
            coldWashFlakes={coldWashFlakes}
            hotWashedFlakes={hotWashedFlakes}
            waste={waste}
            comments={comments}
            handleProceed={handleSubmit}
            loading={loading}
          />
        )}
        {step === 4 && (
          <Success doneHandle={reset}>Successful Vendor Registration</Success>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexGrow: 1,
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
export default HotWashProduction;
