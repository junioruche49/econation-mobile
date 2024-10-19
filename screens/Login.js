import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text, Image, ActivityIndicator } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import Button from "../components/button/Button";
import CustomTextInput from "../components/customTextInput/CustomTextInput";
import { ErrorMessage, Formik } from "formik";
import * as Yup from "yup";
import { useAccount } from "../store/useAccount";
import { ApiServiceFacade } from "../services/apiServiceFacade";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_URL } from "../constants/constant";

function Login() {
  const apiServiceFacade = new ApiServiceFacade(API_URL);
  const navigation = useNavigation();
  const [error, setError] = useState(undefined);

  const account = useAccount((state) => state.account);
  const updateAccount = useAccount((state) => state.updateAccount);

  const login = () => {
    navigation.navigate("HomeScreen");
  };

  useEffect(() => {
    async function fetchData() {
      const token = await AsyncStorage.getItem("token");
      const user = await AsyncStorage.getItem("user");
      const refreshToken = await AsyncStorage.getItem("refreshToken");
      if (token) {
        if (account == null) {
          const account = { token, refreshToken, user: JSON.parse(user) };
          updateAccount(account);
        }
        navigation.navigate("HomeScreen");
      }
    }
    fetchData();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.logo}>
        <Image source={require("../assets/logo.png")} />
      </View>
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={Yup.object({
          password: Yup.string()
            .min(6, "Must be 6 characters or less")
            .required("Required"),
          email: Yup.string()
            .email("Invalid email address")
            .required("Required"),
        })}
        onSubmit={async (values, actions) => {
          setError(undefined);
          try {
            const response = await apiServiceFacade.post("/api/v1/auth", {
              email: values.email,
              password: values.password,
            });
            updateAccount(response.data.data);
            actions.setSubmitting.bind(this, false);
            login();
            actions.resetForm.bind(this, "")();
          } catch (error) {
            actions.setSubmitting.bind(this, false);
            setError(error.response?.data?.message);
          }
        }}
      >
        {({ handleChange, handleBlur, handleSubmit, values, isSubmitting }) => (
          <View>
            <Text style={styles.loginText}>Login</Text>
            <CustomTextInput
              placeholder={"Enter your username"}
              changeTextHandler={handleChange("email")}
              value={values.email}
            />
            <Text>
              <ErrorMessage name="email" />
            </Text>

            <CustomTextInput
              placeholder={"Enter your password"}
              changeTextHandler={handleChange("password")}
              value={values.password}
              secureTextEntry={true}
            />
            <Text>
              <ErrorMessage name="password" />
            </Text>
            {error && <Text>{error}</Text>}
            <Button press={handleSubmit} disabled={isSubmitting}>
              Login {isSubmitting && <ActivityIndicator />}
            </Button>
          </View>
        )}
      </Formik>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 18,
    marginTop: 30,
  },
  logo: {
    width: "100%",
    display: "flex",
    flexDirection: "row-reverse",
    marginBottom: 120,
  },
  loginText: {
    fontSize: 30,
    fontWeight: "600",
    marginBottom: 50,
  },
});
export default Login;
