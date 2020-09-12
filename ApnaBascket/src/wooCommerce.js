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

// export const WooCommerceV1 = new WooCommerceAPI({
//     url: 'https://apnabasket.blazedream.in/apanabasket/', // Your store URL
//     ssl: true,
//     consumerKey: 'ck_c10c31c28f564647c22162315ade3151acf71a2a', // Your consumer secret
//     consumerSecret: 'cs_5614e6116f33c979dedb5b7a076178e24a37ad65', // Your consumer secret
//     wpAPI: true, // Enable the WP REST API integration
//     version: 'api/v1', // WooCommerce WP REST API version
//     queryStringAuth: true
// });

// export const WooCommerceV3 = new WooCommerceAPI({
//     url: 'https://apnabasket.blazedream.in/apanabasket/', // Your store URL
//     ssl: true,
//     consumerKey: 'ck_c10c31c28f564647c22162315ade3151acf71a2a', // Your consumer secret
//     consumerSecret: 'cs_5614e6116f33c979dedb5b7a076178e24a37ad65', // Your consumer secret
//     wpAPI: true, // Enable the WP REST API integration
//     version: 'wc/v3', // WooCommerce WP REST API version
//     queryStringAuth: true
// });
