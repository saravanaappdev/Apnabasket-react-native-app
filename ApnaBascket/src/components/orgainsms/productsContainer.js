import React, { Component } from 'react';
import { Dimensions, FlatList, StyleSheet, Text, View } from 'react-native';
import { defineIcon } from '../../assets/images/svg';
import Constants from '../../constants';
import { THEME } from '../../styles/colors';
import { scaleFont } from '../../styles/mixins';
import ApnaEmptyCard from '../atoms/emptyCard';
import ApnaItemCard from '../atoms/itemCard';
import ApnaNoDataCard from '../atoms/noDataCard';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default class ApnaProductsContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            activeCategory: '',
            productList: this.props.productList || [],
            heading: this.props.heading || '',
            itemsToShow: Constants.MAX_NUMBER_ITEMS_TO_SHOW,
            isHeaderRequired: this.props.isHeaderRequired || true,
        };
    }

    componentDidMount() {
        this.isExtraCardRequired();
    }
    isExtraCardRequired() {
        this.setState((prevState) => ({
            isExtraCardRequired: prevState.productList.length > prevState.itemsToShow
        }));
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (prevState.heading != nextProps.heading) {
            return {
                heading: nextProps.heading,
            };
        }
        if (prevState.productList != nextProps.productList && nextProps.productList.length) {
            return {
                productList: nextProps.productList,
            };
        }
    }

    navigateToProductList(item, heading) {
        this.props.navigateTocategory(item, heading);
    }
    convertHTMLToText(text) {
        return text.replace('&amp;', '&');
    }
    render() {
        const renderItem = ({ item, index }) => {
            return (
                // To show +5 more products card when products count more than limit
                <View>
                    {this.state.isExtraCardRequired && index === this.state.itemsToShow - 1 ?
                        (<View>
                            <ApnaEmptyCard />
                        </View>) :
                        (<View style={{ marginLeft: 10 }}>
                            <ApnaItemCard
                                productDetails={item}
                                selectedProductItem={(item) => { this.props.selectedItem(item) }}
                            />
                        </View>)}
                </View>
            );
        };
        return (
            <View>
                {this.state.productList.length > 0 ?
                    (<View style={styles.categoryHeader}>
                        <View>
                            <Text style={styles.productHeading}>{this.convertHTMLToText(this.state.heading)}</Text>
                            <View style={styles.borderLine}></View>
                        </View>
                        <Text onPress={() => {
                            this.navigateToProductList(this.state.productList, this.state.heading)
                        }} style={styles.arrowBack}>
                            View all
                        {defineIcon('arrow-right')}
                        </Text>
                    </View>)
                    : null}
                <FlatList
                    contentContainerStyle={styles.productsList}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    data={this.state.productList.slice(0, this.state.itemsToShow)}
                    ListEmptyComponent={
                        <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1, height: windowHeight / 2, }}>
                            <ApnaNoDataCard />
                        </View>
                    }
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
        marginTop: 30,
        marginRight: 20,
        marginBottom: 10,
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
    },
    productHeading: {
        fontSize: scaleFont(20),
    }
});
