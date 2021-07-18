
const defaultPage = 1;
const defaultLimit = 15;

const toastAutoCloseTime = 3000;
const baseUrl = 'http://localhost:4000/';
const productBaseUrl = `http://localhost:4000/products?_page=${defaultPage}&_limit=${defaultLimit}`;
const staticUserId = '957bd84e-e58b-11eb-ba80-0242ac130004';
const productSearchUrl = 'http://localhost:4000/products?q=';
const productFilterCategory = 'http://localhost:4000/products?category_id=';
const productSort = 'http://localhost:4000/products?_sort=';





const constantsHelper = {
    toastAutoCloseTime: toastAutoCloseTime,
    baseUrl: baseUrl,
    productBaseUrl: productBaseUrl,
    staticUserId: staticUserId,
    productSearchUrl: productSearchUrl,
    productFilterCategory: productFilterCategory,
    defaultPage: defaultPage,
    defaultLimit: defaultLimit,
    productSort: productSort
}

export default constantsHelper;