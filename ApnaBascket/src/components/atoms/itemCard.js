import { View } from 'native-base';
import React, { Component } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity } from 'react-native';
import Cart from '../../assets/images/png/cart.png';
import ShoppingList from '../../assets/images/png/shopping-list.png';
import Constants from '../../constants';
import { THEME } from '../../styles/colors';
import { scaleFont } from '../../styles/mixins';

export default class ApnaItemCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOfferAvaiable: this.props.productDetails && this.props.productDetails.sale_price || false,
            isSoldOut: this.props.productDetails && this.props.productDetails.stock_quantity > 0,
            offerpercentage: this.props.offerpercentage || 20,
            isSoldOut: this.props.isSoldOut || false,
            product: this.props.productDetails || Constants.PRODUCT,
        };
    }

    selectedItem(item) {
        this.props.selectedProductItem(this.state.product)
    }

    // functionality to convert lbs to kg 
    lbsToKgConvert(itemCount) {
        return `${Math.round(Constants.ONE_LB * itemCount)} kg`
    }
    
    // functionality to calclate the offer percentage by price and saleprice
    calculateOfferPercentage(price, salePrice) {
        return Math.round((price - salePrice) / price * 100);
    }
    render() {
        return (
            <TouchableOpacity onPress={() => { this.selectedItem() }} style={[styles.itemCard]} activeOpacity={0.7}>
                <View style={[styles.offerContainer, this.state.isOfferAvaiable ? styles.offer : this.state.isSoldOut ? styles.soldOut : '']}>
                    <Text style={styles.offerText}>{this.state.isOfferAvaiable ? `${this.calculateOfferPercentage(this.props.productDetails.regular_price, this.props.productDetails.sale_price)}% OFF` : this.state.isSoldOut ? 'SOLD OUT' : ''}
                    </Text>
                </View>
                {/* Product image */}
                <View style={styles.itemCardImage}>
                    <Image
                        source={{ uri: this.props.productDetails && this.props.productDetails.images[0].src || '' }}
                        style={styles.cabbage}
                    />
                </View >
                
                {/* Product details */}
                <View style={styles.itemCardDescription}>
                    <View style={styles.marginTop5}>
                        <Text style={styles.weight}>{this.lbsToKgConvert(this.state.product.weight)}</Text>
                        <Text numberOfLines={2} ellipsizeMode='tail' style={styles.productName}>{this.state.product.name}</Text>
                    </View>
                    
                    {/* price section */}
                    <View style={styles.priceDetails}>
                        <View>
                            {/* offer text*/}
                            {this.state.isOfferAvaiable ?
                                (<View>
                                    <Text style={styles.offerPrice}>${this.props.productDetails.regular_price}</Text>
                                    <Text style={styles.price}>${this.props.productDetails.sale_price}</Text>
                                </View>)
                                : (<Text style={styles.price}>${this.props.productDetails && this.props.productDetails.regular_price || ''}</Text>)}
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
        marginLeft: 8,
    },
    shoppingList: {
        width: 30,
        height: 30,
    },
    cabbage: {
        width: '100%',
        height: '100%',
    },
    itemCardImage: {
        height: '60%',
    },
    itemCardDescription: {
        height: '40%',
    },
});
