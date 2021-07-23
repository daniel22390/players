import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, ScrollView, Animated, PermissionsAndroid } from 'react-native';
import {
    primaryColor
} from '../style/default'
import { LinearGradient } from "expo-linear-gradient";
import Button from '../components/Button'
import Icon from 'react-native-vector-icons/Entypo';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import LabelCard from '../components/LabelCard';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import {
    terciaryColor
} from '../style/default'
import Map from '../components/Map';

const Home = (props) => {
    const [title, setTitle] = useState('');

    const onPressButton = () => {
        auth()
            .signOut()
            .then(() => props.navigation.replace('Auth', { screen: 'Login' }));
    }

    const getUser = async () => {
        if (auth().currentUser.displayName) {
            setTitle("Seja bem vindo " + auth().currentUser.displayName)
            props.navigation.setParams({
                title: "Seja bem vindo " + auth().currentUser.displayName
            })
        }

        const data = await database().ref('users/' + auth().currentUser.uid).once('value')
        var user = data.val()
        setTitle("Seja bem vindo " + user.name.split(" ")[0])
    }

    useEffect(async () => {
        getUser()
        const granted = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION);

        if (granted) {
            console.log("You can use the ACCESS_FINE_LOCATION")
        }
        else {
            console.log("ACCESS_FINE_LOCATION permission denied")
        }
    }, []);

    return (
        <LinearGradient colors={[primaryColor, '#060e21']} style={{ flex: 1 }}>
            {
                props.route.params && props.route.params.offset &&
                <ScrollView
                    contentContainerStyle={{ flexGrow: 1 }}
                    showsVerticalScrollIndicator={false}
                    onScroll={Animated.event(
                        [{ nativeEvent: { contentOffset: { y: props.route.params.offset } } }],
                    )}
                >
                    {/* <Button title={"Sair"} onPress={onPressButton}></Button> */}
                    <View style={{ flexDirection: 'row' }}>
                        <LabelCard style={styles.card} label="Meu Perfil" content={
                            <View style={{ ...styles.image }}>
                                <Icon name={'image'} size={120} color={terciaryColor} lib="Entypo" />
                            </View>
                        }></LabelCard>
                        <LabelCard style={styles.card} label="Mapa de Jogos" content={
                            <View style={{ ...styles.image }}>
                                <Map mini={true}></Map>
                            </View>
                        }></LabelCard>
                    </View>
                </ScrollView>
            }

        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    card: {
        marginBottom: 15,
        flex: 1,
        marginRight: 5,
        marginLeft: 5
    },
    image: {
        width: '100%',
        alignItems: 'center'
    }
})

export default Home