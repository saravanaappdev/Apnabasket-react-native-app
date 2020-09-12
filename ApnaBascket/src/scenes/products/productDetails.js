import { Footer } from 'native-base';
import React, { Component } from "react";
import { BackHandler, Dimensions, FlatList, Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import Swiper from 'react-native-swiper';
import Cabbage from '../../assets/images/png/cabbage.png';
import { defineIcon } from '../../assets/images/svg';
import ApnaButton from '../../components/atoms/Buttons';
import ApnaItemCard from '../../components/atoms/itemCard';
import ApnaQuantitySelector from '../../components/atoms/quantitySelector';
import ApnaRatingStar from '../../components/atoms/ratingStar';
import Constants from '../../constants';
import { THEME } from '../../styles/colors';
import { scaleFont } from '../../styles/mixins';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default class ProductsDetails extends Component {
    constructor(props) {
        super(props);
        this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
        this.state = {
            isCategorySelected: true,
            product: this.props.navigation.state.params.item || {},
            quantity: 0,
            slideIndex: 0,
            slideStatus: [true, false, false],
            productList: Constants.ALL_PRODUCTS,
            productDetails: Constants.PRODUCT_DESCRIPTION,
        };
        this.backIconClicked = this.backIconClicked.bind(this);
    }

    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
    }

    handleBackButtonClick() {
        console.log('go backk');
        this.props.navigation.goBack(null);
        return true;
    }

    backIconClicked() {
        this.props.navigation.goBack(null);
    }
    setQuantity(quantity) {
        this.setState({
            quantity: quantity
        })
    }

    navigateToCatgoryList(item) {
        this.props.navigation.navigate('Category', {
            item: item
        })
    }
    navigateToProductDetails(item) {
        this.props.navigation.navigate('ProductDetails', {
            item: item
        })
    }
    selectedItem(item) {
        console.log('item--->', item);
    }
    slideChange(activeIndex) {
        this.setState({
            slideIndex: activeIndex,
        })
        console.log('--===>', this.state.slideStatus[0], this.state.slideStatus[1], this.state.slideStatus[2]);
        
        const slide=this.state.slideStatus.map((status, index) => {
            console.log('indexx--->', index, activeIndex,  index == activeIndex);
            return index == activeIndex;
        })
        console.log();
        this.setState({
            slideStatus: slide,
        })
    }
    render() {
        const renderItem = ({ item, index }) => {
            return (
                <View style={styles.marginRight5}>
                    <ApnaItemCard
                        selectedProductItem={(item) => { this.navigateToProductDetails(item) }}
                    />
                </View>
            );
        };
        return (
            <SafeAreaView style={styles.container}>
                <ScrollView style={{ backgroundColor: 'white', flex: 1 }}
                    stickyHeaderIndices={[0]}
                    showsVerticalScrollIndicator={false}
                >
                    <View
                        style={{ paddingTop: 35, paddingBottom: 10, borderBottomWidth: 2, borderBottomColor: '#E5DEDA', zIndex: 100, backgroundColor: THEME.SECONDARY }}>
                        <View style={{ marginLeft: 20, marginRight: 20, paddingTop: 50, paddingBottom: 5, flexDirection: 'row', alignItems: 'center' }}>
                            <TouchableOpacity onPress={() => { this.backIconClicked() }} style={{ marginRight: 20, height: 30, width: 20, justifyContent: 'center' }}>
                                {defineIcon('arrow-back', 'black', 10, 18)}
                            </TouchableOpacity>
                            <Text style={styles.heading}>{this.state.product.name}</Text>

                        </View>
                    </View>
                    {/* Product details */}
                    <View style={{ margin: 20 }}>
                        <View>
                            <Swiper style={styles.wrapper}
                                onIndexChanged={(index) => {
                                    console.log('index--->', index)
                                    this.slideChange(index);
                                }}
                                dotColor="transparent"
                                activeDotColor="transparent"
                                showsHorizontalScrollIndicator={false}
                                showsVerticalScrollIndicator={false}
                                showsButtons={false}
                                showsPagination={false}
                            >
                                <View style={styles.slide1}>
                                    <Image
                                        source={Cabbage}
                                        style={styles.image}
                                    />
                                </View>
                                <View style={styles.slide1}>
                                    <Image
                                        source={Cabbage}
                                        style={styles.image}
                                    />
                                </View>
                                <View style={styles.slide1}>
                                    <Image
                                        source={Cabbage}
                                        style={styles.image}
                                    />
                                </View>
                            </Swiper>
                        </View>
                        {/* SKU */}
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                            <View style={styles.sku}>
                                <Text style={styles.skuText}>SKU: {this.state.product.sku}</Text>
                            </View>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <View style={[styles.sliderIndicator, this.state.slideStatus[0] ? styles.activeIndicator : styles.inactiveIndicator, { marginRight: 10 }]}>
                                </View>
                                <View style={[styles.sliderIndicator, this.state.slideStatus[1] ? styles.activeIndicator : styles.inactiveIndicator, { marginRight: 10 }]}>
                                </View>
                                <View style={[styles.sliderIndicator, this.state.slideStatus[2] ? styles.activeIndicator : styles.inactiveIndicator]}>
                                </View>
                            </View>
                        </View>

                        {/* Rating */}
                        <View>
                            <Text style={styles.productName}>{this.state.product.name} <Text style={styles.itemCount}>(Each One)</Text></Text>
                            {/* <ApnaRatingStar /> */}
                            <ApnaRatingStar rating={3} />
                        </View>

                        {/* Description */}
                        <View style={{ paddingTop: 15, paddingBottom: 15, marginTop: 30, borderBottomWidth: 2, borderTopWidth: 2, borderColor: THEME.LIGHT_GRAY, }}>
                            <Text>Lemons are popular for adding flavour to teas, meals and desserts. Use the juice or zest the peel to incorporate lemons into your favourite dish.</Text>
                        </View>

                        {/* Price Details */}
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingTop: 15, paddingBottom: 15, borderBottomWidth: 2, borderColor: THEME.LIGHT_GRAY }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <Text style={styles.priceSymbol}>$</Text>
                                    <Text style={styles.price}>
                                        0.99
                            </Text>
                                </View>
                                <Text style={styles.offerPrice}>
                                    $ 0.99
                            </Text>

                                <View style={styles.offer}>
                                    <Text style={styles.offerText}>10% OFF</Text>
                                </View>
                            </View>
                            <View>
                                <ApnaQuantitySelector
                                    emitQuantity={this.setQuantity.bind(this)}
                                />
                            </View>
                        </View>

                        {/* Product Details */}
                        <View style={styles.productDetails}>
                            <Text style={styles.detailsHeading}>About this product</Text>
                            <Text style={styles.description}>
                                {this.state.productDetails}
                            </Text>
                        </View>

                        {/* Sggesstions */}
                        <View style={styles.suggestions}>
                            <View>
                                <Text style={styles.suggestionHeading}>You may also be interested in</Text>
                                <View style={styles.borderLine}></View>
                            </View>
                            <FlatList
                                contentContainerStyle={{ flexGrow: 1, paddingLeft: 0, paddingRight: 20 }}
                                horizontal
                                showsHorizontalScrollIndicator={false}
                                data={this.state.productList}
                                renderItem={renderItem}
                                keyExtractor={(item) => item.id}
                                extraData={this.state}
                            />
                        </View>

                    </View>
                </ScrollView>
                <Footer >
                    {/* Footer */}
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <View style={{ width: '50%' }}>
                            <ApnaButton
                            />
                        </View>
                        <View style={{ width: '50%' }}>
                            <ApnaButton
                                isCartButton={true}
                            />
                        </View>
                    </View>

                </Footer>
            </SafeAreaView>
        );
    }
}


