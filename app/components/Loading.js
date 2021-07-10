import React from 'react';
import { View, ActivityIndicator } from 'react-native';

const Loading = (props) => {
    const { color, backgroundColor } = props;

    return (
        <View style={[{ flex: 1, justifyContent: 'center', opacity: 1 }, backgroundColor]}>
            <ActivityIndicator size="large" color={color} />
        </View>
    )
}

export default Loading