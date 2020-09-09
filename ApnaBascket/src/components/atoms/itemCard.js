import { View } from 'native-base';
import React, { Component } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity } from 'react-native';
import Cabbage from '../../assets/images/png/cabbage.png';
import Cart from '../../assets/images/png/cart.png';
import ShoppingList from '../../assets/images/png/shopping-list.png';
import Constants from '../../constants';
import { THEME } from '../../styles/colors';
import { scaleFont } from '../../styles/mixins';

export default class ApnaItemCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOfferAvaiable: this.props.isOfferAvaiable || false,
            offerpercentage: this.props.offerpercentage || 0,
            isSoldOut: this.props.isSoldOut || false,
            product: Constants.PRODUCT,
        };
    }

    selectedItem(item) {
        this.props.selectedProductItem(this.state.product)
    }

    lbsToKgConvert(itemCount) {
        return `${(Constants.ONE_LB * itemCount).toFixed(2)} kg`
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
                        style={styles.cabbage}
                    />
                </View>

                <View style={styles.marginTop5}>
                    <Text style={styles.weight}>{this.lbsToKgConvert(this.state.product.weight)}</Text>
                    <Text numberOfLines={2} ellipsizeMode='tail' style={styles.productName}>{this.state.product.name}</Text>
                </View>
                <View style={styles.priceDetails}>
                    <View>
                        {/* offer text*/}
                        {this.state.isOfferAvaiable ?
                            (<Text style={styles.offerPrice}>${this.state.product.regular_price}</Text>)
                            : null}
                        <Text style={styles.price}>${this.state.product.sale_price}</Text>
                    </View>
                    <View style={styles.flexRow}>
                        <Image
                            source={ShoppingList}
                            style={styles.ShoppingList}
                        />
                        <Image
                            source={Cart}
                            style={styles.cart}
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
        backgroundColor: THEME.WHITE,
        borderRadius: 20,
        padding: 10,
        marginLeft: 2,
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
        backgroundColor: THEME.DARK_ORANGE,
    },
    offer: {
        backgroundColor: THEME.GREEN,
    },
    offerText: {
        fontSize: 10.5,
        color: THEME.WHITE,
    },
    marginTop5: {
        marginTop: 5,
    },
    weight: {
        color: THEME.SECONDARY_TEXT,
        fontSize: scaleFont(10),
    },
    productName: {
        color: THEME.ACTIVE_TEXT,
        fontSize: scaleFont(14),
        height: 35,
        fontWeight: 'bold',
    },
    priceDetails: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
        alignItems: 'center',
    },
    price: {
        color: THEME.DARK_ORANGE,
        fontSize: scaleFont(14),
    },
    offerPrice: {
        color: 'black',
        textDecorationLine: 'line-through',
        textDecorationStyle: 'solid',
        fontSize: scaleFont(12),
        position: 'absolute',
        top: -14,
        width: 100,
    },
    flexRow: {
        flexDirection: 'row',
    },
    cart: {
        width: 30,
        height: 30,
    },
    shoppingList: {
        width: 30,
        height: 30,
        marginRight: 10,
    },
    cabbage: {
        maxWidth: 135,
        maxHeight: 135,
    }
});
