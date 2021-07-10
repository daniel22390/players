import * as React from 'react';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { navigatorOptions } from "./NavigationOptions";

import { AuthNavigator } from './AuthNavigator'
import TabNavigator from './TabNavigator'

const Stack = createStackNavigator();
export const navigationRef = React.createRef();

export function navigate(name, params) {
    const last = navigationRef.current?.getRootState().routes[navigationRef.current?.getRootState().routes.length - 1];
    if (name !== last.name) {
        navigationRef.current?.navigate(name, params);
    } else {
        navigationRef.current?.navigate(params.screen, {...params.params});
    }
}

export const RootNavigator = () => {
    return (
        <NavigationContainer ref={navigationRef}>
            <Stack.Navigator initialRouteName="Auth" screenOptions={navigatorOptions} mode="modal">
                <Stack.Screen options={{ headerShown: false }} name="Auth" component={AuthNavigator} />
                <Stack.Screen options={{ headerShown: false }} name="Root" component={TabNavigator} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}