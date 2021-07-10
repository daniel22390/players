import React from "react";
import { StyleSheet, TouchableOpacity, Text } from "react-native";

import {
    primaryColor,
    terciaryColor,
    quartenaryColor
} from '../style/default'

const CustomButton = (props) => {

    const {
        onPress = () => { },
        title
    } = props;

    return (
        <TouchableOpacity onPress={onPress}>
            <Text style={styles.buttonText}>{title}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    buttonText: {
        color: terciaryColor,
        fontSize: 14,
        textAlign: 'center'
    }
});

export default CustomButton;