import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  ScrollView,
  StatusBar,
} from "react-native";
import { ApiServiceFacade } from "../services/apiServiceFacade";
import Step1CrushProduction from "../components/crushProduction/forms/Step1CrushProduction";
import Step2CrushProduction from "../components/crushProduction/forms/Step2CrushProduction";
import Step3CrushProduction from "../components/crushProduction/forms/Step3CrushProduction";
import ConfirmDetails from "../components/crushProduction/forms/ConfirmDetails";
import { getStatusBarHeight } from "react-native-status-bar-height";

import { API_URL } from "../constants/constant";
import AntDesign from "@expo/vector-icons/AntDesign";
import Success from "../components/success/Success";

function CrushProduction({ navigation }) {
  const apiServiceFacade = new ApiServiceFacade(API_URL);
  const [step, setStep] = useState(1);
  const [date, setDate] = useState();
  const [shift, setShift] = useState();
  const [startTime, setStartTime] = useState();
  const [endTime, setEndTime] = useState();
  const [breakdownDuration, setBreakdownDuration] = useState();
  const [breakdownReason, setBreakdownReason] = useState();
  const [hoursWorked, setHoursWorked] = useState();
  const [usedRmWeight, setUsedRmWeight] = useState();
  const [producedFlakesWeight, setProducedFlakesWeight] = useState();
  const [waste, setWaste] = useState();
  const [wastePerc, setWastePerc] = useState();
  const [planAdherenceTarget, setPlanAdherenceTarget] = useState();
  const [newBladeHours, setNewBladeHours] = useState();
  const [generatorOnHours, setGeneratorOnHours] = useState();
  const [dieselUsed, setDieselUsed] = useState();
  const [hoursOnGrid, setHoursOnGrid] = useState();
  const [comments, setComments] = useState();
  const [loading, setLoading] = useState(false);

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
      await apiServiceFacade.post("/api/v1/crush-productions", {
        shift: shift,
        startTime: startTime,
        endTime: endTime,
        productionDate: date,
        breakdownDuration: breakdownDuration,
        breakdownReason: breakdownReason,
        hoursWorked: hoursWorked,
        usedRmWeight: parseInt(usedRmWeight),
        producedFlakesWeight: parseInt(producedFlakesWeight),
        waste: parseInt(waste),
        wastePerc: parseInt(wastePerc),
        planAdherenceTarget: parseInt(planAdherenceTarget),
        newBladeHours: parseInt(newBladeHours),
        generatorOnHours: parseInt(generatorOnHours),
        dieselUsed: parseInt(dieselUsed),
        hoursOnGrid: parseInt(hoursOnGrid),
        comments: parseInt(comments),
        // vendor: vendor,
      });
      setLoading(false);
      setStep(5);
    } catch (error) {
      setLoading(false);
      setError(error.response?.data?.message);
    }
  };
  const reset = () => {
    setStep(1);
    // setBagging();
    // setBottlePrice();
    // setPosPrice();
    // setTruckPrice();
    // setVolumeTons();
    // setVendor();
    navigation.goBack();
  };

  return (
    <ScrollView style={styles.container}>
      {step !== 5 && (
        <View style={styles.modalHeader}>
          <TouchableOpacity
            onPress={handleBack}
            accessibilityIgnoresInvertColors={true}
            style={styles.modalBackIcon}
          >
            <AntDesign name="left" size={18} color="black" />
          </TouchableOpacity>
          <Text style={styles.modalText}>
            {step === 3 ? "Confirm details" : "Crush Production Order"}
          </Text>
        </View>
      )}
      <View>
        {step === 1 && (
          <Step1CrushProduction
            setDate={setDate}
            setShift={setShift}
            setStartTime={setStartTime}
            setEndTime={setEndTime}
            setBreakdownDuration={setBreakdownDuration}
            setBreakdownReason={setBreakdownReason}
            date={date}
            shift={shift}
            startTime={startTime}
            endTime={endTime}
            breakdownDuration={breakdownDuration}
            breakdownReason={breakdownReason}
            handleProceed={handleProceed}
          />
        )}
        {step === 2 && (
          <Step2CrushProduction
            usedRmWeight={usedRmWeight}
            producedFlakesWeight={producedFlakesWeight}
            waste={waste}
            wastePerc={wastePerc}
            planAdherenceTarget={planAdherenceTarget}
            setUsedRmWeight={setUsedRmWeight}
            setProducedFlakesWeight={setProducedFlakesWeight}
            setWaste={setWaste}
            setWastePerc={setWastePerc}
            setPlanAdherenceTarget={setPlanAdherenceTarget}
            handleProceed={handleProceed}
          />
        )}
        {step === 3 && (
          <Step3CrushProduction
            newBladeHours={newBladeHours}
            generatorOnHours={generatorOnHours}
            dieselUsed={dieselUsed}
            hoursOnGrid={hoursOnGrid}
            comments={comments}
            setNewBladeHours={setNewBladeHours}
            setGeneratorOnHours={setGeneratorOnHours}
            setDieselUsed={setDieselUsed}
            setHoursOnGrid={setHoursOnGrid}
            setComments={setComments}
            handleProceed={handleProceed}
          />
        )}
        {step === 4 && (
          <ConfirmDetails
            date={date}
            shift={shift}
            waste={waste}
            comments={comments}
            handleSubmit={handleSubmit}
            loading={loading}
          />
        )}
        {step === 5 && (
          <Success doneHandle={reset}>Successful Vendor Registration</Success>
        )}
      </View>
    </ScrollView>
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
export default CrushProduction;
