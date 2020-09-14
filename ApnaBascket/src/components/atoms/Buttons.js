import React, { Component } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { defineIcon } from '../../assets/images/svg';
import { THEME } from '../../styles/colors';

export default class ApnaButton extends Component {
    constructor(props) {
        super(props);
    }
    onClicked() {

    }
    render() {
        return (
            <TouchableOpacity activeOpacity={0.9} onPress={() => { this.onClicked() }} style={[styles.buttonContainer, this.props.isCartButton ? styles.cartButton : styles.shoppingListButton]}>
                {this.props.isCartButton ?
                    (
                        <View style={styles.flexRow}>
                            <Text>{defineIcon('cart')}</Text>
                            <Text style={styles.buttonText}>ADD TO CART </Text>
                        </View>
                    ) :
                    (
                        <View style={styles.flexRow}>
                            <Text>{defineIcon('shopping-list')}</Text>
                            <Text style={styles.buttonText}>SHOPPING LIST</Text>
                        </View>
                    )}
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    buttonContainer: {
        width: '100%',
        height: 84,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    cartButton: {
        backgroundColor: '#0DB14B',
    },
    shoppingListButton: {
        backgroundColor: THEME.PRIMARY,
    },
    buttonText: {
        marginLeft: 10,
        color: THEME.WHITE,
    },
    flexRow: {
        flexDirection: 'row',
    }
});
