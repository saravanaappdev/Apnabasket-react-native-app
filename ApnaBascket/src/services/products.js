import { WooCommerceV1, WooCommerceV3 } from '../wooCommerce';

export const getAllProducts = async () => {
    return await WooCommerceV3.get('products')
};
export const getProductDetails = async (productId) => {
    return await WooCommerceV3.get(`products/${productId}`)
};

export const getSubcategories = async () => {
    return await WooCommerceV1.get('subcategory/0')
};

export const getCategories = async (categoryId) => {
    return await WooCommerceV3.get('products',
        {
            category: categoryId
        })
};

