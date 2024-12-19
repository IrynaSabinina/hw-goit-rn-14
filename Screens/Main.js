import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import { StyleSheet } from "react-native";

import { authStateChangeUser } from "../redux/auth/authOperations";

import LoginScreen from "./Auth/LoginScreen";
import RegistrationScreen from "./Auth/RegistrationScreen";
import Home from "./Home";
import { selectEmail, selectStateChange } from "../redux/auth/authSelectors";

const MainStack = createStackNavigator();

const Main = () => {
  const dispatch = useDispatch();
  const stateChange = useSelector(selectStateChange);
  const userEmail = useSelector(selectEmail);

  useEffect(() => {
    dispatch(authStateChangeUser());
  }, []);

  console.log("mainPage", userEmail);
  return (
    <NavigationContainer>
      {!stateChange ? (
        <MainStack.Navigator
          initialRouteName="Registration"
          screenOptions={{ headerShown: false }}
        >
          <MainStack.Screen name="Login" component={LoginScreen} />
          <MainStack.Screen
            name="Registration"
            component={RegistrationScreen}
          />
        </MainStack.Navigator>
      ) : (
        <MainStack.Navigator
          initialRouteName="Home"
          screenOptions={{ headerShown: false }}
        >
          <MainStack.Screen name="Home" component={Home} />
        </MainStack.Navigator>
      )}
    </NavigationContainer>
  );
};

export default Main;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
