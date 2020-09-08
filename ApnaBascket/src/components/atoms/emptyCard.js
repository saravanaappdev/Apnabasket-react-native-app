import React, { Component } from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

export default class ApnaEmptyCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOfferAvaiable: this.props.isOfferAvaiable || false,
            offerpercentage: this.props.offerpercentage || 0,
            isSoldOut: this.props.isSoldOut || false,
        };
    }

    render() {
        return (
            <TouchableOpacity style={[styles.itemCard]}>
                <Text style={{ fontSize: 16 }}>+5 more</Text>
            </TouchableOpacity>)
    }
}

const styles = StyleSheet.create({
    itemCard: {
        height: 250,
        width: 155,
        elevation: 3,
        zIndex: 10,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 10,
        marginLeft: 12,
        marginLeft: 12,
        marginTop: 20,
        marginBottom: 20,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FFC315',
    },
});
