import React, { useState } from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import CustomTextInput from "../../customTextInput/CustomTextInput";
import { ErrorMessage, Formik } from "formik";
import DateTimePickerModal from "react-native-modal-datetime-picker";

import AntDesign from "@expo/vector-icons/AntDesign";
import Button from "../../button/Button";
import * as Yup from "yup";

function Step1SalesOrder({
  handleProceed,
  soDate,
  dateHandler,
  customerName,
  setCustomerName,
  volumeLoaded,
  setVolumeLoaded,
}) {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    dateHandler(date);
    hideDatePicker();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Create Purchase Order</Text>
      <Formik
        initialValues={{
          //   date: "",
          customerName: customerName,
          volumeLoaded: volumeLoaded,
        }}
        enableReinitialize={true}
        validationSchema={Yup.object({
          customerName: Yup.string()
            .min(4, "Must be 6 characters or less")
            .required("Customer name is required"),
          volumeLoaded: Yup.number().required("Volume is required"),
        })}
        onSubmit={(values) => {
          setCustomerName(values.customerName);
          setVolumeLoaded(values.volumeLoaded);
          handleProceed();
        }}
      >
        {({ handleChange, handleBlur, handleSubmit, values }) => (
          <View>
            <TouchableOpacity
              onPress={showDatePicker}
              style={{ marginBottom: 20 }}
            >
              <View style={styles.uploadBg}>
                <Text style={styles.uploadText}>
                  {soDate.toString() ? soDate.toString() : "Select Date"}
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

            <CustomTextInput
              changeTextHandler={handleChange("customerName")}
              onBlur={handleBlur("customerName")}
              value={values.customerName}
              placeholder={"Customer Name"}
            />
            <Text>
              <ErrorMessage name="customerName" />
            </Text>
            <CustomTextInput
              changeTextHandler={handleChange("volumeLoaded")}
              onBlur={handleBlur("volumeLoaded")}
              value={values.volumeLoaded}
              placeholder={"Volume Loaded"}
              inputMode="decimal"
              keyboardType="decimal-pad"
            />
            <Text>
              <ErrorMessage name="volumeLoaded" />
            </Text>
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
    marginTop: 30,
    marginBottom: 20,
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
});
export default Step1SalesOrder;
