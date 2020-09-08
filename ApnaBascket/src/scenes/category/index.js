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
        // this.props.navigation.goBack(null);
        this.props.navigation.navigate('Home');
        return true;
    }

    navigateToCatgoryList(item) {
        console.log('navigate tooo--->', item);
        this.props.navigation.navigate('Product', {
            item: item
        })
    }

    backIconClicked() {
        console.log('bac icons clieddkkk--->');
        this.props.navigation.navigate('Home');
    }

    async getProducts() {
        await getAllProducts().then(data => {
            console.log('dat---->', data);
        }).catch(err => {
            console.log('err--->', err);
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
                            <HomeHeader
                                backIconClicked={this.backIconClicked.bind(this)}
                                isCategoryHeader={true} />
                        </View>
                        <View style={{ marginTop: 10 }}>
                            <CategorySelector selectedCategory={(item) => {
                                console.log('category selected--->', item);
                                this.setState({
                                    isCategorySelected: true,
                                })
                            }} />
                        </View>
                    </View>

                    <ApnaProductsContainer
                        navigateTocategory={this.navigateToCatgoryList.bind(this)}
                        heading={"Fruits"}
                    />

                    <ApnaProductsContainer
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