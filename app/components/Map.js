import React from "react";
import { View, StyleSheet } from "react-native";
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';

import {
} from '../style/default'

const Map = (props) => {

    const {
        mini = false
    } = props;

    return (
        <View style={{
            height: 200, width: 100, justifyContent: 'flex-end',
            alignItems: 'center',
        }}>
            <MapView
                style={{flex: 1}}
                initialRegion={{
                    latitude: 37.78825,
                    longitude: -122.4324,
                    latitudeDelta: 0.05,
                    longitudeDelta: 0.05
                }}
            />
        </View>
    );
};

const styles = StyleSheet.create({
});

export default Map;