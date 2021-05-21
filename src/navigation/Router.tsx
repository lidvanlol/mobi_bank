import React from "react";

import HomeScreen from "../screens/HomeScreen";
import LoginScreen from "../screens/LoginScreen";
import CategoriesScreen from "../screens/CategoriesScreen";
import NewTransactionScreen from "../screens/NewTransactionScreen";
import { UserContext } from "../Context/AuthContext";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Ionicons from "react-native-vector-icons/Ionicons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";




function Router() {
  const { user } = React.useContext(UserContext);
  const Stack = createStackNavigator();

  const Tab = createBottomTabNavigator();

  function MyTabs() {
    return (
      <Tab.Navigator>
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            tabBarLabel: "Home",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="home" color={color} size={size} />
            ),
          }}
        />

        <Tab.Screen
          name="Categories"
          component={CategoriesScreen}
          options={{
            tabBarLabel: "Kategorije",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="list-circle-outline" color={color} size={size} />
            ),
          }}
        />
      </Tab.Navigator>
    );
  }

  if (user) {
    return (
      <NavigationContainer>
        <Stack.Navigator mode="modal">
          <Stack.Screen
            name="Tabs"
            component={MyTabs}
            options={{ headerShown: false }}
          />
        
          <Stack.Screen
            name="MyModal"
            component={NewTransactionScreen}
            options={{ title: "Nova Transakcija" }}
          />

        
        </Stack.Navigator>
      </NavigationContainer>
    );
  } else {
    return <LoginScreen />;
  }
}
export default Router;
