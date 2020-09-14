import { Footer } from 'native-base';
import React, { Component } from "react";
import { BackHandler, Dimensions, FlatList, Image, SafeAreaView, Share, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import HTML from 'react-native-render-html';
import Swiper from 'react-native-swiper';
import { defineIcon } from '../../assets/images/svg';
import ApnaButton from '../../components/atoms/Buttons';
import ApnaItemCard from '../../components/atoms/itemCard';
import ApnaQuantitySelector from '../../components/atoms/quantitySelector';
import ApnaRatingStar from '../../components/atoms/ratingStar';
import Constants from '../../constants';
import { getProductDetails } from '../../services/products';
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
            product: this.props.navigation.state.params.productDetails || {},
            quantity: 0,
            slideIndex: 0,
            slideStatus: [true, false, false, false, false],
            productList: Constants.ALL_PRODUCTS,
            productDescription: Constants.PRODUCT_DESCRIPTION,
        };
        this.backIconClicked = this.backIconClicked.bind(this);
    }

    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
    }

    async getProductsDetails(id) {
        this.setState({
            loading: true,
        })
        getProductDetails(id).then(data => {
            this.setState({
                product: data,
                loading: false,
            })
        }).catch(err => {
            this.setState({
                loading: false,
            })
            this.showErrorToast();
        })
    }

    async onShare() {
        try {
            await Share.share({
                message: 'Test',
            });
        } catch (error) {
            this.showErrorToast();
        }
    }

    handleBackButtonClick() {
        this.props.navigation.goBack(null);
        return true;
    }

    backIconClicked() {
        this.props.navigation.goBack(null);
    }


    showErrorToast() {
        Toast.show({
            text: "Something went wrong!",
            type: "danger",
        })
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
            productDetails: item
        })
    }

    calculateOfferPercentage(price, salePrice) {
        return Math.round((price - salePrice) / price * 100);
    }

    // functionality to set slide indicator action or inactive
    slideChange(activeIndex) {
        this.setState({
            slideIndex: activeIndex,
        })
        const slide = this.state.slideStatus.map((status, index) => {
            return index == activeIndex;
        })
        this.setState({
            slideStatus: slide,
        })
    }

    getCarouselImages(images) {
        let imageList = [];
        for (let i = 0; i < images.length; i++) {
            imageList.push(
                <View style={styles.slide}>
                    <Image
                        source={{ uri: images[i].src }}
                        style={styles.image}
                    />
                </View>
            )
        }
        return imageList;
    }

    getCarouselIndicators(images) {
        let indicatorList = [];
        for (let index = 0; index < images.length; index++) {
            indicatorList.push(
                <View style={[styles.sliderIndicator, this.state.slideStatus[index] ? styles.activeIndicator : styles.inactiveIndicator, index === images.length - 1 ? '' : styles.marginRight10]}>
                </View>
            )
        }
        return indicatorList;
    }

    render() {
        const renderItem = ({ item, index }) => {
            return (
                <View style={styles.marginRight5}>
                    <ApnaItemCard
                        productDetails={item}
                        selectedProductItem={(item) => { this.navigateToProductDetails(item) }}
                    />
                </View>
            );
        };
        let { product } = this.state;
        return (
            <SafeAreaView style={styles.container}>
                <ScrollView style={styles.productDetails}
                    stickyHeaderIndices={[0]}
                    showsVerticalScrollIndicator={false}
                >
                    {/* Heading */}
                    <View
                        style={styles.header}>
                        <View style={styles.headerSection}>
                            <TouchableOpacity onPress={() => { this.backIconClicked() }} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }} style={styles.backIcon}>
                                {defineIcon('arrow-back', 'black', 10, 18)}
                            </TouchableOpacity>
                            <Text style={styles.heading}>{product.name}</Text>

                        </View>
                    </View>
                    {/* Product details */}
                    <View style={{ margin: 20 }}>
                        <View>
                            <Swiper style={styles.wrapper}
                                onIndexChanged={(index) => {
                                    this.slideChange(index);
                                }}
                                dotColor="transparent"
                                activeDotColor="transparent"
                                showsHorizontalScrollIndicator={false}
                                showsVerticalScrollIndicator={false}
                                showsButtons={false}
                                showsPagination={false}
                            >
                                {this.getCarouselImages(product.images)}
                            </Swiper>
                        </View>
                        {/* SKU */}
                        <View style={styles.skuSection}>
                            <View style={styles.sku}>
                                <Text style={styles.skuText}>SKU: {product.sku}</Text>
                            </View>

                            {/* carousel indicator */}
                            <View style={styles.alignCenter}>
                                {this.getCarouselIndicators(product.images)}
                            </View>
                        </View>

                        {/* Rating */}
                        <View style={styles.ratingContainer}>
                            <View>
                                <Text style={styles.productName}>{this.state.product.name} </Text>
                                <ApnaRatingStar rating={product.rating_count} />
                            </View>
                            <View>
                                <TouchableOpacity onPress={() => this.onShare()} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
                                    {defineIcon('share')}
                                </TouchableOpacity>
                            </View>
                        </View>

                        {/* Description */}
                        {product.short_description.length > 0 ?
                            (<View style={styles.productDescription}>
                                <HTML html={product.short_description} />
                            </View>) : null}

                        {/* Price Details */}
                        <View style={styles.priceDetails}>
                            <View style={styles.alignCenter}>
                                <View style={styles.alignCenter}>
                                    <Text style={styles.priceSymbol}>$</Text>
                                    <Text style={styles.price}>
                                        {product.sale_price ? product.sale_price : product.regular_price}
                                    </Text>
                                </View>
                                {product.sale_price ?
                                    (<View style={styles.flexRow}>
                                        <Text style={styles.offerPrice}>
                                            $ {product.regular_price}
                                        </Text>

                                        <View style={styles.offer}>
                                            <Text style={styles.offerText}>{this.calculateOfferPercentage(product.regular_price, product.sale_price)}% OFF</Text>
                                        </View>
                                    </View>) : null}
                            </View>
                            <View>
                                <ApnaQuantitySelector
                                    emitQuantity={this.setQuantity.bind(this)}
                                />
                            </View>
                        </View>

                        {/* Product Details */}
                        <View style={styles.aboutProduct}>
                            <Text style={styles.detailsHeading}>About this product</Text>
                            <Text style={styles.description}>
                                {this.state.productDescription}
                            </Text>
                        </View>

                        {/* Suggesstions */}
                        <View style={styles.suggestions}>
                            <View>
                                <Text style={styles.suggestionHeading}>You may also be interested in</Text>
                                <View style={styles.borderLine}></View>
                            </View>
                            <FlatList
                                contentContainerStyle={styles.suggestionList}
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

                {/* Footer Buttons */}
                <Footer style={styles.footer}>
                    {/* Footer */}
                    <View style={styles.alignCenter}>
                        <View style={styles.width50}>
                            <ApnaButton
                            />
                        </View>
                        <View style={styles.width50}>
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
        fontWeight: 'bold',
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
        height: 25,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 6,
        marginLeft: 10,
    },
    offerText: {
        fontSize: scaleFont(10.5),
        color: THEME.WHITE,
    },
    aboutProduct: {
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
        backgroundColor: 'transparent',
    },
    slide: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent',
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
        backgroundColor: THEME.LIGHT_GRAY,
    },
    activeIndicator: {
        backgroundColor: THEME.DARK_ORANGE,
    },
    marginRight10: {
        marginRight: 10,
    },
    productDetails: {
        backgroundColor: THEME.WHITE,
        flex: 1,
    },
    header: {
        paddingTop: 35,
        paddingBottom: 10,
        borderBottomWidth: 2,
        borderBottomColor: THEME.LIGHT_GRAY,
        zIndex: 100,
        backgroundColor: THEME.SECONDARY
    },
    footer: {

    },
    priceDetails: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingTop: 15,
        paddingBottom: 15,
        borderBottomWidth: 2,
        borderColor: THEME.LIGHT_GRAY,
    },
    alignCenter: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    flexRow: {
        flexDirection: 'row',
    },
    suggestionList: {
        flexGrow: 1,
        paddingLeft: 0,
        paddingRight: 20,
    },
    width50: {
        width: '50%',
    },
    productDescription: {
        borderBottomWidth: 2,
        borderColor: THEME.LIGHT_GRAY,
        paddingTop: 15,
    },
    ratingContainer: {
        borderBottomWidth: 2,
        borderColor: THEME.LIGHT_GRAY,
        paddingBottom: 15,
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
    },
    skuSection: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    headerSection: {
        marginLeft: 20,
        marginRight: 20,
        paddingTop: 50,
        paddingBottom: 5,
        flexDirection: 'row',
        alignItems: 'center',
    },
    backIcon: {
        marginRight: 20,
        height: 30,
        width: 20,
        justifyContent: 'center',
    }
}); 