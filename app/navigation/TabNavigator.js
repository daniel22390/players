import React from 'react';
import { StatusBar, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HomeNavigator } from './HomeNavigator';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from "expo-linear-gradient";
import Icon from 'react-native-vector-icons/FontAwesome';

import {
    primaryColor, quartenaryColor, terciaryColor
} from '../style/default'
import { ProfileNavigator } from './ProfileNavigator';

const Tab = createBottomTabNavigator();


const BottomTabNavigator = (props) => {
    const { style } = props;
    return (
        <LinearGradient colors={[primaryColor, '#060e21']} style={{ flex: 1 }}>
            <StatusBar backgroundColor={"#060e21"} barStyle={"light-content"} animated={false}></StatusBar>
            <SafeAreaView style={[{ flex: 1 }]} edges={['bottom']}>

                <Tab.Navigator
                    screenOptions={({ route }) => ({
                        tabBarIcon: ({ focused, color, size }) => {
                            let iconName;

                            const icons = {
                                "Home": "th-large",
                                "Profile": "user"
                            }

                            return <Icon name={icons[route.name]} size={focused ? size + 3 : size} color={color} />;
                        },
                    })}
                    tabBarOptions={{
                        tabStyle: {
                            flex: 1,
                            height: 65,
                            paddingBottom: 10
                        },
                        style: {
                            backgroundColor: primaryColor,
                            height: 60,
                            borderTopWidth: 0,
                            paddingBottom: 10,
                        },
                        activeTintColor: terciaryColor,
                        inactiveTintColor: quartenaryColor,
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
                    <Tab.Screen
                        name="Profile"
                        component={ProfileNavigator}
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