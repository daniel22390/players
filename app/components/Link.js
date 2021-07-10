import React from "react";
import { StyleSheet, TouchableOpacity, Text } from "react-native";

import {
    primaryColor,
    terciaryColor,
    quartenaryColor,
    style
} from '../style/default'

const CustomButton = (props) => {

    const {
        onPress = () => { },
        title
    } = props;

    return (
        <TouchableOpacity onPress={onPress}>
            <Text style={{...styles.buttonText, ...style.fontSizeMd}}>{title}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    buttonText: {
        color: terciaryColor,
        textAlign: 'center'
    }
});

export default CustomButton;