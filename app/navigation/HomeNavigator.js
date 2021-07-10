import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { navigatorOptions } from "./NavigationOptions";

const Stack = createStackNavigator();

import Home from "../views/Home";

export const HomeNavigator = (props) => {
    return (
        <Stack.Navigator initialRouteName="Home" screenOptions={navigatorOptions}>
            <Stack.Screen name="Home" component={Home}
                options={{
                    headerTitle: '',
                    headerShown: false
                }} />
        </Stack.Navigator>
    );
};