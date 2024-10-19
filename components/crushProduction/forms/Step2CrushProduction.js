import { Formik } from "formik";
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import * as Yup from "yup";
import CustomTextInput from "../../customTextInput/CustomTextInput";
import Button from "../../button/Button";

function Step2CrushProduction({
  usedRmWeight,
  producedFlakesWeight,
  waste,
  wastePerc,
  planAdherenceTarget,
  setUsedRmWeight,
  setProducedFlakesWeight,
  setWaste,
  setWastePerc,
  setPlanAdherenceTarget,
  handleProceed,
}) {
  return (
    <View style={styles.container}>
      <Formik
        initialValues={{
          waste: waste,
          wastePerc: wastePerc,
          planAdherenceTarget: planAdherenceTarget,
          producedFlakesWeight: producedFlakesWeight,
          usedRmWeight: usedRmWeight,
        }}
        enableReinitialize={true}
        validationSchema={Yup.object({
          usedRmWeight: Yup.number().required("Volume ton is required"),
          producedFlakesWeight: Yup.number().required(
            "Bottle price is required"
          ),
          planAdherenceTarget: Yup.number().required("Truck price is required"),
          wastePerc: Yup.number().required("Bagging  is required"),
          waste: Yup.number().required("POS price  is required"),
        })}
        onSubmit={(values) => {
          setUsedRmWeight(values.usedRmWeight);
          setProducedFlakesWeight(values.producedFlakesWeight);
          setWaste(values.waste);
          setWastePerc(values.wastePerc);
          setPlanAdherenceTarget(values.planAdherenceTarget);
          handleProceed();
        }}
      >
        {({ handleChange, handleBlur, handleSubmit, values }) => (
          <View>
            <Text style={styles.header}>Weight of RM used (KG)</Text>
            <CustomTextInput
              changeTextHandler={handleChange("usedRmWeight")}
              onBlur={handleBlur("usedRmWeight")}
              value={values.usedRmWeight}
              placeholder={"Enter weight of Raw Materials used"}
            />
            <Text style={styles.header}>Weight of Flakes Produced (KG)</Text>
            <CustomTextInput
              changeTextHandler={handleChange("producedFlakesWeight")}
              onBlur={handleBlur("producedFlakesWeight")}
              value={values.producedFlakesWeight}
              placeholder={"Enter weight of Raw Materials used"}
            />
            <Text style={styles.header}>Waste (KG)</Text>
            <CustomTextInput
              changeTextHandler={handleChange("waste")}
              onBlur={handleBlur("waste")}
              value={values.waste}
              placeholder={"Enter waste (KG)"}
            />
            <Text style={styles.header}>Waste (%)</Text>
            <CustomTextInput
              changeTextHandler={handleChange("wastePerc")}
              onBlur={handleBlur("wastePerc")}
              value={values.wastePerc}
              placeholder={"Calculated waste"}
            />
            <Text style={styles.header}>Planned Adherence vs Target (%)</Text>
            <CustomTextInput
              changeTextHandler={handleChange("planAdherenceTarget")}
              onBlur={handleBlur("planAdherenceTarget")}
              value={values.planAdherenceTarget}
              placeholder={"Calculated figure"}
            />
            <Button press={handleSubmit}>Proceed</Button>
          </View>
        )}
      </Formik>
    </View>
  );
}

const styles = StyleSheet.create({
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
export default Step2CrushProduction;
