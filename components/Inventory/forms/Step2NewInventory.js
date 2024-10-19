import React from "react";
import { View, StyleSheet, Text } from "react-native";
import Button from "../../button/Button";
import { Formik } from "formik";
import CustomTextInput from "../../customTextInput/CustomTextInput";

function Step2NewInventory({
  handleProceed,
  bankName,
  accountNumber,
  accountName,
  setBankName,
  setAccountNumber,
  setAccountName,
}) {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Personal Information</Text>
      <Formik
        initialValues={{
          accountName: accountName,
          accountNumber: accountNumber,
          bankName: bankName,
        }}
        enableReinitialize={true}
        onSubmit={(values) => {
          setBankName(values.bankName);
          setAccountNumber(values.accountNumber);
          setAccountName(values.accountName);
          handleProceed();
        }}
      >
        {({ handleChange, handleBlur, handleSubmit, values }) => (
          <View>
            <CustomTextInput
              changeTextHandler={handleChange("accountName")}
              onBlur={handleBlur("accountName")}
              value={values.accountName}
              placeholder={"Account Name"}
            />
            <CustomTextInput
              changeTextHandler={handleChange("accountNumber")}
              onBlur={handleBlur("accountNumber")}
              value={values.accountNumber}
              placeholder={"Account Number"}
            />
            <CustomTextInput
              changeTextHandler={handleChange("bankName")}
              onBlur={handleBlur("bankName")}
              value={values.bankName}
              placeholder={"Bank Name"}
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
export default Step2NewInventory;
