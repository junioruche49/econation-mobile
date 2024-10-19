import { Formik } from "formik";
import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  KeyboardAvoidingView,
} from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import CustomTextInput from "../../customTextInput/CustomTextInput";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import Button from "../../button/Button";

function Step1HotWashProduction({
  setDate,
  setPlannedOperatingHours,
  setPlannedDowntimeHours,
  setPlannedRunningHours,
  setActualRunningHours,
  setActualDowntimeHours,
  date,
  plannedOperatingHours,
  plannedDowntimeHours,
  plannedRunningHours,
  actualRunningHours,
  actualDowntimeHours,
  handleProceed,
}) {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    setDate(date);
    hideDatePicker();
  };

  return (
    <KeyboardAvoidingView style={styles.container}>
      <Formik
        initialValues={{
          plannedOperatingHours: plannedOperatingHours,
          plannedDowntimeHours: plannedDowntimeHours,
          plannedRunningHours: plannedRunningHours,
          actualRunningHours: actualRunningHours,
          actualDowntimeHours: actualDowntimeHours,
        }}
        enableReinitialize={true}
        onSubmit={(values) => {
          setPlannedOperatingHours(values.plannedOperatingHours);
          setPlannedDowntimeHours(values.plannedDowntimeHours);
          setPlannedRunningHours(values.plannedRunningHours);
          setActualRunningHours(values.actualRunningHours);
          setActualDowntimeHours(values.actualDowntimeHours);
          handleProceed();
        }}
      >
        {({ handleChange, handleBlur, handleSubmit, values }) => (
          <View>
            <Text style={styles.header}>Date</Text>
            <TouchableOpacity
              style={{ marginBottom: 20 }}
              onPress={showDatePicker}
            >
              <View style={styles.uploadBg}>
                <Text style={styles.uploadText}>
                  {date?.toString() ? date?.toString() : "Select Date"}
                </Text>
                <AntDesign name="calendar" size={18} color="#8391A1" />
              </View>
            </TouchableOpacity>

            <DateTimePickerModal
              isVisible={isDatePickerVisible}
              mode="date"
              onConfirm={handleConfirm}
              onCancel={hideDatePicker}
            />
            <Text style={styles.header}>Planned Operating Hours</Text>
            <CustomTextInput
              changeTextHandler={handleChange("plannedOperatingHours")}
              onBlur={handleBlur("plannedOperatingHours")}
              value={values.plannedOperatingHours}
              placeholder={"Enter planned operating hours"}
            />
            <Text style={styles.header}>Planned Downtime Hours</Text>
            <CustomTextInput
              changeTextHandler={handleChange("plannedDowntimeHours")}
              onBlur={handleBlur("plannedDowntimeHours")}
              value={values.plannedDowntimeHours}
              placeholder={"Enter planned downtime hours"}
            />
            <Text style={styles.header}>Planned Running Hours</Text>
            <CustomTextInput
              changeTextHandler={handleChange("plannedRunningHours")}
              onBlur={handleBlur("plannedRunningHours")}
              value={values.plannedRunningHours}
              placeholder={"Enter planned running hours"}
            />
            <Text style={styles.header}>Actual Downtime Hours</Text>
            <CustomTextInput
              changeTextHandler={handleChange("actualRunningHours")}
              onBlur={handleBlur("actualRunningHours")}
              value={values.actualRunningHours}
              placeholder={"Enter actual downtime hours"}
            />
            <Text style={styles.header}>Actual Running Hours</Text>
            <CustomTextInput
              changeTextHandler={handleChange("actualDowntimeHours")}
              onBlur={handleBlur("actualDowntimeHours")}
              value={values.actualDowntimeHours}
              placeholder={"Enter actual downtime hours"}
            />

            <Button press={handleSubmit}>Proceed</Button>
          </View>
        )}
      </Formik>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    // marginBottom: 20,
    // paddingBottom: 20,
  },
  header: {
    fontSize: 10,
    fontWeight: "500",
    marginTop: 10,
    marginBottom: 5,
  },
  uploadBg: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderColor: "#E8ECF4",
    borderWidth: 1,
    paddingVertical: 15,
    paddingHorizontal: 25,
    backgroundColor: "#F7F8F9",
    borderRadius: 8,
  },
  uploadText: {
    fontSize: 15,
    color: "#8391A1",
  },
  seeAll: {
    flexDirection: "row",
    justifyContent: "center",
  },
  seeAllText: {
    color: "#89C540",
  },
  select: {
    zIndex: 100,
  },
});
export default Step1HotWashProduction;
