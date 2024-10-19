import { Formik } from "formik";
import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import CustomTextInput from "../../customTextInput/CustomTextInput";
import Button from "../../button/Button";
import Feather from "@expo/vector-icons/Feather";
import DropDownPicker from "react-native-dropdown-picker";
import * as Yup from "yup";

function Step1PurchaseOrder({
  handleProceed,
  posPrice,
  setPosPrice,
  setBagging,
  bagging,
  truckPrice,
  setTruckPrice,
  bottlePrice,
  setBottlePrice,
  volumeTons,
  setVolumeTons,
  vendors,
  vendor,
  setVendor,
}) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([]);

  const selectVendor = (data) => {
    setVendor(data);
  };

  useEffect(() => {
    setItems(vendors);
  }, [vendors]);

  console.log("vendors", vendors);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Create Purchase Order</Text>
      <Formik
        initialValues={{
          volumeTons: volumeTons,
          bottlePrice: bottlePrice,
          truckPrice: truckPrice,
          bagging: bagging,
          posPrice: posPrice,
        }}
        enableReinitialize={true}
        validationSchema={Yup.object({
          volumeTons: Yup.number().required("Volume ton is required"),
          bottlePrice: Yup.number().required("Bottle price is required"),
          truckPrice: Yup.number().required("Truck price is required"),
          bagging: Yup.number().required("Bagging  is required"),
          posPrice: Yup.number().required("POS price  is required"),
        })}
        onSubmit={(values) => {
          setBagging(values.bagging);
          setBottlePrice(values.bottlePrice);
          setPosPrice(values.posPrice);
          setVolumeTons(values.volumeTons);
          setTruckPrice(values.truckPrice);
          handleProceed();
        }}
      >
        {({ handleChange, handleBlur, handleSubmit, values }) => (
          <View>
            <DropDownPicker
              open={open}
              value={vendor}
              items={items}
              setOpen={setOpen}
              setValue={selectVendor}
              setItems={setItems}
              style={styles.select}
            />
            <CustomTextInput
              changeTextHandler={handleChange("volumeTons")}
              onBlur={handleBlur("volumeTons")}
              value={values.volumeTons}
              placeholder={"Input Volume (Tons)"}
            />
            <CustomTextInput
              changeTextHandler={handleChange("bottlePrice")}
              onBlur={handleBlur("bottlePrice")}
              value={values.bottlePrice}
              placeholder={"Bottle Price (N)"}
            />
            <CustomTextInput
              changeTextHandler={handleChange("truckPrice")}
              onBlur={handleBlur("truckPrice")}
              value={values.truckPrice}
              placeholder={"Truck Price"}
            />
            <CustomTextInput
              changeTextHandler={handleChange("bagging")}
              onBlur={handleBlur("bagging")}
              value={values.bagging}
              placeholder={"Bagging"}
            />
            <CustomTextInput
              changeTextHandler={handleChange("posPrice")}
              onBlur={handleBlur("posPrice")}
              value={values.posPrice}
              placeholder={"POS Price"}
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
  select: {
    borderColor: "#E8ECF4",
    borderWidth: 1,
    backgroundColor: "#F7F8F9",
    borderRadius: 8,
    marginBottom: 20,
    color: "#8391A1",
  },
});
export default Step1PurchaseOrder;
