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
    const [title, setTitle] = useState('');

    const onPressButton = () => {
        auth()
            .signOut()
            .then(() => props.navigation.replace('Auth', { screen: 'Login' }));
    }

    const getUser = async () => {
        if(auth().currentUser.displayName){
            setTitle("Seja bem vindo " + auth().currentUser.displayName)
        }

        const data = await database().ref('users/' + auth().currentUser.uid).once('value')
        var user = data.val()
        setTitle("Seja bem vindo " + user.name.split(" ")[0])
    }

    useEffect(() => {
        getUser()
    }, []);

    return (
        <LinearGradient colors={[primaryColor, '#060e21']} style={{ flex: 1 }}>
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{color: "#fff", marginBottom: 20}}>{title}</Text>
                <Button title={"Sair"} onPress={onPressButton}></Button>
            </View>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
})

export default Home