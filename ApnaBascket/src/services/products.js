import Constants from '../../constants';
import WooCommerceAPI  from '../wooCommerce';

export const getAllProducts = async () => {
    return await WooCommerceAPI.get('products')
    .then(data => {
        console.log(data);
    })
    .catch(error => {
        console.log(error);
    });
};

