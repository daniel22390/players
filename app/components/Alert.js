import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { hideMessage } from "react-native-flash-message";

import {
    alertColor
} from '../style/default'

const Alert = (props) => {
    return (
        <View style={{position: 'absolute', bottom: -50, width: '100%', alignItems: 'center'}}>
            <TouchableOpacity onPress={() => {
                hideMessage()
            }}>
                <Text style={[{color: alertColor}]}>Entendi</Text>
            </TouchableOpacity>
        </View>
    )
}

export default Alert