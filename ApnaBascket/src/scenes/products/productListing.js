import { Footer } from 'native-base';
import React, { Component } from "react";
import { BackHandler, FlatList, SafeAreaView, StyleSheet, Text, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import ApnaItemCard from '../../components/atoms/itemCard';
import BottomNavigator from '../../components/orgainsms/bottomNavigator';
import { THEME } from '../../styles/colors';
import { scaleFont } from '../../styles/mixins';
import HomeHeader from '../home/header';

export default class ProductsListing extends Component {
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
        this.setState({
            productCategoryName: this.props.navigation.state.params.heading,
            productList: this.props.navigation.state.params.productList,
        })
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
            productDetails: item
        })
    }

    backIconClicked() {
        this.props.navigation.goBack(null);
    }
    render() {
        const renderItem = ({ item, index }) => {
            return (
                <ApnaItemCard
                    productDetails={item}
                    selectedProductItem={(item) => { this.navigateToProductDetails(item) }}
                />
            );
        };
        return (
            <SafeAreaView style={styles.container}>
                <ScrollView style={styles.productListing}
                    stickyHeaderIndices={[0]}
                    showsVerticalScrollIndicator={false}
                >
                    {/* Header */}
                    <View
                        style={styles.header}>
                        <View style={styles.marginX20}>
                            <HomeHeader
                                backIconClicked={this.backIconClicked.bind(this)}
                                isCategoryHeader={true} />
                        </View>
                    </View>

                    {/* Products category name */}
                    <View style={styles.categoryHeader}>
                        <View>
                            <Text style={{ color: THEME.ACTIVE_TEXT, fontSize: scaleFont(20) }}>{this.state.productCategoryName}</Text>
                            <View style={styles.bottomLine}></View>
                        </View>
                        <Text style={styles.arrowRight}>
                        </Text>
                    </View>

                    {/* Products */}
                    <FlatList
                        contentContainerStyle={styles.productList}
                        showsHorizontalScrollIndicator={false}
                        data={this.state.productList}
                        renderItem={renderItem}
                        keyExtractor={(item) => item.id}
                        extraData={this.state}
                    />
                </ScrollView>
                <Footer style={styles}>
                    <View style={styles.bottomNavigator}>
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
    },
    footer: {
        backgroundColor: 'transparent',
    },
    bottomNavigator: {
        flexDirection: 'row', alignItems: 'center',
    },
    width100: {
        width: '100%',
    },
    productListing: {
        flex: 1,
        marginBottom: 20,
    }
});