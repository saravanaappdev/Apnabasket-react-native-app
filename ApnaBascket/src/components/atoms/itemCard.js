import { View } from 'native-base';
import React, { Component } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity } from 'react-native';
import Cabbage from '../../assets/images/png/cabbage.png';
import Cart from '../../assets/images/png/cart.png';
import ShoppingList from '../../assets/images/png/shopping-list.png';
import { THEME } from '../../styles/colors';

export default class ApnaItemCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOfferAvaiable: this.props.isOfferAvaiable || false,
            offerpercentage: this.props.offerpercentage || 0,
            isSoldOut: this.props.isSoldOut || false,
        };
    }

    selectedItem(item) {
        console.log('item--->', item);
    }

    render() {
        return (
            <TouchableOpacity onPress={() => { this.selectedItem() }} style={[styles.itemCard]} activeOpacity={0.7}>
                <View style={[styles.offerContainer, this.state.isOfferAvaiable && this.state.offerpercentage > 0 ? styles.offer : this.state.isSoldOut ? styles.soldOut : '']}>
                    <Text style={styles.offerText}>{this.state.isOfferAvaiable && this.state.offerpercentage > 0 ? `${this.state.offerpercentage}% OFF` : this.state.isSoldOut ? 'SOLD OUT' : ''}
                    </Text>
                </View>
                <View>
                    <Image
                        source={Cabbage}
                        style={{
                            maxWidth: 135,
                            maxHeight: 135,
                        }}
                    />
                </View>

                <View style={{ marginTop: 5 }}>
                    <Text style={{ color: '#707070', fontSize: 10 }}>170 g</Text>
                    <Text numberOfLines={2} ellipsizeMode='tail' style={{ color: '#353839', fontSize: 14, height: 35, fontWeight: 'bold' }}>Chinese Cabbage kljr hre th erj hte hrkjehte hterh</Text>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10, alignItems: 'center' }}>
                    <View>
                        {/* offer text*/}
                        {this.state.isOfferAvaiable ?
                            (<Text style={{ color: 'black', textDecorationLine: 'line-through', textDecorationStyle: 'solid', fontSize: 12, position: 'absolute', top: -14 }}>$5.99</Text>)
                            : null}
                        <Text style={{ color: '#F15C25', fontSize: 14 }}>$2.99</Text>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <Image
                            source={ShoppingList}
                            style={{
                                width: 30,
                                height: 30,
                                marginRight: 10,
                            }}
                        />
                        <Image
                            source={Cart}
                            style={{
                                width: 30,
                                height: 30,
                            }}
                        />
                    </View>
                </View>
            </TouchableOpacity>)
    }
}

const styles = StyleSheet.create({
    itemCard: {
        height: 250,
        width: 155,
        elevation: 3,
        zIndex: 5,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 10,
        marginLeft: 12,
        marginLeft: 12,
        marginTop: 20,
        marginBottom: 10,
        flexDirection: 'column',
        justifyContent: 'space-between',
    },
    offerContainer: {
        width: 66,
        height: 22,
        borderRadius: 4.5,
        alignItems: 'center',
        justifyContent: 'center',
        justifyContent: 'center',
        position: 'absolute',
        zIndex: 100,
        right: 10,
        top: -12
    },
    soldOut: {
        backgroundColor: '#F15C25',
    },
    offer: {
        backgroundColor: 'green',
    },
    offerText: {
        fontSize: 10.5,
        color: THEME.WHITE,
    }
});
