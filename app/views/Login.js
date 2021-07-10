import React, { useState, useEffect } from 'react';
import { SafeAreaView, StatusBar, KeyboardAvoidingView, StyleSheet, Image, View, TouchableWithoutFeedback, Keyboard, Platform } from 'react-native';
import {
    style,
    primaryColor
} from '../style/default'
import { LinearGradient } from "expo-linear-gradient";

import Card from '../components/Card'
import Input from '../components/Input'
import Button from '../components/Button'
import Link from '../components/Link'
import {showMessageCustom} from '../components/Notification'

import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';

const Login = (props) => {
    const [login, setLogin] = useState('daniel22390@hotmail.com');
    const [password, setPassword] = useState('123456');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');
    const [name, setName] = useState('');
    const [screen, setScreen] = useState('Login');
    const [loading, setLoading] = useState(false);
    let verifyAuth = false

    // const [user, setUser] = useState();
    const [initializing, setInitializing] = useState(true);

    const onPressLink = () => {
        screen == 'Login' ? setScreen('Cadastro') : setScreen('Login')
    }

    const onPressButton = () => {
        if(!loading)
            screen == 'Login' ? signIn() : register()
    }

    const onAuthStateChanged = (user) => {
        if (initializing) setInitializing(false);
        if(user && !verifyAuth){
            verifyAuth = true
            props.navigation.replace('Root')
        }
    }

    useEffect(() => {
        try{
            let subscriber = auth().onAuthStateChanged(onAuthStateChanged);
            return subscriber; // unsubscribe on unmount
        } catch(e){
            setInitializing(false)
        }
    }, []);

    const signIn = () => {
        if(login != '' && password != ''){
            setLoading(true)
            auth().signInWithEmailAndPassword(login, password)
            .then(() => {
            })
            .catch(error => {
                showMessageCustom("Credenciais inválidas!", "Email e senha inválidos!")
            })
            .finally(() => {
                setLoading(false)
            });
        }
        else{
            showMessageCustom("Credenciais inválidas!", "Email e senha inválidos!")
        }
    }

    const register = () => {
        if(name != '' && login != '' && password != '' && passwordConfirmation != ''){
            if(passwordValidation()){
                createUser()
            }
        }
        else
            showMessageCustom("Campos não preenchidos!", "Por favor, preencha os campos obrigatórios abaixo!")
    }

    const passwordValidation = () => {
        if(passwordConfirmation != password){
            showMessageCustom("Senha inválida!", "As senhas informadas são diferentes!")
            return false
        }
        return true
    }

    const createUser = () => {
        setLoading(true)
        auth()
        .createUserWithEmailAndPassword(login, password)
        .then(() => {
            const user = database().ref('/users').push();
            user.set({
                name: name,
                email: login
            })
            .then(() => {})
            .catch((e) => {
                showMessageCustom("Erro ao cadastrar usuário!", "Ocorreu um erro ao cadastrar o usuário!")
            })
            .finally(() => {
                setLoading(false)
            })
        })
        .catch(error => {
            if (error.code === 'auth/email-already-in-use') {
                showMessageCustom("Email já Cadastrado!", "Email já usado em conta ativa!")
            }

            if (error.code === 'auth/invalid-email') {
                showMessageCustom("Email inválido!", "Email cadastrado inválido!")
            }

            if (error.code === 'auth/weak-password') {
                showMessageCustom("Senha inválida!", "Senha deve ter no mínimo 6 caracteres!")
            }
            setLoading(false)

            console.error(error.code);
        })
    }

    if (initializing) return <LinearGradient colors={[primaryColor, '#060e21']} style={{ flex: 1 }}></LinearGradient>;

    return (
        <LinearGradient colors={[primaryColor, '#060e21']} style={{ flex: 1 }}>
            <SafeAreaView style={[{ flex: 1 }]}>
                <StatusBar backgroundColor={primaryColor} barStyle={"light-content"} animated={false}></StatusBar>
                <KeyboardAvoidingView
                    behavior={Platform.OS === "ios" ? "padding" : "height"}
                    style={{ flex: 1 }}
                    enabled>
                    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                            <Card style={styles.card}>
                                <Image
                                    style={{
                                        height: 40,
                                        resizeMode: 'contain'
                                    }}
                                    source={require('../assets/logo.png')}
                                />
                                {
                                    screen == "Cadastro" &&
                                    <View style={styles.fields} >
                                        <Input placeholder="Nome" icon="user" value={name} onChangeText={(val) => setName(val)}></Input>
                                    </View>
                                }
                                <View style={styles.fields} >
                                    <Input placeholder="Email" type="email"  icon="envelope-o" value={login} onChangeText={(val) => setLogin(val)}></Input>
                                </View>
                                <View style={styles.fields}>
                                    <Input placeholder="Senha" type="password" icon="lock" value={password}  onChangeText={(val) => setPassword(val)}></Input>
                                </View>
                                {
                                    screen == "Cadastro" &&
                                    <View style={styles.fields} >
                                        <Input placeholder="Confirmação de Senha" type="password" icon="lock" value={passwordConfirmation}  onChangeText={(val) => setPasswordConfirmation(val)}></Input>
                                    </View>
                                }
                                <View style={styles.button}>
                                    <Button title={screen == "Login" ? "Entrar" : "Cadastrar"} onPress={onPressButton} loading={loading}></Button>
                                </View>
                                <View style={styles.button}>
                                    <Link title={screen == "Login" ? "Cadastre-se" : "Login"} onPress={onPressLink}></Link>
                                </View>
                                {
                                    screen == "Login" &&
                                    <View style={styles.button}>
                                        <Link title="Esqueci minha Senha" onPress={() => {}}></Link>
                                    </View>
                                }
                            </Card>
                        </View>
                    </TouchableWithoutFeedback>
                </KeyboardAvoidingView>
            </SafeAreaView>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    card: {
        width: '90%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    fields: {
        marginTop: 15,
        width: "100%"
    },
    button: {
        marginTop: 20,
        width: "100%"
    }
})

export default Login