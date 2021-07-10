import React from "react";
import { StyleSheet, TouchableOpacity, Text } from "react-native";

import {
    primaryColor,
    terciaryColor,
    quartenaryColor
} from '../style/default'
import Loading from "./Loading";

const CustomButton = (props) => {

    const {
        onPress = () => { },
        title,
        loading = false
    } = props;

    return (
        <TouchableOpacity style={styles.button} onPress={onPress}>
            {
                loading ?
                <Loading backgroundColor={{ backgroundColor: 'transparent' }} color={terciaryColor}></Loading>
                :
                <Text style={styles.buttonText}>{title}</Text>
            }
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        width: '100%',
        alignItems: "center",
        justifyContent: 'center',
        backgroundColor: primaryColor,
        borderRadius: 3,
        shadowColor: 'rgba(0, 0, 0, 0.1)',
        shadowOpacity: 0.8,
        elevation: 5,
        shadowRadius: 10,
        shadowOffset: { width: 1, height: 9 },
        height: 40
    },
    buttonText: {
        color: terciaryColor,
        textTransform: 'uppercase',
        fontSize: 14
    }
});

export default CustomButton;