import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import {
    primaryColor
} from '../style/default'
import { LinearGradient } from "expo-linear-gradient";
import Button from '../components/Button'
import auth from '@react-native-firebase/auth';

const Home = (props) => {

    const onPressButton = () => {
        auth()
        .signOut()
        .then(() => props.navigation.replace('Auth', { screen: 'Login' }));
    }
    
    return (
        <LinearGradient colors={[primaryColor, '#060e21']} style={{ flex: 1 }}>
            <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <Button title={"Sair"} onPress={onPressButton}></Button>
            </View>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
})

export default Home