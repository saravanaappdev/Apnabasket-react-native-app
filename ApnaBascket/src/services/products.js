import Constants from '../constants';
import WooCommerce from '../wooCommerce';

export const getAllProducts = async () => {
    return await WooCommerce.get(Constants.API.GET_ALL_PRODUCTS);
};

