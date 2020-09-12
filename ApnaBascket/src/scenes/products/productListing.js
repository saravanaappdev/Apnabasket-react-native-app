import { Footer } from 'native-base';
import React, { Component } from "react";
import { BackHandler, FlatList, SafeAreaView, StyleSheet, Text, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { defineIcon } from '../../assets/images/svg';
import ApnaItemCard from '../../components/atoms/itemCard';
import BottomNavigator from '../../components/orgainsms/bottomNavigator';
import Constants from '../../constants';
import { THEME } from '../../styles/colors';
import { scaleFont } from '../../styles/mixins';
import HomeHeader from '../home/header';

export default class ProductsListing extends Component {
    constructor(props) {
        super(props);
        this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
        this.state = {
            isCategorySelected: true,
            categoryList: Constants.CATEGORY_LIST,
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
        this.props.navigation.goBack(null);
        return true;
    }

    navigateToProductDetails(item) {
        this.props.navigation.navigate('ProductDetails', {
            item: item
        })
    }

    backIconClicked() {
        this.props.navigation.goBack(null);
    }
    render() {
        const renderItem = ({ item, index }) => {
            return (
                <ApnaItemCard
                    selectedProductItem={(item) => { this.navigateToProductDetails(item) }}
                />
            );
        };
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
                    </View>
                    <View style={styles.categoryHeader}>
                        <View>
                            <Text style={{ color: THEME.ACTIVE_TEXT, fontSize: scaleFont(20) }}>Vegetables</Text>
                            <View style={styles.bottomLine}></View>
                        </View>
                        <Text onPress={() => { this.navigateToCategoryList(this.state.categoryList) }} style={styles.arrowRight}>
                            View all
                        {defineIcon('arrow-right')}
                        </Text>
                    </View>
                    <FlatList
                        contentContainerStyle={styles.productList}
                        showsHorizontalScrollIndicator={false}
                        data={this.state.categoryList}
                        renderItem={renderItem}
                        keyExtractor={(item) => item.id}
                        extraData={this.state}
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
    profilePage: {
        flex: 1,
        backgroundColor: THEME.BLACK,
    },
    header: {
        backgroundColor: THEME.SECONDARY,
        paddingTop: 45,
        paddingBottom: 10,
        borderBottomWidth: 2,
        borderBottomColor: THEME.LIGHT_GRAY,
        zIndex: 100,
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
    marginX20: {
        marginLeft: 20, marginRight: 20,
    },
    productList: {
        flex: 1,
        zIndex: 2,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-evenly',
        // paddingLeft: 10,
        // paddingRight: 20,
    },
    bottomLine: {
        backgroundColor: THEME.ACTIVE_TEXT,
        width: 25,
        height: 1.5,
        marginTop: 7,
    },
    arrowRight: {
        color: THEME.ACTIVE_TEXT,
        fontSize: scaleFont(13),
    }
});