import React from "react";
import { Text, View, StyleSheet } from "react-native";

import {
    primaryColor,
    terciaryColor,
    quartenaryColor,
    fontSizeMd
  } from '../style/default'
import Card from "./Card";

const LabelCard = (props) => {

    const {
        label = "",
        position = "bottom",
        style,
        content
    } = props;

    return (
        <Card style={{ ...style }}>
            <View>
                {
                    position == 'top' &&
                    <Text style={{...styles.label, ...styles.labelTop}}>{label}</Text>
                }
                {content}
                {
                    position == 'bottom' &&
                    <Text style={{...styles.label, ...styles.labelBottom}}>{label}</Text>
                }
            </View>
        </Card>
    );
};

const styles = StyleSheet.create({
    label: {
        color: terciaryColor,
        textAlign: 'center',
        fontSize: fontSizeMd
    },
    labelBottom: {
        marginTop: 5
    },
    labelTop: {
        marginBottom: 5
    }
});

export default LabelCard;