import React from "react";
import { View, StyleSheet, Text } from "react-native";
import * as Yup from "yup";
import CustomTextInput from "../../customTextInput/CustomTextInput";
import Button from "../../button/Button";
import { Formik } from "formik";

function Step3CrushProduction({
  newBladeHours,
  generatorOnHours,
  dieselUsed,
  hoursOnGrid,
  comments,
  setNewBladeHours,
  setGeneratorOnHours,
  setDieselUsed,
  setHoursOnGrid,
  setComments,
  handleProceed,
}) {
  return (
    <View style={styles.container}>
      <Formik
        initialValues={{
          newBladeHours: newBladeHours,
          generatorOnHours: generatorOnHours,
          dieselUsed: dieselUsed,
          hoursOnGrid: hoursOnGrid,
          comments: comments,
        }}
        enableReinitialize={true}
        validationSchema={Yup.object({
          newBladeHours: Yup.number().required("New blade is required"),
          generatorOnHours: Yup.number().required(
            "Generator hour  is required"
          ),
          dieselUsed: Yup.number().required("Diesel used is required"),
          hoursOnGrid: Yup.number().required("Hours on grid  is required"),
          comments: Yup.string(),
        })}
        onSubmit={(values) => {
          setNewBladeHours(values.newBladeHours);
          setGeneratorOnHours(values.generatorOnHours);
          setDieselUsed(values.dieselUsed);
          setHoursOnGrid(values.hoursOnGrid);
          setComments(values.comments);
          handleProceed();
        }}
      >
        {({ handleChange, handleBlur, handleSubmit, values }) => (
          <View>
            <Text style={styles.header}>Number of new blades</Text>
            <CustomTextInput
              changeTextHandler={handleChange("newBladeHours")}
              onBlur={handleBlur("newBladeHours")}
              value={values.newBladeHours}
              placeholder={"Enter number of new blades"}
            />
            <Text style={styles.header}>Generator ON hours</Text>
            <CustomTextInput
              changeTextHandler={handleChange("generatorOnHours")}
              onBlur={handleBlur("generatorOnHours")}
              value={values.generatorOnHours}
              placeholder={"Enter number of hours ON generator"}
            />
            <Text style={styles.header}>Volume of Diesel used (Ltrs)</Text>
            <CustomTextInput
              changeTextHandler={handleChange("dieselUsed")}
              onBlur={handleBlur("dieselUsed")}
              value={values.dieselUsed}
              placeholder={"Enter volume used"}
            />
            <Text style={styles.header}>Hours on Grid</Text>
            <CustomTextInput
              changeTextHandler={handleChange("hoursOnGrid")}
              onBlur={handleBlur("hoursOnGrid")}
              value={values.hoursOnGrid}
              placeholder={"Enter hours on grid"}
            />
            <Text style={styles.header}>Note</Text>
            <CustomTextInput
              changeTextHandler={handleChange("comments")}
              onBlur={handleBlur("comments")}
              value={values.comments}
              placeholder={"Note"}
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
export default Step3CrushProduction;
