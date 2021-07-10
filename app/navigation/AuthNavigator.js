import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { navigatorOptions } from "./NavigationOptions";

const Stack = createStackNavigator();

import Login from "../views/Login";

export const AuthNavigator = (props) => {
    return (
        <Stack.Navigator initialRouteName="Login" screenOptions={navigatorOptions} mode="modal">
            <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
        </Stack.Navigator>
    );
};