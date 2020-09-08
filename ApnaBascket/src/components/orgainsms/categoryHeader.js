import { View } from 'native-base';
import React, { Component } from "react";
import { Image, Text, TouchableOpacity } from "react-native";
import Browse from '../../assets/images/png/browse.png';
import Cart from '../../assets/images/png/cart-notification.png';
import Logo from '../../assets/images/png/logomark.png';
import Bell from '../../assets/images/png/notification.png';
import { defineIcon } from '../../assets/images/svg';
import ApnaSearchBox from '../../components/atoms/searchBox';

export default class CategoryHeader extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    onBlur() {

    }
    onFocus() {

    }
    searchItem(value) {
    }
    backIconClicked(){
        this.props.backIconClicked();
    }

    render() {
        return (
            <View>
                {/* small Header */}
                <View>
                    <View style={{ flexDirection: 'row', marginRight: 10, marginTop: 30, alignItems: 'center' }}>
                        <TouchableOpacity onPress={()=>{ this.backIconClicked()}} style={{ marginRight: 20 }}>
                            {defineIcon('arrow-back', 'black', 10, 18)}
                        </TouchableOpacity>
                        <View style={{ flex: 1, marginRight: 21 }}>
                            <ApnaSearchBox
                                value={""}
                                type="search"
                                emitTextValue={this.searchItem.bind(this)}
                                iconRequired={true}
                                onBlur={() => this.onBlur}
                                placeholder="Search"
                                onFocus={() => this.onFocus} />
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
                </View>
            </View>
        )
    }
}