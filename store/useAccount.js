import { create } from "zustand";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const useAccount = create((set) => ({
  account: null,
  logout: () => set({ account: null }),
  updateToken: (token) => set({ account: { ...state.account, token: token } }),
  updateAccount: (newAccount) => {
    AsyncStorage.setItem("token", newAccount.token);
    AsyncStorage.setItem("user", JSON.stringify(newAccount.user));
    AsyncStorage.setItem("refreshToken", newAccount.refreshToken);
    set({ account: newAccount.user });
  },
}));
