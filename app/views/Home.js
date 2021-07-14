import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, ScrollView, Animated } from 'react-native';
import {
    primaryColor
} from '../style/default'
import { LinearGradient } from "expo-linear-gradient";
import Button from '../components/Button'
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import Card from '../components/Card';

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

    useEffect(() => {
        getUser()
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
                    <Button title={"Sair"} onPress={onPressButton}></Button>
                    <View style={{flexDirection: 'row'}}>
                        <Card style={styles.card}>
                            <Text>fsdfsdf</Text>
                        </Card>
                        <Card style={styles.card}>
                            <Text>fsdfsdf</Text>
                        </Card>
                        <Card style={styles.card}>
                            <Text>fsdfsdf</Text>
                        </Card>
                    </View>
                    <View  style={{flexDirection: 'row'}}>
                        <Card style={styles.card}>
                            <Text>fsdfsdf</Text>
                        </Card>
                        <Card style={styles.card}>
                            <Text>fsdfsdf</Text>
                        </Card>
                        <Card style={styles.card}>
                            <Text>fsdfsdf</Text>
                        </Card>
                        <Card style={styles.card}>
                            <Text>fsdfsdf</Text>
                        </Card>
                    </View>
                    <Card style={styles.card}>
                        <Text>fsdfsdf</Text>
                    </Card>
                    <Card style={styles.card}>
                        <Text>fsdfsdf</Text>
                    </Card>
                    <Card style={styles.card}>
                        <Text>fsdfsdf</Text>
                    </Card>
                    <Card style={styles.card}>
                        <Text>fsdfsdf</Text>
                    </Card>
                    <Card style={styles.card}>
                        <Text>fsdfsdf</Text>
                    </Card>
                    <Card style={styles.card}>
                        <Text>fsdfsdf</Text>
                    </Card>
                    <Card style={styles.card}>
                        <Text>fsdfsdf</Text>
                    </Card>
                    <Card style={styles.card}>
                        <Text>fsdfsdf</Text>
                    </Card>
                    <Card style={styles.card}>
                        <Text>fsdfsdf</Text>
                    </Card>
                    <Card style={styles.card}>
                        <Text>fsdfsdf</Text>
                    </Card>
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
    }
})

export default Home