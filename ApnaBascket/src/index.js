import { Root } from 'native-base';
import React, { Component } from 'react';
import { StatusBar } from 'react-native';
import { Provider } from 'react-redux';
import Navigator from '../src/navigations/index.js';
import configureStore from '../src/store/store';

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <Root>
                <Provider store={configureStore}>
                    <StatusBar barStyle="dark-content" hidden={false} backgroundColor="#FBF7F4" translucent={true} />
                    <Navigator />
                </Provider>
            </Root>
        )
    }
}