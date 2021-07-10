import React from 'react';
import { StyleSheet } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { HomeNavigator } from './HomeNavigator';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from "expo-linear-gradient";

import {
    primaryColor, terciaryColor
} from '../style/default'

const Tab = createMaterialTopTabNavigator();


const BottomTabNavigator = (props) => {
    const { style } = props;
    return (
        <LinearGradient colors={[primaryColor, '#060e21']} style={{ flex: 1 }}>
            <SafeAreaView style={[{ flex: 1 }]} edges={['bottom']}>

                <Tab.Navigator
                    tabBarOptions={{
                        tabStyle: {
                            flex: 1,
                            height: 50
                        },
                        style: {
                            backgroundColor: primaryColor,
                            height: 50,
                            borderTopWidth: 0,
                            paddingBottom: 0
                        },
                        activeTintColor: terciaryColor,
                        adaptive: false,
                        safeAreaInset: { bottom: 'never', top: 'never' },
                    }}
                    initialRouteName="Home">
                    <Tab.Screen
                        name="Home"
                        component={HomeNavigator}
                        options={{
                        }}
                    />
                </Tab.Navigator>
            </SafeAreaView>
        </LinearGradient>
    );
}

export default BottomTabNavigator

const styles = StyleSheet.create({
    label: {
        color: 'blue',
        bottom: 10
    },
    labelFocused: {
        color: 'green'
    }
})