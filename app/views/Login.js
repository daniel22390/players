import React, { useState, useEffect } from 'react';
import { SafeAreaView, StatusBar, KeyboardAvoidingView, StyleSheet, View, TouchableWithoutFeedback, Keyboard, Platform, Text } from 'react-native';
import {
    style,
    primaryColor,
    terciaryColor
} from '../style/default'
import { LinearGradient } from "expo-linear-gradient";

import Card from '../components/Card'
import Input from '../components/Input'
import Button from '../components/Button'
import Link from '../components/Link'
import Image from '../components/Image'
import {showMessageCustom} from '../components/Notification'

import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';

const Login = (props) => {
    const [login, setLogin] = useState('daniel22390@hotmail.com');
    const [password, setPassword] = useState('123456');
    const [passwordConfirmation, setPasswordConfirmation] = useState('123456');
    const [name, setName] = useState('Daniel');
    const [screen, setScreen] = useState('Login');
    const [loading, setLoading] = useState(false);
    const [initializing, setInitializing] = useState(true);
    const [definePass, setDefinePass] = useState(false)
    let verifyAuth = false

    const onPressLink = () => {
        if(definePass)
            setDefinePass(false)
        else if(screen == 'Login')
            setScreen('Cadastro') 
        else
            setScreen('Login')
    }

    const onPressLinkPass = () => {
        setDefinePass(true)
    }

    const onPressButton = () => {
        if(!loading){
            if(definePass)
                forgotPass()
            else if(screen == 'Login')
                signIn()
            else
                register()
        }
    }

    const onAuthStateChanged = (user) => {
        if (initializing) setInitializing(false);
        if(user && !verifyAuth){
            verifyAuth = true
            props.navigation.replace('Root')
        }
    }

    const forgotPass = () => {
        if(login == ''){
            showMessageCustom("Email inválido!", "Email não pode estar em branco!")
            return;
        }

        setLoading(true)
        auth().sendPasswordResetEmail(login)
        .then(() => {
            setDefinePass(false)
            showMessageCustom("Email enviado com sucesso!", "Um email foi enviado para você redefinir sua senha")
        })
        .catch((error) => {
            if (error.code === 'auth/user-not-found') {
                showMessageCustom("Email não encontrado!", "Conta com o email digitado não encontrado!")
            }
            else if (error.code === 'auth/invalid-email') {
                showMessageCustom("Email inválido!", "O email foi digitado errado!")
            }
            else{
                showMessageCustom("Erro!", "Erro ao enviar solicitação!")
            }
        })
        .finally(() => {
            setLoading(false)
        });
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
        .then((u) => {
            auth().currentUser.updateProfile({
                displayName: name.split(' ')[0]
            })
            .finally(() => {
                database().ref('/users/' + u.user.uid)
                .set({
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
                                    size={40}
                                    source={require('../assets/logo.png')}
                                />
                                {
                                    definePass &&
                                    <View style={styles.fields} >
                                        <Text style={[style.fontSizeMd, {color: terciaryColor, textAlign: 'center'} ]}>
                                            Digite sua senha e enviaremos um email para você redefinir sua senha
                                        </Text>
                                    </View>
                                }
                                {
                                    screen == "Cadastro" &&
                                    <View style={styles.fields} >
                                        <Input placeholder="Nome" icon="user" value={name} onChangeText={(val) => setName(val)}></Input>
                                    </View>
                                }
                                <View style={styles.fields} >
                                    <Input placeholder="Email" type="email"  icon="envelope-o" value={login} onChangeText={(val) => setLogin(val)}></Input>
                                </View>
                                {
                                    !definePass && 
                                    <View style={styles.fields}>
                                        <Input placeholder="Senha" type="password" icon="lock" value={password}  onChangeText={(val) => setPassword(val)}></Input>
                                    </View>
                                }
                                {
                                    screen == "Cadastro" &&
                                    <View style={styles.fields} >
                                        <Input placeholder="Confirmação de Senha" type="password" icon="lock" value={passwordConfirmation}  onChangeText={(val) => setPasswordConfirmation(val)}></Input>
                                    </View>
                                }
                                <View style={styles.button}>
                                    <Button title={screen == "Login" ? (definePass ? "Enviar Email" : "Entrar") : "Cadastrar"} onPress={onPressButton} loading={loading}></Button>
                                </View>
                                <View style={styles.button}>
                                    <Link title={screen == "Login" && !definePass ? "Cadastre-se" : "Login"} onPress={onPressLink}></Link>
                                </View>
                                {
                                    screen == "Login" && !definePass &&
                                    <View style={styles.button}>
                                        <Link title="Esqueci minha Senha" onPress={onPressLinkPass}></Link>
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