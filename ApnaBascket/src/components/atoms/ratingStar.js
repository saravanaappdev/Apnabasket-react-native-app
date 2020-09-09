import { View } from 'native-base';
import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { defineIcon } from '../../assets/images/svg';
import Constants from '../../constants';
import { THEME } from '../../styles/colors';

export default class ApnaRatingStar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            rating: this.props.rating || 0,
            ratingCount: Constants.RATING_COUNT,
        };
    }
    render() {
        var ratings = [];
        for (let i = 0; i < 5; i++) {
            if (this.state.rating > i) {
                ratings.push(<View style={styles.marginRight5}>
                    {defineIcon('star')}
                </View>)
            }
            else {
                ratings.push(
                    <View style={styles.marginRight5}>
                        {defineIcon('inactive-star')}
                    </View>)
            }
        }
        return (
            <View style={styles.ratingStar}>
                {ratings}
            </View>)
    }
}

const styles = StyleSheet.create({
    ratingStar: {
        backgroundColor: THEME.WHITE,
        alignItems: 'center',
        flexDirection: 'row',
    },
    marginRight5: {
        marginRight: 5,
    }
});
