import { Toast } from 'native-base';
import React, { Component } from "react";
import { BackHandler, SafeAreaView, StyleSheet, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import CategorySelector from '../../components/orgainsms/categorySelector';
import ApnaProductsContainer from '../../components/orgainsms/productsContainer';
import { getAllProducts } from '../../services/products';
import { THEME } from '../../styles/colors';
import HomeHeader from '../home/header';

export default class Category extends Component {
    constructor(props) {
        super(props);
        this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
        this.state = {
            isCategorySelected: true,
            productList: [],
        };
        this.backIconClicked = this.backIconClicked.bind(this);
    }

    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
        this.getProducts();
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
    }

    handleBackButtonClick() {
        console.log('go backk');
        this.props.navigation.goBack(null);
        return true;
    }

    navigateToCatgoryList(item) {
        this.props.navigation.navigate('ProductListing', {
            item: item
        })
    }

    backIconClicked() {
        this.props.navigation.navigate('Home');
    }

    showErrorToast() {
        Toast.show({
            text: "Something went wrong!",
            type: "danger",
        })
    }

    async getProducts() {
        await getAllProducts().then(data => {
            this.setState({
                productList: data,
            })
        }).catch(err => {
            this.showErrorToast();
        })
    }
    navigateToProductDetails(item) {
        this.props.navigation.navigate('ProductDetails', {
            item: item
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
                        style={styles.header}>
                        <View style={styles.marginX20}>
                            <HomeHeader
                                backIconClicked={this.backIconClicked.bind(this)}
                                isCategoryHeader={true} />
                        </View>
                        <View style={{ marginTop: 10 }}>
                            <CategorySelector selectedCategory={(item) => {
                                this.setState({
                                    isCategorySelected: true,
                                })
                            }} />
                        </View>
                    </View>

                    <ApnaProductsContainer
                        selectedItem={(item) => { this.navigateToProductDetails(item) }}
                        navigateTocategory={this.navigateToCatgoryList.bind(this)}
                        heading={"Fruits"}
                    />

                    <ApnaProductsContainer
                        selectedItem={(item) => { this.navigateToProductDetails(item) }}
                        navigateTocategory={this.navigateToCatgoryList.bind(this)}
                        heading={"Vegetables"}
                    />
                </ScrollView>
            </SafeAreaView>
        );
    }
}


const styles = StyleSheet.create({
    profilePage: {
        flex: 1,
        backgroundColor: THEME.BLACK,
    },
    header: { zIndex: 10, backgroundColor: THEME.SECONDARY, paddingTop: 45 },
    container: {
        flex: 1,
    },
    marginX20: {
        marginLeft: 20, marginRight: 20,
    },
});