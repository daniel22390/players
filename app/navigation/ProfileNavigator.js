import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { navigatorOptions } from "./NavigationOptions";

const Stack = createStackNavigator();

import Profile from "../views/Profile";

export const ProfileNavigator = (props) => {
    return (
        <Stack.Navigator initialRouteName="Profile" screenOptions={navigatorOptions}>
            <Stack.Screen name="Profile" component={Profile}
                options={{
                    headerTitle: '',
                    headerShown: false
                }} />
        </Stack.Navigator>
    );
};