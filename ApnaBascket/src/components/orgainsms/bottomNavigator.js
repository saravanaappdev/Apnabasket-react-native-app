// In Bottom navigator there is no navigations as there is only home tab.
import { View } from 'native-base';
import React, { Component } from "react";
import { StyleSheet, Text } from "react-native";
import { defineIcon } from '../../assets/images/svg';
import { THEME } from '../../styles/colors';

export default class BottomNavigator extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        return (
            <View style={styles.bottomNavigator}>
                <View style={styles.navigatorIcons}>
                    <View style={styles.alignCenter}>{defineIcon('home')}</View>
                    <Text style={styles.navigatorText}>HOME</Text>
                </View>
                <View style={styles.navigatorIcons}>
                    <View style={styles.alignCenter}>{defineIcon('navigator-star')}</View>
                    <Text style={styles.navigatorText}>POINTS</Text>
                </View>
                <View style={styles.navigatorIcons}>
                    <View style={styles.alignCenter}>{defineIcon('re-order')}</View>
                    <Text style={styles.navigatorText}>RE-ORDER</Text>
                </View>
                <View style={styles.navigatorIcons}>
                    <View style={styles.alignCenter}>{defineIcon('shopping-list-navigator')}</View>
                    <Text style={styles.navigatorText}>SHOP’G LIST</Text>
                </View>
                <View style={styles.navigatorIcons}>
                    <View style={styles.alignCenter}>{defineIcon('more')}</View>
                    <Text style={styles.navigatorText}></Text>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    bottomNavigator: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: THEME.GREEN,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        width: '100%',
        height: 84,
        justifyContent: 'space-between',
        paddingLeft: 35,
        paddingRight: 30,
    },
    alignCenter: {
        alignItems: 'center',
    },
    navigatorIcons: {
        flexDirection: 'column',
        justifyContent: 'center',
        paddingBottom: 8,
    },
    navigatorText: {
        color: THEME.WHITE,
        paddingTop: 10,
        paddingBottom: 10,
        fontSize: 10,
    }
});
