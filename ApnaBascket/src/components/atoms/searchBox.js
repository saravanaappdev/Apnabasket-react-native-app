import { Input, Item, View } from 'native-base';
import React, { Component } from 'react';
import { Image, StyleSheet } from 'react-native';
import search from '../../assets/images/png/search.png';
import Constants from '../../constants';
import { THEME } from '../../styles/colors';
export default class ApnaSearchBox extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: this.props.value || '',
            isItemActive: false,
            isItemInactive: true,
            error: false,
            required: this.props.required || false,
            flag: false,
        };
    }

    onFocus() {
        this.setState({
            isItemActive: true,
        });
    }

    onBlur() {
        this.setState(
            {
                isItemActive: false,
                flag: true,
            },
            () => {
                if (this.props.required) {
                    this.setState({
                        required: this.state.value.length === 0 ? true : false,
                    });
                }
                if (!this.state.required) {
                    this.setState({
                        error:
                            this.props.type === 'email'
                                ? this.validateEmail(this.state.value)
                                : this.state.error,
                    });
                }
            },
        );
    }

    validateEmail = email => {
        return !Constants.EMAIL_REGEX.test(email);
    };

    pressedkey = (data) => {
        this.props.pressedkey(data.nativeEvent.key);
    }
    closeIconClicked = async () => {
        await this.setState({
            value: '',
        });
        this.props.closeIconClicked()
    }
    onValueChange = (value) => {
        this.setState({
            value: value
        })

    }
    render() {
        return (
            <View>
                <View
                    style={styles.searchBox}>
                    {/* Input Item */}
                    <Item
                        style={styles.textInputItem}
                        onPress={() =>
                            this.props.emitOnPress ? this.props.emitOnPress() : null
                        }
                        regular>
                        {/* Search Icon */}
                        <Image
                            source={search}
                            style={{
                                width: 16,
                                height: 16,
                                marginLeft: 20,
                                marginRight: 10,
                            }}
                        />
                        <Input
                            ref={el => {
                                this.textInput = el;
                            }}
                            pointerEvents={this.props.emitOnPress ? 'none' : null}
                            disabled={this.props.disabled}
                            onBlur={() => { this.onBlur(); this.props.onBlur() }}
                            onFocus={() => { this.onFocus(); this.props.onFocus() }}
                            value={this.state.value}
                            onChangeText={this.onValueChange.bind(this)}
                            onSubmitEditing={this.props.onSubmit}
                            style={styles.inputText}
                            placeholder={this.props.placeholder}
                            placeholderTextColor={'#746B65'}
                        />
                    </Item>
                </View>
            </View>)
    }
}

const styles = StyleSheet.create({
    searchBox: {
        borderRadius: 100,
        height: 50,
        backgroundColor: THEME.WHITE,
        marginLeft: 0,
        borderColor: '#E5DEDA',
        borderWidth: 3,
        alignItems: 'center',
        justifyContent: 'center',
    },
    textInputItem: {
        marginLeft: 0,
        borderColor: THEME.TRANSPARENT,
        borderRadius: 4,
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputText: {
        fontSize: 16,
        height: 40,
        elevation: 0,
        borderRadius: 100,
        color: THEME.BLACK,
        marginRight: 10,
    },
    activeIcon: {
        color: THEME.PRIMARY,
    },
});
