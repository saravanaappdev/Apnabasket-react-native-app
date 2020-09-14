import React, { Component } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import NoData from '../../assets/images/png/empty-logo.png';

export default class ApnaNoDataCard extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            // Empty card
            <View style={styles.noDataCard}>
                <Image
                    source={NoData}
                    style={styles.image}
                />
                <Text style={styles.noDataText}>NO PRODUCTS FOUND</Text>
            </View>)
    }
}

const styles = StyleSheet.create({
    noDataCard: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    noDataText: {
        fontSize: 16,
        color: 'black',
        marginTop: 10,
    }
});
