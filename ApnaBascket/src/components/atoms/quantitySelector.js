import React, { Component } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { THEME } from '../../styles/colors';
import { scaleFont } from '../../styles/mixins';

export default class ApnaQuantitySelector extends Component {
    constructor(props) {
        super(props);
        this.state = {
            quantity: 0,
        };
    }
    // Functionality to increment the quantity
    async increment() {
        await this.setState((prevState) => ({
            quantity: prevState.quantity + 1,
        }))
        this.props.emitQuantity(this.state.quantity);
    }

     // Functionality to decrement the quantity
    async decrement() {
        await this.setState((prevState) => ({
            quantity: prevState.quantity >= 1 ? prevState.quantity - 1 : 0,
        }))
        this.props.emitQuantity(this.state.quantity);
    }
    render() {
        return (
            <View style={styles.quantitySelector}>
                <TouchableOpacity onPress={() => { this.decrement() }} style={styles.increamentIcon} activeOpacity={0.8}>
                    <Text style={styles.icon}> - </Text>
                </TouchableOpacity>
                <Text style={styles.count}> {this.state.quantity} </Text>
                <TouchableOpacity onPress={() => { this.increment() }} style={styles.increamentIcon} activeOpacity={0.8}>
                    <Text style={styles.icon}> + </Text>
                </TouchableOpacity>
            </View>)
    }
}

const styles = StyleSheet.create({
    quantitySelector: {
        flexDirection: 'row', alignItems: 'center',
    },
    emptyCard: {
        height: 250,
        width: 155,
        elevation: 3,
        zIndex: 10,
        backgroundColor: THEME.WHITE,
        borderRadius: 20,
        padding: 10,
        marginLeft: 12,
        marginLeft: 12,
        marginTop: 20,
        marginBottom: 20,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: THEME.PRIMARY,
    },
    increamentIcon: {
        width: 30,
        height: 30,
        backgroundColor: THEME.LIGHT_GRAY,
        borderRadius: 100,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    icon: {
        fontSize: scaleFont(20),
        color: THEME.WHITE,
        fontWeight: 'bold'
    },
    count: {
        fontSize: scaleFont(18),
        marginLeft: 10,
        marginRight: 10
    }
});
