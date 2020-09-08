import WooCommerceAPI from 'react-native-woocommerce-api';
import Constants from './constants';

const WooCommerceAPI = new WooCommerceAPI({
    url: Constants.API.SERVER,
    ssl: true,
    consumerKey: Constants.KEYS.CONSUMER_KEY,
    consumerSecret:  Constants.KEYS.CONSUMER_SECRET,
    wpAPI: true, 
    version: 'wc/v3',
    queryStringAuth: true
});

export default WooCommerceAPI;
