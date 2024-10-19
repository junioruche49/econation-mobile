import React from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import CustomButton from "../../button/Button";

function ConfirmDetails({
  actualWaste,
  amberBottles,
  greenBottles,
  sortedBottles,
  inputQuantity,
  allSorters,
  sorters,
  handleSubmit,
  loading,
}) {
  return (
    <View style={styles.container}>
      <View style={styles.actionBtn}>
        <TouchableOpacity>
          <Text style={styles.actionBtnText}>Edit</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.confirmBg}>
        {allSorters.map((sort, index) => {
          return (
            <View style={styles.confirmText}>
              <Text style={styles.confirmLeftText}>Sorter {index + 1}</Text>
              <Text>{sorters.find((data) => data.value == sort.id).label}</Text>
            </View>
          );
        })}
      </View>
      <View style={styles.actionBtn}>
        <TouchableOpacity>
          <Text style={styles.actionBtnText}>Edit</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.confirmBg}>
        <View style={styles.confirmText}>
          <Text style={styles.confirmLeftText}>Input Quantity</Text>
          <Text>{inputQuantity} tons</Text>
        </View>
        <View style={styles.confirmText}>
          <Text style={styles.confirmLeftText}>Sorted Bottles</Text>
          <Text>{sortedBottles} Tons</Text>
        </View>
        <View style={styles.confirmText}>
          <Text style={styles.confirmLeftText}>Green Bottles</Text>
          <Text>{greenBottles} Tons</Text>
        </View>
        <View style={styles.confirmText}>
          <Text style={styles.confirmLeftText}>Amber Bottles</Text>
          <Text>{amberBottles} Tons</Text>
        </View>
        <View style={styles.confirmText}>
          <Text style={styles.confirmLeftText}>Actual Waste</Text>
          <Text>{actualWaste} Tona</Text>
        </View>
        <View>
          <CustomButton press={handleSubmit} disabled={loading}>
            Submit {loading && <ActivityIndicator />}
          </CustomButton>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
  },
  confirmBg: {
    borderColor: "#E8ECF4",
    borderWidth: 1,
    backgroundColor: "#F7F8F9",
    borderRadius: 8,
    paddingVertical: 25,
    paddingHorizontal: 25,
    gap: 15,
  },
  actionBtn: {
    textAlign: "right",
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  actionBtnText: {
    fontSize: 15,
    color: "#89C540",
  },
  confirmText: {
    justifyContent: "space-between",
    flexDirection: "row",
  },
  confirmLeftText: {
    color: "#8391A1",
    fontSize: 15,
  },
  confirmRightText: {
    color: "#000",
    fontSize: 15,
  },
});
export default ConfirmDetails;
