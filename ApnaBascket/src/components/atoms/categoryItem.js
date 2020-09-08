import { Text, View } from 'native-base';
import React, { Component } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { THEME } from '../../styles/colors';

export default class ApnaCategoryItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isActive: this.props.isActive || false,
            categoryName: this.props.categoryName || '',
            itemId: this.props.id,
        };
    }

    render() {
        return (
            <TouchableOpacity activeOpacity={0.9} onPress={() => { this.props.categoryClicked(this.state.itemId) }} style={{ paddingLeft: 20, paddingRight: 20 }}>
                {this.props.isActive ?
                    (<View>
                        <Text style={{ color: THEME.ACTIVE_TEXT, fontWeight: 'bold', fontFamily: "Muli", }}>{this.state.categoryName}</Text>
                        <View style={{ backgroundColor: 'red', width: 25, height: 1, marginTop: 7 }}></View>
                    </View>)
                    :
                    (<Text style={{ color: THEME.INACTIVE_TEXT, fontWeight: 'bold' }}>{this.state.categoryName}</Text>)}
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({

});
