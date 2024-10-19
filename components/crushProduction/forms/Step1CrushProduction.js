import { Formik } from "formik";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { useState } from "react";
import Button from "../../button/Button";
import CustomTextInput from "../../customTextInput/CustomTextInput";
import DropDownPicker from "react-native-dropdown-picker";
import AntDesign from "@expo/vector-icons/AntDesign";
import DateTimePickerModal from "react-native-modal-datetime-picker";

function Step1CrushProduction({
  setDate,
  setShift,
  setStartTime,
  setEndTime,
  setBreakdownDuration,
  setBreakdownReason,
  date,
  shift,
  startTime,
  endTime,
  breakdownDuration,
  breakdownReason,
  handleProceed,
}) {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isTimePickerVisible, setTimePickerVisibility] = useState(false);
  const [isEndTimePickerVisible, setEndTimePickerVisibility] = useState(false);

  const [open, setOpen] = useState(false);
  const [items, setItems] = useState([
    {
      label: "Morning",
      value: "morning",
    },
    {
      label: "Afternoon",
      value: "afternoon",
    },
    {
      label: "night",
      value: "night",
    },
  ]);

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
  const showTimePicker = () => {
    setTimePickerVisibility(true);
  };

  const hideTimePicker = () => {
    setTimePickerVisibility(false);
  };

  const handleTimeConfirm = (date) => {
    setStartTime(date);
    hideTimePicker();
  };
  const showEndTimePicker = () => {
    setEndTimePickerVisibility(true);
  };

  const hideEndTimePicker = () => {
    setEndTimePickerVisibility(false);
  };

  const handleEndTimeConfirm = (date) => {
    setEndTime(date);
    hideEndTimePicker();
  };

  const selectShift = (value) => {
    setShift(value);
  };
  return (
    <View style={styles.container}>
      <Formik
        initialValues={{
          breakdownDuration: breakdownDuration,
          breakdownReason: breakdownReason,
        }}
        enableReinitialize={true}
        onSubmit={(values) => {
          setBreakdownDuration(values.breakdownDuration);
          setBreakdownReason(values.breakdownReason);
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
            <Text style={styles.header}>Shift Type</Text>
            <DropDownPicker
              open={open}
              value={shift}
              items={items}
              setOpen={setOpen}
              setValue={selectShift}
              setItems={setItems}
              style={styles.select}
            />
            <Text style={styles.header}>Start Time</Text>
            <TouchableOpacity
              style={{ marginBottom: 20 }}
              onPress={showTimePicker}
            >
              <View style={styles.uploadBg}>
                <Text style={styles.uploadText}>
                  {startTime?.toString()
                    ? startTime?.toString()
                    : "Select Time"}
                </Text>
                <AntDesign name="calendar" size={18} color="#8391A1" />
              </View>
            </TouchableOpacity>

            <DateTimePickerModal
              isVisible={isTimePickerVisible}
              mode="time"
              onConfirm={handleTimeConfirm}
              onCancel={hideTimePicker}
            />
            <Text style={styles.header}>End Time</Text>
            <TouchableOpacity
              style={{ marginBottom: 20 }}
              onPress={showEndTimePicker}
            >
              <View style={styles.uploadBg}>
                <Text style={styles.uploadText}>
                  {endTime?.toString() ? endTime?.toString() : "Select Time"}
                </Text>
                <AntDesign name="calendar" size={18} color="#8391A1" />
              </View>
            </TouchableOpacity>

            <DateTimePickerModal
              isVisible={isEndTimePickerVisible}
              mode="time"
              onConfirm={handleEndTimeConfirm}
              onCancel={hideEndTimePicker}
            />

            <CustomTextInput
              changeTextHandler={handleChange("breakdownDuration")}
              onBlur={handleBlur("breakdownDuration")}
              value={values.breakdownDuration}
              placeholder={"Breakdown Duration"}
            />
            <CustomTextInput
              changeTextHandler={handleChange("breakdownReason")}
              onBlur={handleBlur("breakdownReason")}
              value={values.breakdownReason}
              placeholder={"Breakdown Reason"}
            />

            <Button press={handleSubmit}>Proceed</Button>
          </View>
        )}
      </Formik>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
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
export default Step1CrushProduction;
