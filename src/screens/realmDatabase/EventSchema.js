export const CATEGORY = 'category_list';
export const CATEGORY_SCHEMA = {
    name: CATEGORY,
    primaryKey: 'key',
    properties: {
        key: 'string', //primary key
        categoryName: 'string',
        categoryDescription: 'string',
        createdAt: 'string',
    }
};

export const PRODUCT = 'product_list';
export const PRODUCT_SCHEMA = {
    name: PRODUCT,
    primaryKey: 'key',
    properties: {
        key: 'string', //primary key
        productName: 'string',
        productPrice: 'string',
        productDescription: 'string',
        createdAt: 'string',
    }
};