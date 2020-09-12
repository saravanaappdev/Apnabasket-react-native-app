import React, { Component } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { THEME } from '../../styles/colors';
import ApnaCategoryItem from '../atoms/categoryItem';

export default class ApnaCategorySelector extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            activeItem: this.props.activeItem,
            activeCategory: '',
            categoryList: this.props.categoryList,
            isSwitchRequired: this.props.isSwitchRequired,
            changeActiveCategory: this.changeActiveCategory.bind(this),
        };
        this.initialData();
    }

    async initialData() {
        this.state.categoryList.map(item => {
            if (this.state.activeItem && this.state.activeItem.term_id === item.term_id) {
                item.isActive = true;
            }
            else {
                item.isActive = false;
            }
        })
        this.setState({
            loading: true,
        })
    }
    async changeActiveCategory(selectedItem) {
        if (this.state.isSwitchRequired) {
            this.state.categoryList.map(item => {
                if (selectedItem.term_id === item.term_id) {
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

    static getDerivedStateFromProps(nextProps, prevState) {
        if (prevState.categoryList != nextProps.categoryList) {
            console.log('prev--->', nextProps.categoryList);
            return {
                categoryList: nextProps.categoryList,
            };
        }
    }

    convertHTMLToText(text) {
        return text.replace('&amp;', '&');
    }
    render() {
        const renderItem = ({ item }) => {
            return (
                <ApnaCategoryItem
                    id={item.term_id}
                    categoryName={this.convertHTMLToText(item.name)}
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
                    renderItem={renderItem}
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
