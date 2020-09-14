import { Footer } from 'native-base';
import React, { Component } from "react";
import { ActivityIndicator, SafeAreaView, StyleSheet, Text, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import BottomNavigator from '../../components/orgainsms/bottomNavigator';
import CategorySelector from '../../components/orgainsms/categorySelector';
import ApnaProductsContainer from '../../components/orgainsms/productsContainer';
import { getCategoryProducts, getSubcategories } from '../../services/products';
import { THEME } from '../../styles/colors';
import HomeHeader from './header';

export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isCategorySelected: false,
            categoryList: [],
            diliProducts: [],
            coffeeProducts: [],
            fruitsProducts: [],
            loading: true,
        };
        this.getsubCategory();
    }
    navigateToCategory(item) {
        this.props.navigation.navigate('Category', {
            categoryList: this.state.categoryList,
            item: item,
        });
    }

    navigateToCatgoryList(items, heading) {
        this.props.navigation.navigate('ProductListing', {
            productList: items,
            heading: heading,
        })
    }

    navigateToProductDetails(item) {
        this.props.navigation.navigate('ProductDetails', {
            productDetails: item
        })
    }

    // Functionality to get the categories and its products
    async getsubCategory() {
        this.setState({
            loading: true,
        });
        getSubcategories().then(data => {
            this.setState({
                categoryList: data,
            }, () => {
                // Get Home page data with random categories as no api for home page
                this.getSelectedCategoryProducts('dili', data[0].term_id);
                this.getSelectedCategoryProducts('coffee', data[7].term_id);
                this.getSelectedCategoryProducts('fruits', data[3].term_id);
            })
        }).catch(err => {
            this.showErrorToast();
        })
    }

    async getSelectedCategoryProducts(key, id) {
        getCategoryProducts(id).then(data => {
            this.setProducts(key, data);
        }).catch(err => {
            this.setState({
                loading: false,
            })
            this.showErrorToast();
        })
    }

    setProducts(key, data) {
        switch (key) {
            case 'dili':
                this.setState({
                    diliProducts: data,
                });
                break;
            case 'coffee':
                this.setState({
                    coffeeProducts: data,
                })
                break;
            case 'fruits':
                this.setState({
                    fruitsProducts: data,
                    loading: false,
                })
                break;
        }
    }

    render() {
        return (
            <SafeAreaView style={styles.container}>
                <ScrollView style={styles.home}
                    stickyHeaderIndices={[0]}
                    showsVerticalScrollIndicator={false}
                >
                    <View
                        style={styles.headerContainer}>
                        <View style={styles.marginX20}>
                            <HomeHeader />
                        </View>
                        <View style={styles.marginTop10}>
                            <CategorySelector
                                categoryList={this.state.categoryList}
                                isSwitchRequired={false}
                                selectedCategory={(item) => {
                                    this.navigateToCategory(item);
                                }} />
                        </View>
                    </View>
                    {this.state.loading ?
                        (<View style={styles.loader}>
                            <ActivityIndicator
                                color={THEME.PRIMARY}
                                size='large'
                            /></View>) :
                        (
                            <View>
                                <ApnaProductsContainer
                                    selectedItem={(item) => { this.navigateToProductDetails(item) }}
                                    productList={this.state.diliProducts}
                                    navigateTocategory={this.navigateToCatgoryList.bind(this)}
                                    heading={"Weekly Special"}
                                />
                                <ApnaProductsContainer
                                    selectedItem={(item) => { this.navigateToProductDetails(item) }}
                                    productList={this.state.coffeeProducts}
                                    navigateTocategory={this.navigateToCatgoryList.bind(this)}
                                    heading={"Featured Products"}
                                />
                                <ApnaProductsContainer
                                    selectedItem={(item) => { this.navigateToProductDetails(item) }}
                                    productList={this.state.fruitsProducts}
                                    navigateTocategory={this.navigateToCatgoryList.bind(this)}
                                    heading={"Top Seller"}
                                />
                            </View>)}
                </ScrollView>
                <Footer style={styles.footer}>
                    <View style={styles.alignCenter}>
                        <View style={styles.width100}>
                            <BottomNavigator />
                        </View>
                    </View>

                </Footer>
            </SafeAreaView>
        );
    }
}


const styles = StyleSheet.create({
    header: {
        paddingLeft: 24,
        paddingRight: 24,
        borderWidth: 0,
        elevation: 0,
    },
    container: {
        flex: 1,
    },
    headerContainer: {
        zIndex: 10,
        backgroundColor: THEME.SECONDARY,
        paddingTop: 45,
    },
    marginX20: {
        marginLeft: 20, marginRight: 20,
    },
    marginTop10: {
        marginTop: 10,
    },
    home: {
        flex: 1,
        marginBottom: 20,
    },
    loader: {
        flex: 1,
        marginTop:30,
        justifyContent: 'center',
        alignItems: 'center',
    },
    footer: {
        backgroundColor:'transparent',
    },
    alignCenter: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    width100: {
        width: '100%',
    }
});