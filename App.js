import { StatusBar } from "expo-status-bar";
import { Button, StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "./screens/Home";
import Inventory from "./screens/Inventory";
import Settings from "./screens/Settings";
import Production from "./screens/Production";
import Feather from "@expo/vector-icons/Feather";
import Ionicons from "@expo/vector-icons/Ionicons";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import Login from "./screens/Login";
import NewVendor from "./screens/NewVendor";
import PurchaseOrder from "./screens/PurchaseOrder";
import SalesOrder from "./components/salesOrder/SalesOrder";
import HistoryLog from "./components/historyLog/HistoryLog";
import Sorter from "./screens/Sorter";
import NewInventory from "./screens/NewInventory";
import ProductionOrder from "./screens/CrushProduction";
import CrushProduction from "./screens/CrushProduction";
import HotWashProduction from "./screens/HotWashProduction";

const BottomTabs = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen
          name="HomeScreen"
          component={HomeScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="NewVendor"
          component={NewVendor}
          options={{
            presentation: "modal",
          }}
        />
        <Stack.Screen
          name="PurchaseOrder"
          component={PurchaseOrder}
          options={{
            presentation: "modal",
          }}
        />
        <Stack.Screen
          name="SalesOrder"
          component={SalesOrder}
          options={{
            presentation: "modal",
          }}
        />
        <Stack.Screen
          name="HistoryLog"
          component={HistoryLog}
          options={{
            presentation: "modal",
          }}
        />
        <Stack.Screen
          name="Sorter"
          component={Sorter}
          options={{
            presentation: "modal",
          }}
        />
        <Stack.Screen
          name="NewSorter"
          component={NewInventory}
          options={{
            presentation: "modal",
          }}
        />
        <Stack.Screen
          name="CrushProduction"
          component={CrushProduction}
          options={{
            presentation: "modal",
          }}
        />
        <Stack.Screen
          name="HotWashProduction"
          component={HotWashProduction}
          options={{
            presentation: "modal",
            fullScreenGestureEnabled: true,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const HomeScreen = () => {
  return (
    <BottomTabs.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: "white" },
        headerTintColor: "#8E98A8",
        tabBarActiveTintColor: "#0D261A",
        headerShown: false,
      }}
    >
      <BottomTabs.Screen
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" color={color} size={size} />
          ),
        }}
        name="Home"
        component={Home}
      />
      <BottomTabs.Screen
        options={{
          tabBarIcon: ({ color, size }) => (
            <Feather name="play-circle" size={size} color={color} />
          ),
        }}
        name="Production"
        component={Production}
      />
      <BottomTabs.Screen
        options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5 name="chart-bar" size={size} color={color} />
          ),
        }}
        name="Inventory"
        component={Inventory}
      />

      <BottomTabs.Screen
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="settings-outline" size={size} color={color} />
          ),
        }}
        name="Settings"
        component={Settings}
      />
    </BottomTabs.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
