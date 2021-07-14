import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { navigatorOptions } from "./NavigationOptions";
import { HeaderNavigation, HeaderBack } from './HeaderNavigation';

const Stack = createStackNavigator();

import Home from "../views/Home";

export const HomeNavigator = (props) => {
    return (
        <Stack.Navigator initialRouteName="Home" screenOptions={navigatorOptions}>
            <Stack.Screen name="Home" component={Home}
                options={{
                    headerTitle: '',
                    headerLeft: () => <HeaderBack navigation={navigation} />,
                    header: ({ scene, previous, navigation }) => <HeaderNavigation scene={scene} previous={previous} navigation={navigation} />
                }} />
        </Stack.Navigator>
    );
};