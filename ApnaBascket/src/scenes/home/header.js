import { View } from 'native-base';
import React, { Component } from "react";
import { Image, StyleSheet, Text, TouchableOpacity } from "react-native";
import Browse from '../../assets/images/png/browse.png';
import Cart from '../../assets/images/png/cart-notification.png';
import Logo from '../../assets/images/png/logomark.png';
import Bell from '../../assets/images/png/notification.png';
import ApnaSearchBox from '../../components/atoms/searchBox';
import CategoryHeader from '../../components/orgainsms/categoryHeader';
import { THEME } from '../../styles/colors';

export default class Header extends Component {
    constructor(props) {
        super(props);
    }
    onBlur() {

    }
    onFocus() {

    }
    // TODO: have to handle the search based on the keyword
    searchItem(value) {

    }

    render() {
        return (
            <View>
                {!this.props.isCategoryHeader ?
                    (<View>
                        <View style={styles.header}>
                            <View>
                                <Image
                                    source={Browse}
                                    style={styles.browse}
                                />
                            </View>
                            {/* Logo*/}
                            <View>
                                <Image
                                    source={Logo}
                                    style={styles.logo}
                                />
                            </View>
                            <View style={styles.iconSection}>
                                {/* cart Icon */}
                                <TouchableOpacity style={styles.marginRight20}>
                                    <View style={styles.cartIcon}>
                                        <Text style={styles.notification}>8</Text>
                                    </View>
                                    <Image
                                        source={Cart}
                                        style={styles.cart}
                                    />
                                </TouchableOpacity>
                                {/* Bell Icon */}
                                <TouchableOpacity >
                                    <View style={styles.bellIcon}>
                                        <Text style={styles.notification}>2</Text>
                                    </View>
                                    <Image
                                        source={Bell}
                                        style={styles.bell}
                                    />
                                </TouchableOpacity>
                            </View>
                        </View>
                        <ApnaSearchBox
                            value={""}
                            type="search"
                            emitTextValue={this.searchItem.bind(this)}
                            iconRequired={true}
                            onBlur={() => this.onBlur}
                            placeholder="Search fresh fruits, vegetables & more"
                            onFocus={() => this.onFocus} />
                    </View>) :
                    (<CategoryHeader backIconClicked={() => { this.props.backIconClicked() }} />)}
            </View>
        )
    }
}


const styles = StyleSheet.create({
    header: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 40,
        marginBottom: 20,
        marginLeft: 5,
        marginRight: 10,
    },
    browse: {
        maxWidth: 135,
        maxHeight: 135,
    },
    logo: {
        maxWidth: 135,
        maxHeight: 135,
    },
    iconSection: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
    marginRight20: {
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
        alignItems: 'center'
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
        color: 'white',
        fontSize: 10,
    },
    cart: {
        width: 24,
        height: 18,
    },
    bell: {
        width: 17,
        height: 24,
    }
})