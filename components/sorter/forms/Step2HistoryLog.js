import React from "react";
import { View, StyleSheet, Text } from "react-native";
import Button from "../../button/Button";
import { Formik } from "formik";
import CustomTextInput from "../../customTextInput/CustomTextInput";
import * as Yup from "yup";

function Step2HistoryLog({
  handleProceed,
  setActualWaste,
  setAmberBottles,
  setGreenBottles,
  setSortedBottles,
  setInputQuantity,
  actualWaste,
  amberBottles,
  greenBottles,
  sortedBottles,
  inputQuantity,
}) {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Input</Text>
      <Formik
        initialValues={{
          actualWaste: actualWaste,
          amberBottles: amberBottles,
          greenBottles: greenBottles,
          sortedBottles: sortedBottles,
          inputQuantity: inputQuantity,
        }}
        enableReinitialize={true}
        validationSchema={Yup.object({
          actualWaste: Yup.number().required("Actual Waste is required"),
          amberBottles: Yup.number().required("Amber Bottles  is required"),
          greenBottles: Yup.number().required("Green Bottles is required"),
          sortedBottles: Yup.number().required("Sorted Bottles  is required"),
          inputQuantity: Yup.number().required("Input Quantity  is required"),
        })}
        onSubmit={(values) => {
          setInputQuantity(values.inputQuantity);
          setSortedBottles(values.sortedBottles);
          setGreenBottles(values.greenBottles);
          setAmberBottles(values.amberBottles);
          setActualWaste(values.actualWaste);
          handleProceed();
        }}
      >
        {({ handleChange, handleBlur, handleSubmit, values }) => (
          <View>
            <CustomTextInput
              changeTextHandler={handleChange("inputQuantity")}
              onBlur={handleBlur("inputQuantity")}
              value={values.inputQuantity}
              placeholder={"Enter Quantity"}
            />
            <Text style={styles.header}>Select Sorters</Text>
            <CustomTextInput
              changeTextHandler={handleChange("sortedBottles")}
              onBlur={handleBlur("sortedBottles")}
              value={values.sortedBottles}
              placeholder={"Sorted Bottles"}
            />
            <CustomTextInput
              changeTextHandler={handleChange("greenBottles")}
              onBlur={handleBlur("greenBottles")}
              value={values.greenBottles}
              placeholder={"Green Bottles"}
            />
            <CustomTextInput
              changeTextHandler={handleChange("amberBottles")}
              onBlur={handleBlur("amberBottles")}
              value={values.amberBottles}
              placeholder={"Amber Bottles"}
            />
            <CustomTextInput
              changeTextHandler={handleChange("actualWaste")}
              onBlur={handleBlur("actualWaste")}
              value={values.actualWaste}
              placeholder={"Actual Waste"}
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
    marginTop: 30,
    marginBottom: 20,
  },
});
export default Step2HistoryLog;
