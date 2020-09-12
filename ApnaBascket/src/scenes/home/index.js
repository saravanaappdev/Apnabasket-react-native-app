import { Footer } from 'native-base';
import React, { Component } from "react";
import { SafeAreaView, StyleSheet, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import BottomNavigator from '../../components/orgainsms/bottomNavigator';
import CategorySelector from '../../components/orgainsms/categorySelector';
import ApnaProductsContainer from '../../components/orgainsms/productsContainer';
import { getAllProducts, getSubcategories } from '../../services/products';
import { THEME } from '../../styles/colors';
import HomeHeader from './header';

export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isCategorySelected: false,
            categoryList: [],
        };
        this.getsubCategory();
    }
    navigateToCategory(item) {
        this.props.navigation.navigate('Category', {
            categoryList: this.state.categoryList,
            item: item,
        });
    }

    navigateToCatgoryList(item) {
        this.props.navigation.navigate('ProductListing', {
            item: item
        })
    }
    navigateToProductDetails(item) {
        this.props.navigation.navigate('ProductDetails', {
            item: item
        })
    }

    async getsubCategory() {
        getSubcategories().then(data => {
            console.log('get all subbbb ppcategoryyy++++++++++++--->', data);
            this.setState({
                categoryList: data,
            })
        }).catch(err => {
            console.log('err--->', err);
            this.showErrorToast();
        })
    }

    async getCategory() {
        // getProductDetails(694).then(data => {
        //     console.log('dataa details--->', data);
        //     this.setState({
        //         productList: data,
        //     })
        // }).catch(err => {
        //     console.log('err--->', err);
        //     this.showErrorToast();
        // })
        getAllProducts().then(data => {
            console.log('get all ppcategoryyy++++++++++++--->', data);
            this.setState({
                productList: data,
            })
        }).catch(err => {
            console.log('err--->', err);
            this.showErrorToast();
        })
    }

    render() {
        return (
            <SafeAreaView style={styles.container}>
                <ScrollView style={{ flex: 1 }}
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

                    <ApnaProductsContainer
                        selectedItem={(item) => { this.navigateToProductDetails(item) }}
                        navigateTocategory={this.navigateToCatgoryList.bind(this)}
                        heading={"Weekly Special"}
                    />

                    <ApnaProductsContainer
                        selectedItem={(item) => { this.navigateToProductDetails(item) }}
                        navigateTocategory={this.navigateToCatgoryList.bind(this)}
                        heading={"Featured Products"}
                    />

                    <ApnaProductsContainer
                        selectedItem={(item) => { this.navigateToProductDetails(item) }}
                        navigateTocategory={this.navigateToCatgoryList.bind(this)}
                        heading={"Fruits"}
                    />

                </ScrollView>
                <Footer style={{ backgroundColor: 'transparent' }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <View style={{ width: '100%' }}>
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
    }
});