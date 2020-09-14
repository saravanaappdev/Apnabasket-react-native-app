import WooCommerceAPI from 'react-native-woocommerce-api';
import Constants from './constants';

export const WooCommerceV1 = new WooCommerceAPI({
    url: Constants.API.SERVER,
    ssl: true,
    consumerKey: Constants.KEYS.CONSUMER_KEY,
    consumerSecret: Constants.KEYS.CONSUMER_SECRET_KEY,
    wpAPI: true,
    version: Constants.VERSION.V1,
    queryStringAuth: true
});

export const WooCommerceV3 = new WooCommerceAPI({
    url: Constants.API.SERVER,
    ssl: true,
    consumerKey: Constants.KEYS.CONSUMER_KEY,
    consumerSecret: Constants.KEYS.CONSUMER_SECRET_KEY,
    wpAPI: true,
    version: Constants.VERSION.V3,
    queryStringAuth: true
});
