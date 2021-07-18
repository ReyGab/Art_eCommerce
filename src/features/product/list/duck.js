/* eslint-disable import/no-anonymous-default-export */
import axios from 'axios';
import constantsHelper from '../../../util/constants/constants';
import { toast } from 'react-toastify';
import ToastMsg from '../../../shared-components/toast-msg';

toast.configure();



const GET_INITIAL_PRODUCTS_REQUEST = 'GET_INITIAL_PRODUCTS_REQUEST';
const GET_INITIAL_PRODUCTS_SUCCESS = 'GET_INITIAL_PRODUCTS_SUCCESS';
const GET_CART_COUNT_SUCCESS = 'GET_CART_COUNT_SUCCESS';

const ADD_TO_CART_SUCCESS = 'ADD_TO_CART_SUCCESS';

const SEARCH_PRODUCT_NAME_SUCCESS = 'SEARCH_PRODUCT_NAME_SUCCESS';
const FILTER_PRODUCT_BY_CATEGORY_SUCCESS = 'FILTER_PRODUCT_BY_CATEGORY_SUCCESS';
const GET_CLIENT_PRODUCT_LIST_COUNT_SUCCESS = 'GET_CLIENT_PRODUCT_LIST_COUNT_SUCCESS';
const GET_CLIENT_NEXT_PAGE_SUCCESS = 'GET_CLIENT_NEXT_PAGE_SUCCESS';
const SORT_PRODUCT_SUCCESS = 'SORT_PRODUCT_SUCCESS';


export default (state = {
    productList: [],
    productListRequestPending: false,
    productListCount: 0
}, action) => {
    switch (action.type) {
        case GET_INITIAL_PRODUCTS_REQUEST:
            return state = {
                productListRequestPending: true
            };

        case GET_INITIAL_PRODUCTS_SUCCESS:
            return state = {
                ...state,
                productList: action.payload,
                productListRequestPending: false
            };
        
        case SEARCH_PRODUCT_NAME_SUCCESS:
            return state = {
                ...state,
                productList: action.payload
            }

        case FILTER_PRODUCT_BY_CATEGORY_SUCCESS:
            return state = {
                ...state,
                productList: action.payload
            }

        case GET_CLIENT_PRODUCT_LIST_COUNT_SUCCESS:
            return state = {
                ...state,
                productListCount: parseInt(action.payload)
            }

        case GET_CLIENT_NEXT_PAGE_SUCCESS:
            return state = {
                ...state,
                productList: action.payload
            }

        case SORT_PRODUCT_SUCCESS:
            return state = {
                ...state,
                productList: action.payload
            }

        default:
            return state;
    }
}

const getInitialProductsRequest = () => ({
    type: GET_INITIAL_PRODUCTS_REQUEST
})

const getInitialProductsSuccess = (productList) => ({
    type: GET_INITIAL_PRODUCTS_SUCCESS,
    payload: productList
})

const getCartCountSuccess = (cartCount) => ({
    type: GET_CART_COUNT_SUCCESS,
    payload: cartCount
})

const addToCardSuccess = (userInfo) => ({
    type: ADD_TO_CART_SUCCESS,
    payload: userInfo
})

const getProductListCountSuccess = (productListCount) => ({
    type: GET_CLIENT_PRODUCT_LIST_COUNT_SUCCESS,
    payload: productListCount
})

export const getInitialProducts = () => (dispatch) => {
    dispatch(getInitialProductsRequest);
    axios.get(constantsHelper.productBaseUrl).then((response) => {
        dispatch(getInitialProductsSuccess(response.data));
        dispatch(getProductListCountSuccess(response.headers['x-total-count']))
    })
}



export const getCartCount = (cartCount) => (dispatch) => {
    dispatch(getCartCountSuccess(cartCount));
}


export const addToCart = (userInfo, selectedProduct, quantity) => (dispatch) => {
    const userId = userInfo.id;
    const newLineItems = {
        name: selectedProduct.name,
        product_id: selectedProduct.id,
        quantity: quantity,
        price: selectedProduct.price,
        total: selectedProduct.price * quantity,
        image: selectedProduct.images
    }

    //evaluate if order item exist then replace
    if (userInfo.order.line_items.some(item => item.product_id === selectedProduct.id)) {
        userInfo.order.line_items =
            userInfo.order.line_items.map((item) => {

                if (item.product_id === selectedProduct.id) {
                    item = newLineItems
                }
                return item;
            });
    } else {
        userInfo.order.line_items = [...userInfo.order.line_items, newLineItems]
    }

    userInfo.order.customer_id = userId;
    userInfo.order.total = userInfo.order.line_items.length > 1 ? userInfo.order.line_items.reduce((acc, val) => {
        return acc + val.total
    }, 0) : newLineItems.total;

    const data = userInfo;

    axios.put(`${constantsHelper.baseUrl}users/${userId}`, data).then((response) => {
        dispatch(addToCardSuccess(response.data));
        toast.success(<ToastMsg message={'Added to cart'} />, { position: toast.POSITION.TOP_CENTER })
    })
}


const getPageNextSuccess = (productList) => ({
    type: GET_CLIENT_NEXT_PAGE_SUCCESS,
    payload: productList
})

export const nextPageProducts = (page) => (dispatch) => {
    axios.get(`${constantsHelper.baseUrl}products?_page=${page++}&_limit=${constantsHelper.defaultLimit}`).then(response => {
        dispatch(getPageNextSuccess(response.data));
    })
}








