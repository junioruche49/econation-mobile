import axios from "axios";
// import { useAccount } from "../store/useAccount";
import AsyncStorage from "@react-native-async-storage/async-storage";

// // import { refreshToken } from "./fetchApi";
// import { useAccount } from "../store/useAccount";
// const account = useAccount((state) => state.account);
// const updateToken = useAccount((state) => state.updateToken);

export default axios.create({
  headers: { "Content-Type": "application/json" },
});

export const axiosApiInstance = axios.create({
  headers: { "Content-Type": "application/json" },
});

axiosApiInstance.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem("token");
  if (token) {
    config.headers.Authorization = token ? `${token}` : "";
  }

  return config;
});

// // Response interceptor for API calls
// axiosApiInstance.interceptors.response.use(
//   (response) => {
//     return response;
//   },
//   async (error) => {
//     const originalRequest = error.config;
//     if (error?.response?.status === 401 && !originalRequest._retry) {
//       const getNewToken = await refreshToken(account.refreshToken);
//       updateToken(getNewToken);
//       const access_token = getNewToken;
//       originalRequest._retry = true;
//       originalRequest.headers["Authorization"] = "Bearer " + access_token;
//       axios.defaults.headers.common["Authorization"] = "Bearer " + access_token;
//       return axios(originalRequest);
//     }
//     return Promise.reject(error);
//   }
// );
