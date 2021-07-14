import React from "react";
import { Image as ImageNative } from "react-native";

const Image = (props) => {

    const {
        size,
        source
    } = props;

    return (
        <ImageNative
            style={{
                height: size,
                resizeMode: 'contain'
            }}
            source={source}
        />
    );
};

export default Image;