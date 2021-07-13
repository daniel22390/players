import React, { useState, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import {
    primaryColor
} from '../style/default'
import { LinearGradient } from "expo-linear-gradient";

const Profile = (props) => {

    return (
        <LinearGradient colors={[primaryColor, '#060e21']} style={{ flex: 1 }}>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
})

export default Profile