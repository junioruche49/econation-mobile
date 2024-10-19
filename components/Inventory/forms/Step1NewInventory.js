import { useState } from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import Button from "../../button/Button";
import { Formik } from "formik";
import CustomTextInput from "../../customTextInput/CustomTextInput";
import Feather from "@expo/vector-icons/Feather";
import * as ImagePicker from "expo-image-picker";

function Step1NewInventory({
  handleProceed,
  address,
  email,
  phoneNumber,
  middleName,
  lastName,
  firstName,
  setAddress,
  setEmail,
  setPhoneNumber,
  setMiddleName,
  setLastName,
  setFirstName,
  setIdCardFile,
  idCardFile,
}) {
  const [image, setImage] = useState();

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      console.log("result.assets[0].uri", result.assets[0]);
      setIdCardFile(result.assets[0].uri);
    }
  };
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Personal Information</Text>
      <Formik
        initialValues={{
          firstName: firstName,
          lastName: lastName,
          middleName: middleName,
          phoneNumber: phoneNumber,
          email: email,
          address: address,
        }}
        enableReinitialize={true}
        onSubmit={(values) => {
          setAddress(values.address);
          setEmail(values.email);
          setPhoneNumber(values.phoneNumber);
          setMiddleName(values.middleName);
          setLastName(values.lastName);
          setFirstName(values.firstName);
          handleProceed();
        }}
      >
        {({ handleChange, handleBlur, handleSubmit, values }) => (
          <View>
            <CustomTextInput
              changeTextHandler={handleChange("firstName")}
              onBlur={handleBlur("firstName")}
              value={values.firstName}
              placeholder={"First Name"}
            />
            <CustomTextInput
              changeTextHandler={handleChange("lastName")}
              onBlur={handleBlur("lastName")}
              value={values.lastName}
              placeholder={"Last Name"}
            />
            <CustomTextInput
              changeTextHandler={handleChange("middleName")}
              onBlur={handleBlur("middleName")}
              value={values.middleName}
              placeholder={"Middle Name"}
            />
            <CustomTextInput
              changeTextHandler={handleChange("phoneNumber")}
              onBlur={handleBlur("phoneNumber")}
              value={values.phoneNumber}
              placeholder={"Phone Number"}
            />
            <CustomTextInput
              changeTextHandler={handleChange("email")}
              onBlur={handleBlur("email")}
              value={values.email}
              placeholder={"Email Address"}
            />
            <CustomTextInput
              changeTextHandler={handleChange("address")}
              onBlur={handleBlur("address")}
              value={values.address}
              placeholder={"Address"}
            />
            <Text style={styles.header}>Personal Information</Text>
            <TouchableOpacity onPress={pickImage}>
              <View style={styles.uploadBg}>
                <Text style={styles.uploadText}>
                  {idCardFile ? "File" : "Upload ID Card"}
                </Text>
                <Feather name="upload" size={18} color="#8391A1" />
              </View>
            </TouchableOpacity>
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
export default Step1NewInventory;
