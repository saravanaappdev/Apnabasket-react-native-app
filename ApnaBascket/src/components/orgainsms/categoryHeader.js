import { View } from 'native-base';
import React, { Component } from "react";
import { Image, StyleSheet, Text, TouchableOpacity } from "react-native";
import Cart from '../../assets/images/png/cart-notification.png';
import Bell from '../../assets/images/png/notification.png';
import { defineIcon } from '../../assets/images/svg';
import ApnaSearchBox from '../../components/atoms/searchBox';
import { THEME } from '../../styles/colors';
import { scaleFont } from '../../styles/mixins';

export default class CategoryHeader extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    onBlur() {
        // TODO:
    }
    onFocus() {
        // TODO:
    }
    searchItem(value) {
        // TODO:
    }
    backIconClicked() {
        this.props.backIconClicked();
    }

    render() {
        return (
            <View>
                {/* category Header */}
                <View>
                    <View style={styles.CategoryHeader}>
                        <TouchableOpacity onPress={() => { this.backIconClicked() }} style={styles.marginTop20} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
                            {defineIcon('arrow-back', 'black', 10, 18)}
                        </TouchableOpacity>
                        
                        {/* Search box */}
                        <View style={styles.searchBox}>
                            <ApnaSearchBox
                                value={""}
                                type="search"
                                emitTextValue={this.searchItem.bind(this)}
                                iconRequired={true}
                                onBlur={() => this.onBlur}
                                placeholder="Search"
                                onFocus={() => this.onFocus} />
                        </View>

                        <View style={styles.notifcationIconsSection}>
                            {/* cart Icon */}
                            <TouchableOpacity style={styles.marginTop20}>
                                <View style={styles.cartIcon}>
                                    <Text style={styles.notification}>8</Text>
                                </View>
                                <Image
                                    source={Cart}
                                    style={{
                                        width: 24,
                                        height: 18,
                                    }}
                                />
                            </TouchableOpacity>
                            {/* Bell Icon */}
                            <TouchableOpacity >
                                <View style={styles.bellIcon}>
                                    <Text style={styles.notification}>2</Text>
                                </View>
                                <Image
                                    source={Bell}
                                    style={{
                                        width: 17,
                                        height: 24,
                                    }}
                                />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    CategoryHeader: {
        flexDirection: 'row',
        marginRight: 10,
        marginTop: 30,
        alignItems: 'center',
    },
    notifcationIconsSection: {
        flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end',
    },
    marginTop20: {
        marginRight: 20,
    },
    cartIcon: {
        width: 16,
        height: 16,
        backgroundColor: THEME.DARK_ORANGE,
        borderRadius: 100,
        position: 'absolute',
        top: -10,
        left: 10,
        zIndex: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    bellIcon: {
        width: 16,
        height: 16,
        backgroundColor: THEME.DARK_ORANGE,
        borderRadius: 100,
        position: 'absolute',
        top: -4,
        left: 11,
        zIndex: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    notification: {
        color: THEME.WHITE,
        fontSize: scaleFont(10)
    },
    searchBox: {
        flex: 1,
        marginRight: 21,
    },
});
