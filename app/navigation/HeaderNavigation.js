import React, { useEffect } from 'react';
import { StyleSheet, View, Platform, Animated, Text } from 'react-native';

import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import Image from '../components/Image';

import {
    primaryColor, quartenaryColor, terciaryColor, secondaryColor
} from '../style/default'

const HEADER_HEIGHT = 200;

export const HeaderBack = ({ navigation, ...props }) => {
    const { onClose } = props || null;
    return (
        <View></View>
    )
}

export const HeaderNavigation = ({ scene, previous, navigation, ...props }) => {
    const { style } = props;
    const insets = useSafeAreaInsets();

    useEffect(() => {
        let offset = new Animated.Value(0);
        navigation.setParams({
            offset,
            height: offset.interpolate({
                inputRange: [0, HEADER_HEIGHT + insets.top],
                outputRange: [HEADER_HEIGHT + insets.top, insets.top + 64],
                extrapolate: 'clamp',
            }),
            opacity: offset.interpolate({
                inputRange: [0, HEADER_HEIGHT + insets.top],
                outputRange: [1, 0],
                extrapolate: 'clamp',
            }),
            top: offset.interpolate({
                inputRange: [0, HEADER_HEIGHT + insets.top],
                outputRange: [15, -10],
                extrapolate: 'clamp',
            })
        })
    }, []);

    return (
        <SafeAreaView style={[styles.headerSafe]} edges={['top']}>
            {
                (scene.route.params && scene.route.params.offset) &&
                <Animated.View style={{ ...styles.header, height: scene.route.params.height }}>
                    <View style={{ flex: 1, alignItems: "center" }}>
                        <Image
                            size={40}
                            source={require('../assets/logo.png')}
                        ></Image>
                        <Animated.View style={{ opacity: scene.route.params.opacity, marginTop: scene.route.params.top }}>
                            <Text style={[styles.title]}>{scene.route.params.title}</Text>
                        </Animated.View>
                    </View>
                </Animated.View>
            }
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    headerSafe: {
        minHeight: 54,
        backgroundColor: "#060e21"
    },
    header: {
        justifyContent: 'space-around',
        alignItems: 'center',
        flexDirection: "row",
        paddingHorizontal: 20,
        paddingBottom: 5,
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 6,
        shadowOpacity: 0.26,
        elevation: 12
    },
    title: {
        color: "#aaa"
    }
})