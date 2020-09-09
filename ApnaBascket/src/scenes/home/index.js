import React, { Component } from "react";
import { SafeAreaView, StyleSheet, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import CategorySelector from '../../components/orgainsms/categorySelector';
import ApnaProductsContainer from '../../components/orgainsms/productsContainer';
import Constants from '../../constants';
import { THEME } from '../../styles/colors';
import HomeHeader from './header';

export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isCategorySelected: false,
        };
    }
    navigateToCategory(item) {
        this.props.navigation.navigate('Category', {
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
                                categoryList={Constants.CATEGORY_LIST}
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
                        heading={"Featured Products"}
                    />

                    <ApnaProductsContainer
                        heading={"Fruits"}
                    />

                </ScrollView>
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