import { useEffect, useState } from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import Button from "../../button/Button";
import { Formik } from "formik";
import AntDesign from "@expo/vector-icons/AntDesign";
import DropDownPicker from "react-native-dropdown-picker";
import DateTimePickerModal from "react-native-modal-datetime-picker";

function Step1HistoryLog({
  handleProceed,
  sorters,
  allSorters,
  setAllSorters,
  sortingDate,
  setSortingDate,
}) {
  const [open, setOpen] = useState();
  const [items, setItems] = useState([]);

  const changeSorterHandler = (val, index) => {
    if (allSorters.find((sorter) => sorter.id === val.value)) {
      setOpen(undefined);

      return;
    }
    setOpen(undefined);
    let newSorterValue = [...allSorters];
    newSorterValue[index] = { id: val.value };
    setAllSorters(newSorterValue);
  };

  useEffect(() => {
    setItems(sorters);
  }, [sorters]);

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    setSortingDate(date);
    hideDatePicker();
  };

  const addNewSorter = () => {
    setAllSorters((prev) => [...prev, { id: "" }]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Personal Information</Text>
      <Formik
        initialValues={{ email: "" }}
        onSubmit={(values) => {
          handleProceed();
        }}
      >
        {({ handleChange, handleBlur, handleSubmit, values }) => (
          <View>
            <TouchableOpacity
              style={{ marginBottom: 20 }}
              onPress={showDatePicker}
            >
              <View style={styles.uploadBg}>
                <Text style={styles.uploadText}>
                  {sortingDate.toString()
                    ? sortingDate.toString()
                    : "Select Date"}
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
            <Text style={styles.header}>Select Sorters</Text>
            <View style={{ display: "flex", gap: 20, zIndex: 100 }}>
              {allSorters.map((sorter, index) => {
                return (
                  <DropDownPicker
                    key={index}
                    open={open === index}
                    value={sorter.id}
                    items={items}
                    onPress={() => setOpen(index)}
                    onSelectItem={(value) => changeSorterHandler(value, index)}
                    setItems={setItems}
                    containerStyle={{ zIndex: 100 }}
                    labelStyle={{ zIndex: 100 }}
                    style={{ zIndex: 100 }}
                    textStyle={{ zIndex: 100 }}
                  />
                );
              })}
            </View>

            <View style={styles.seeAll}>
              <TouchableOpacity onPress={addNewSorter}>
                <Text style={styles.seeAllText}>Add New</Text>
              </TouchableOpacity>
            </View>
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
export default Step1HistoryLog;
