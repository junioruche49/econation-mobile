import React from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import CustomTextInput from "../../customTextInput/CustomTextInput";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import Button from "../../button/Button";
import { Formik } from "formik";

function Step2HotWashProduction({
  setFirstBagLoadedAt,
  setColdWashFlakes,
  setHotWashedFlakes,
  setFloaters,
  setColor,
  setLabels,
  setFines,
  setPsRejects,
  setAmi,
  setWaste,
  setComments,
  firstBagLoadedAt,
  coldWashFlakes,
  hotWashedFlakes,
  floaters,
  color,
  labels,
  fines,
  psRejects,
  ami,
  waste,
  comments,
  handleProceed,
}) {
  return (
    <View style={styles.container}>
      <Formik
        initialValues={{
          firstBagLoadedAt: firstBagLoadedAt,
          coldWashFlakes: coldWashFlakes,
          hotWashedFlakes: hotWashedFlakes,
          floaters: floaters,
          color: color,
          labels: labels,
          fines: fines,
          psRejects: psRejects,
          ami: ami,
          waste: waste,
          comments: comments,
        }}
        enableReinitialize={true}
        onSubmit={(values) => {
          setFirstBagLoadedAt(values.firstBagLoadedAt);
          setColdWashFlakes(values.coldWashFlakes);
          setHotWashedFlakes(values.hotWashedFlakes);
          setFloaters(values.floaters);
          setColor(values.color);
          setLabels(values.labels);
          setFines(values.fines);
          setPsRejects(values.psRejects);
          setAmi(values.ami);
          setWaste(values.waste);
          setComments(values.comments);
          handleProceed();
        }}
      >
        {({ handleChange, handleBlur, handleSubmit, values }) => (
          <View>
            <Text style={styles.header}>Time First bag loaded</Text>
            <CustomTextInput
              changeTextHandler={handleChange("firstBagLoadedAt")}
              onBlur={handleBlur("firstBagLoadedAt")}
              value={values.firstBagLoadedAt}
              placeholder={"Select Time"}
            />
            <Text style={styles.header}>Cold washed flakes (KG)</Text>
            <CustomTextInput
              changeTextHandler={handleChange("coldWashFlakes")}
              onBlur={handleBlur("coldWashFlakes")}
              value={values.coldWashFlakes}
              placeholder={"Enter Cold washed flakes (kg)"}
            />
            <Text style={styles.header}>Hot washed flakes (KG)</Text>
            <CustomTextInput
              changeTextHandler={handleChange("hotWashedFlakes")}
              onBlur={handleBlur("hotWashedFlakes")}
              value={values.hotWashedFlakes}
              placeholder={"Enter Hot washed flakes (kg)"}
            />
            <Text style={styles.header}>Floaters (KG)</Text>
            <CustomTextInput
              changeTextHandler={handleChange("floaters")}
              onBlur={handleBlur("floaters")}
              value={values.floaters}
              placeholder={"Enter Floaters (kg)"}
            />
            <Text style={styles.header}>Labels (KG)</Text>
            <CustomTextInput
              changeTextHandler={handleChange("labels")}
              onBlur={handleBlur("labels")}
              value={values.labels}
              placeholder={"Enter Labels (kg)"}
            />
            <Text style={styles.header}>Fines (KG)</Text>
            <CustomTextInput
              changeTextHandler={handleChange("fines")}
              onBlur={handleBlur("fines")}
              value={values.fines}
              placeholder={"Enter Fines (kg)"}
            />
            <Text style={styles.header}>Colours (KG)</Text>
            <CustomTextInput
              changeTextHandler={handleChange("color")}
              onBlur={handleBlur("color")}
              value={values.color}
              placeholder={"Enter Colours (kg)"}
            />
            <Text style={styles.header}>PS Rejects (KG)</Text>
            <CustomTextInput
              changeTextHandler={handleChange("psRejects")}
              onBlur={handleBlur("psRejects")}
              value={values.psRejects}
              placeholder={"Enter Rejects (kg)"}
            />
            <Text style={styles.header}>AMI (KG)</Text>
            <CustomTextInput
              changeTextHandler={handleChange("ami")}
              onBlur={handleBlur("ami")}
              value={values.ami}
              placeholder={"Enter Rejects (kg)"}
            />
            <Text style={styles.header}>Waste (KG)</Text>
            <CustomTextInput
              changeTextHandler={handleChange("waste")}
              onBlur={handleBlur("waste")}
              value={values.waste}
              placeholder={"Enter Waste (kg)"}
            />
            <Text style={styles.header}>Comments</Text>
            <CustomTextInput
              changeTextHandler={handleChange("comments")}
              onBlur={handleBlur("comments")}
              value={values.comments}
              placeholder={"Comments"}
            />

            <Button press={handleSubmit}>Proceed</Button>
          </View>
        )}
      </Formik>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    marginBottom: 80,
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
export default Step2HotWashProduction;
