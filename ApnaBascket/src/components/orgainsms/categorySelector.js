import React, { Component } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import Constants from '../../constants';
import ApnaCategoryItem from '../atoms/categoryItem';

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

    componentDidMount() {

    }

    async changeActiveCategory(selectedItem) {
        console.log('not required outsidee-->');
        if (this.state.isSwitchRequired) {
            console.log('not required-->');
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
        borderColor: '#E5DEDA',
        backgroundColor: '#FBF7F4',
        alignItems: 'center',
        justifyContent: 'center',
        height: 50,
    }
});
