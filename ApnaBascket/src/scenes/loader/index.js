import AsyncStorage from '@react-native-community/async-storage';
import React from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { THEME } from '../../styles/colors';
export default class Loader extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    componentDidMount() {
        this.bootstrap();
    }
    async bootstrap() {
        const userToken = await AsyncStorage.getItem('userToken');
        this.props.navigation.navigate(userToken ? 'App' : 'Auth');
    };
    render() {
        return (
            <View style={styles.container}>
                <ActivityIndicator
                    color={THEME.PRIMARY}
                    size='large'
                />
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: THEME.BLACK,
    },
});