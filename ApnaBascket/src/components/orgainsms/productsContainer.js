import React, { Component } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { defineIcon } from '../../assets/images/svg';
import Constants from '../../constants';
import { THEME } from '../../styles/colors';
import { scaleFont } from '../../styles/mixins';
import ApnaEmptyCard from '../atoms/emptyCard';
import ApnaItemCard from '../atoms/itemCard';

export default class ApnaProductsContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            activeCategory: '',
            categoryList: Constants.CATEGORY_LIST,
            heading: this.props.heading || 'Test',
            itemsToShow: Constants.MAX_NUMBER_ITEMS_TO_SHOW,
            isHeaderRequired: this.props.isHeaderRequired || true,
        };
    }

    componentDidMount() {
        this.isExtraCardRequired();
    }
    isExtraCardRequired() {
        this.setState((prevState) => ({
            isExtraCardRequired: prevState.categoryList.length > prevState.itemsToShow
        }));
    }

    navigateToCategoryList(item) {
        this.props.navigateTocategory(item);
    }
    render() {
        const renderItem = ({ item, index }) => {
            return (
                <View>
                    {this.state.isExtraCardRequired && index === this.state.itemsToShow - 1 ?
                        (<View>
                            <ApnaEmptyCard />
                        </View>) :
                        (<View style={{ marginLeft: 10 }}>
                            <ApnaItemCard
                                selectedProductItem={(item) => { this.props.selectedItem(item) }}
                            />
                        </View>)}
                </View>
            );
        };
        return (
            <View>
                <View style={styles.categoryHeader}>
                    <View>
                        <Text style={styles.productHeading}>{this.state.heading}</Text>
                        <View style={styles.borderLine}></View>
                    </View>
                    <Text onPress={() => { this.navigateToCategoryList(this.state.categoryList) }} style={styles.arrowBack}>
                        View all
                        {defineIcon('arrow-right')}
                    </Text>
                </View>
                <FlatList
                    contentContainerStyle={styles.productsList}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    data={this.state.categoryList.slice(0, this.state.itemsToShow)}
                    renderItem={renderItem}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id}
                    extraData={this.state}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    categoryHeader: {
        marginLeft: 20,
        marginTop: 40,
        marginRight: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    prouctHeading: {
        color: THEME.ACTIVE_TEXT,
        fontSize: scaleFont(25),
    },
    borderLine: {
        backgroundColor: THEME.ACTIVE_TEXT,
        width: 25,
        height: 1.5,
        marginTop: 7,
    },
    arrowBack: {
        color: THEME.ACTIVE_TEXT,
        fontSize: scaleFont(13),
    },
    productsList: {
        flexGrow: 1,
        paddingLeft: 10,
        paddingRight: 20,
    }
});
