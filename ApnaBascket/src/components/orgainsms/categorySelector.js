import React, { Component } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import Constants from '../../constants';
import ApnaCategoryItem from '../atoms/categoryItem';
import { THEME } from '../../styles/colors';

export default class ApnaCategorySelector extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            activeCategory: '',
            categoryList: this.props.categoryList || Constants.CATEGORY_LIST,
            isSwitchRequired: this.props.isSwitchRequired || true,
        };
    }

    async changeActiveCategory(selectedItem) {
        if (this.state.isSwitchRequired) {
            this.state.categoryList.map(item => {
                if (selectedItem.id === item.id) {
                    item.isActive = true;
                }
                else {
                    item.isActive = false;
                }
            })
            await this.setState({
                loading: true,
            })
        }
        this.props.selectedCategory(selectedItem)
    }
    render() {
        const renderItem = ({ item }) => {
            return (
                <ApnaCategoryItem
                    id={item.id}
                    categoryName={item.categoryName}
                    isActive={item.isActive}
                    categoryClicked={() => { this.changeActiveCategory(item) }}
                />
            );
        };
        return (
            <View style={styles.categorySelector}>
                <FlatList
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    data={this.state.categoryList}
                    renderItem={({ item }) => (
                        <ApnaCategoryItem
                            id={item.id}
                            categoryName={item.categoryName}
                            isActive={item.isActive}
                            categoryClicked={() => { this.changeActiveCategory(item) }}
                        />
                    )}
                    keyExtractor={(item) => item.id}
                    extraData={this.state}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    categorySelector: {
        flexDirection: 'row',
        borderWidth: 1,
        borderColor: THEME.LIGHT_GRAY,
        backgroundColor: THEME.SECONDARY,
        alignItems: 'center',
        justifyContent: 'center',
        height: 50,
    }
});
