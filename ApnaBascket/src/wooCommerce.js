import WooCommerceAPI from 'react-native-woocommerce-api';
import Constants from './constants';

const WooCommerce = new WooCommerceAPI({
    url:  Constants.API.SERVER,
    consumerKey: Constants.KEYS.CONSUMER_KEY,
    consumerSecret: Constants.KEYS.CONSUMER_SECRET,
    version: 'wc/v1',
    queryStringAuth: true
});

export default WooCommerce;
