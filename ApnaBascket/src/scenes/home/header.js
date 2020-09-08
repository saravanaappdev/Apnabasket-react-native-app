import { View } from 'native-base';
import React, { Component } from "react";
import { Image, Text, TouchableOpacity } from "react-native";
import Browse from '../../assets/images/png/browse.png';
import Cart from '../../assets/images/png/cart-notification.png';
import Logo from '../../assets/images/png/logomark.png';
import Bell from '../../assets/images/png/notification.png';
import ApnaSearchBox from '../../components/atoms/searchBox';
import CategoryHeader from '../../components/orgainsms/categoryHeader';

export default class Header extends Component {
    constructor(props) {
        super(props);
    }
    onBlur() {

    }
    onFocus() {

    }
    searchItem(value) {
        console.log('search item-->', value);
    }

    render() {
        return (
            <View>
                {!this.props.isCategoryHeader ?
                    (<View>
                        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', marginTop: 40, marginBottom: 20, marginLeft: 5, marginRight: 10 }}>
                            <View>
                                <Image
                                    source={Browse}
                                    style={{
                                        maxWidth: 135,
                                        maxHeight: 135,
                                    }}
                                />
                            </View>
                            {/* Logo*/}
                            <View>
                                <Image
                                    source={Logo}
                                    style={{
                                        maxWidth: 135,
                                        maxHeight: 135,
                                    }}
                                />
                            </View>
                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end' }}>
                                {/* cart Icon */}
                                <TouchableOpacity style={{ marginRight: 20 }}>
                                    <View style={{ width: 16, height: 16, backgroundColor: '#F15C25', borderRadius: 100, position: 'absolute', top: -10, left: 10, zIndex: 10, justifyContent: 'center', alignItems: 'center' }}>
                                        <Text style={{ color: 'white', fontSize: 10 }}>8</Text>
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
                                    <View style={{ width: 16, height: 16, backgroundColor: '#F15C25', borderRadius: 100, position: 'absolute', top: -4, left: 11, zIndex: 10, justifyContent: 'center', alignItems: 'center' }}>
                                        <Text style={{ color: 'white', fontSize: 10 }}>2</Text>
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
                        <ApnaSearchBox
                            value={""}
                            type="search"
                            emitTextValue={this.searchItem.bind(this)}
                            iconRequired={true}
                            onBlur={() => this.onBlur}
                            placeholder="Search fresh fruits, vegetables & more"
                            onFocus={() => this.onFocus} />
                    </View>) :
                    (<CategoryHeader backIconClicked={()=>{ this.props.backIconClicked()}}/>)}

                {/* small Header */}

            </View>
        )
    }
}