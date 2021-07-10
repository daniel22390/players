import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {
    primaryColor
} from '../style/default'
import { LinearGradient } from "expo-linear-gradient";
import Button from '../components/Button'
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';

const Home = (props) => {
    const [name, setName] = useState('');

    const onPressButton = () => {
        auth()
            .signOut()
            .then(() => props.navigation.replace('Auth', { screen: 'Login' }));
    }

    useEffect(() => {
        auth().onAuthStateChanged(async (user) => {
            const data = await database().ref('users').orderByChild('email').equalTo(user.email).limitToFirst(1).once('value')
            var user = data.val()[Object.keys(data.val())[0]]
            setName(user.name)
        })
    }, []);

    return (
        <LinearGradient colors={[primaryColor, '#060e21']} style={{ flex: 1 }}>
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{color: "#fff", marginBottom: 20}}>Seja bem vindo {name}</Text>
                <Button title={"Sair"} onPress={onPressButton}></Button>
            </View>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
})

export default Home