const styles = StyleSheet.create({
    image: {
        width: '100%',
        height: windowHeight * 0.33
    },
    profilePage: {
        flex: 1,
        backgroundColor: THEME.BLACK,
    },
    header: {
        backgroundColor: 'red',
        paddingLeft: 24,
        paddingRight: 24,
        borderWidth: 0,
        elevation: 0,
    },
    container: {
        flex: 1,
    },
    categoryHeader: {
        marginLeft: 20,
        marginTop: 40,
        marginRight: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    sku: {
        marginTop: 20,
        marginBottom: 20,
    },
    skuText: {
        fontSize: scaleFont(12),
        color: THEME.SECONDARY_TEXT,
    },
    heading: {
        fontSize: scaleFont(18),
    },
    hederContainer: {

    },
    itemCount: {
        color: THEME.SECONDARY_TEXT,
        fontSize: scaleFont(12),
    },
    productName: {
        fontSize: scaleFont(20),
        marginBottom: 10,
    },
    price: {
        fontSize: scaleFont(28),
    },
    priceSymbol: {
        fontSize: scaleFont(16),
        marginRight: 3,
        marginTop: 5,
    },
    offerPrice: {
        fontSize: scaleFont(12),
        textDecorationLine: 'line-through',
        textDecorationStyle: 'solid',
        color: THEME.SECONDARY_TEXT,
        marginLeft: 8,
    },
    offer: {
        backgroundColor: THEME.GREEN,
        width: 70,
        height: 20,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 6,
        marginLeft: 10,
    },
    offerText: {
        fontSize: scaleFont(10.5),
        color: THEME.WHITE,
    },
    productDetails: {
        marginTop: 20,
    },
    detailsHeading: {
        fontSize: scaleFont(14),
        fontWeight: 'bold'
    },
    description: {
        marginTop: 12,
    },
    suggestions: {
        marginTop: 20,
    },
    borderLine: {
        backgroundColor: THEME.ACTIVE_TEXT,
        width: 25,
        height: 1.5,
        marginTop: 7,
    },
    suggestionHeading: {
        fontSize: scaleFont(14),
        fontWeight: 'bold',
    },
    marginRight5: {
        marginRight: 10,
    },
    wrapper: {
        height: 250,
        backgroundColor: 'red',

    },
    slide1: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#9DD6EB'
    },
    slide2: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#97CAE5'
    },
    slide3: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#92BBD9'
    },
    text: {
        color: '#fff',
        fontSize: 30,
        fontWeight: 'bold'
    },
    sliderIndicator: {
        height: 4, width: 20, borderRadius: 100,
    },
    inactiveIndicator: {
        backgroundColor: '#E5DEDA',
    },
    activeIndicator: {
        backgroundColor: '#F15C25',
    }
}); 