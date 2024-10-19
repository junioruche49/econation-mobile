import React from "react";
import {
  View,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  Text,
} from "react-native";
import CustomButton from "../../button/Button";

function ConfirmDetails({
  date,
  coldWashFlakes,
  hotWashedFlakes,
  waste,
  comments,
  handleProceed,
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
        <View style={styles.confirmText}>
          <Text style={styles.confirmLeftText}>Date</Text>
          <Text>{date.toString()}</Text>
        </View>
      </View>
      <View style={styles.actionBtn}>
        <TouchableOpacity>
          <Text style={styles.actionBtnText}>Edit</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.confirmBg}>
        <View style={styles.confirmText}>
          <Text style={styles.confirmLeftText}>Input Quantity</Text>
          <Text>{coldWashFlakes} tons</Text>
        </View>
        <View style={styles.confirmText}>
          <Text style={styles.confirmLeftText}>Total Output Quantity</Text>
          <Text>{hotWashedFlakes} tons</Text>
        </View>
        <View style={styles.confirmText}>
          <Text style={styles.confirmLeftText}>Waste</Text>
          <Text>{waste} tons</Text>
        </View>
        <View style={styles.confirmText}>
          <Text style={styles.confirmLeftText}>Comments</Text>
          <Text>{comments} </Text>
        </View>

        <View>
          <CustomButton press={handleProceed} disabled={loading}>
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
