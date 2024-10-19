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
  handleProceed,
  address,
  email,
  phoneNumber,
  middleName,
  lastName,
  firstName,
  bankName,
  accountNumber,
  accountName,
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
          <Text style={styles.confirmLeftText}>First Name</Text>
          <Text>{firstName}</Text>
        </View>
        <View style={styles.confirmText}>
          <Text style={styles.confirmLeftText}>Middle Name</Text>
          <Text>{middleName}</Text>
        </View>
        <View style={styles.confirmText}>
          <Text style={styles.confirmLeftText}>Last Name</Text>
          <Text>{lastName} </Text>
        </View>
        <View style={styles.confirmText}>
          <Text style={styles.confirmLeftText}>Phone Number</Text>
          <Text>{phoneNumber} </Text>
        </View>
        <View style={styles.confirmText}>
          <Text style={styles.confirmLeftText}>Email Address</Text>
          <Text>{email} </Text>
        </View>
        <View style={styles.confirmText}>
          <Text style={styles.confirmLeftText}>Address</Text>
          <Text>{address} </Text>
        </View>
      </View>
      <View style={{ ...styles.confirmBg, marginTop: 20 }}>
        <View style={styles.confirmText}>
          <Text style={styles.confirmLeftText}>Acoount Name</Text>
          <Text>{accountName}</Text>
        </View>
        <View style={styles.confirmText}>
          <Text style={styles.confirmLeftText}>Account Number</Text>
          <Text>{accountNumber}</Text>
        </View>
        <View style={styles.confirmText}>
          <Text style={styles.confirmLeftText}>Bank Name</Text>
          <Text>{bankName} </Text>
        </View>
      </View>
      <View>
        <CustomButton press={handleProceed} disabled={loading}>
          Submit {loading && <ActivityIndicator />}
        </CustomButton>
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
