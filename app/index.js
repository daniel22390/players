import React, { Component } from 'react';
import { RootNavigator } from "./navigation/RootNavigator"
import Alert from './components/Alert'
import FlashMessage from "react-native-flash-message";
import { Provider } from 'react-redux';
import { store } from './store';

export default class App extends Component {

    render() {
        return (
            <Provider store={store}>
                <RootNavigator></RootNavigator>
                <FlashMessage position="top" renderCustomContent={() => <Alert />} />
            </Provider>
        );
    }
}