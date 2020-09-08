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
        console.log('naviii--.>');
        this.props.navigation.navigate('Category', {
            item: item,
        });

    }
    navigateToCatgoryList(item) {
        console.log('navigate tooo--->', item);
        this.props.navigation.navigate('Category', {
            item: item
        })

    }
    render() {
        return (
            <SafeAreaView style={styles.container}>
                <ScrollView style={{ backgroundColor: 'white', flex: 1 }}
                    stickyHeaderIndices={[0]}
                    showsVerticalScrollIndicator={false}
                >
                    <View
                        style={{ zIndex: 10, backgroundColor: '#FBF7F4', paddingTop: 45 }}>
                        <View style={{ marginLeft: 20, marginRight: 20 }}>
                            <HomeHeader />
                        </View>
                        <View style={{ marginTop: 10 }}>
                            <CategorySelector
                                categoryList={Constants.CATEGORY_LIST}
                                isSwitchRequired={false}
                                selectedCategory={(item) => {
                                    console.log('category selected--->', item);
                                    this.navigateToCategory(item);
                                }} />
                        </View>
                    </View>

                    <ApnaProductsContainer
                        navigateTocategory={this.navigateToCatgoryList.bind(this)}
                        heading={"Fruits"}
                    />

                    <ApnaProductsContainer
                        heading={"Vegetables"}
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
});