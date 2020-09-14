import { Footer, Toast } from 'native-base';
import React, { Component } from "react";
import { ActivityIndicator, BackHandler, Dimensions, SafeAreaView, StyleSheet, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import BottomNavigator from '../../components/orgainsms/bottomNavigator';
import CategorySelector from '../../components/orgainsms/categorySelector';
import ApnaProductsContainer from '../../components/orgainsms/productsContainer';
import { getCategoryProducts } from '../../services/products';
import { THEME } from '../../styles/colors';
import HomeHeader from '../home/header';
const windowHeight = Dimensions.get('window').height;

export default class Category extends Component {
    constructor(props) {
        super(props);
        this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
        this.state = {
            isCategorySelected: true,
            productList: [],
            productCategoryName: '',
            activeItem: '',
            categoryList: [],
            loading: false,
        };
        this.backIconClicked = this.backIconClicked.bind(this);
    }
    componentWillMount() {
        this.setState({
            activeItem: this.props.navigation.state.params.item,
            productCategoryName: this.props.navigation.state.params.item.name,
            categoryList: this.props.navigation.state.params.categoryList
        })
    }

    componentDidMount() {
        this.getSelectedCategoryProducts(this.props.navigation.state.params.item);
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

    navigateToCatgoryList(items, heading) {
        this.props.navigation.navigate('ProductListing', {
            productList: items,
            heading: heading,
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

    // To get the selected category products
    async getSelectedCategoryProducts(item) {
        this.setState({
            loading: true,
        })
        getCategoryProducts(item.term_id).then(data => {
            this.setState({
                productList: data,
                loading: false,
            })
        }).catch(err => {
            this.setState({
                loading: false,
            })
            this.showErrorToast();
        })
    }

    navigateToProductDetails(item) {
        this.props.navigation.navigate('ProductDetails', {
            productDetails: item
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

                        {/* Category filter */}
                        <View style={{ marginTop: 10 }}>
                            <CategorySelector
                                isSwitchRequired={true}
                                activeItem={this.state.activeItem}
                                categoryList={this.state.categoryList}
                                selectedCategory={(item) => {
                                    this.setState({
                                        isCategorySelected: true,
                                        activeItem: item,
                                        productCategoryName: item.name,
                                    })
                                    this.getSelectedCategoryProducts(item);
                                }} />
                        </View>
                    </View>

                    {
                        this.state.loading ? (<View style={styles.loader}>
                            <ActivityIndicator
                                color={THEME.PRIMARY}
                                size='large'
                            />
                        </View>) :
                            (<ApnaProductsContainer
                                selectedItem={(item) => { this.navigateToProductDetails(item) }}
                                productList={this.state.productList}
                                navigateTocategory={this.navigateToCatgoryList.bind(this)}
                                heading={this.state.productCategoryName}
                            />)
                    }
                </ScrollView>

                {/* Footer */}
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
    profilePage: {
        flex: 1,
        backgroundColor: THEME.BLACK,
    },
    container: {
        flex: 1,
    },
    header: { zIndex: 10, backgroundColor: THEME.SECONDARY, paddingTop: 45 },
    marginX20: {
        marginLeft: 20, marginRight: 20,
    },
    alignCenter: {
        flexDirection: 'row', alignItems: 'center',
    },
    footer: {
        backgroundColor: 'transparent',
    },
    loader:{
        marginTop: 30,
    },
    width100: {
        width: '100%',
    }
});