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
        console.log('item--->', item);
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
                        (<View>
                            <ApnaItemCard
                            />
                        </View>)}
                </View>
            );
        };
        return (
            <View>
                <View style={styles.categoryHeader}>
                    <View>
                        <Text style={{ color: THEME.ACTIVE_TEXT, fontSize: scaleFont(20) }}>{this.state.heading}</Text>
                        <View style={{ backgroundColor: THEME.ACTIVE_TEXT, width: 25, height: 1.5, marginTop: 7 }}></View>
                    </View>
                    <Text onPress={() => { this.navigateToCategoryList(this.state.categoryList) }} style={{ color: THEME.ACTIVE_TEXT, fontSize: scaleFont(13) }}>
                        View all
                        {defineIcon('arrow-right')}
                    </Text>
                </View>
                <FlatList
                    contentContainerStyle={{ flexGrow: 1, paddingLeft: 10, paddingRight: 20 }}
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
    }
});
