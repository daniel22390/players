import { showMessage, hideMessage } from "react-native-flash-message";
import { alertColor, fontSizeXL, style } from "../style/default";

export const showMessageCustom  = (title, message) => {
    showMessage({
        message: title,
        description: message,
        type: "danger",
        duration: 5000,
        hideOnPress: false,
        autoHide: false,
        hideStatusBar: true,
        style: {
            backgroundColor: '#000000D9',
            height: '100%',
            justifyContent: 'center',
            opacity: 1.5,
            paddingBottom: 70,
            paddingTop: 50
        },
        textStyle: {
            textAlign: 'center',
            color: '#FFFFFF'
        },
        titleStyle: {
            textAlign: 'center',
            color: alertColor,
            marginBottom: 15,
            ... style.fontSizeXL,
            paddingTop: 10
        },

    });
}

export const hideMessageCustom  = () => {
    hideMessage()
}