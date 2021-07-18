/* eslint-disable import/no-anonymous-default-export */

import axios from 'axios';
import constantsHelper from '../../util/constants/constants';

const GET_USER_INFO_SUCCESS = 'GET_USER_INFO_SUCCESS';
const ADD_TO_CART_SUCCESS = 'ADD_TO_CART_SUCCESS';
const REMOVE_ITEM_IN_CART_SUCCESS = 'REMOVE_ITEM_IN_CART_SUCCESS';
const UPDATE_ITEM_COUNT_SUCCESS = 'UPDATE_ITEM_COUNT_SUCCESS';
const SEARCH_PRODUCT_NAME_SUCCESS = 'SEARCH_PRODUCT_NAME_SUCCESS';
const FILTER_PRODUCT_BY_CATEGORY_SUCCESS = 'FILTER_PRODUCT_BY_CATEGORY_SUCCESS';
const SORT_PRODUCT_SUCCESS = 'SORT_PRODUCT_SUCCESS';


export default (state = {
    getCartCountRequestPending: false,
    userInfo: null,
    order: null,
    cartCount: 0,
    sortName: 'desc',
    sortPrice: 'desc'
}, action) => {
    switch (action.type) {

        case GET_USER_INFO_SUCCESS:
            return state = {
                ...state,
                userInfo: action.payload.find(info => info.id === constantsHelper.staticUserId),
                order: action.payload.find(info => info.order.customer_id === constantsHelper.staticUserId)?.order,
                cartCount: action.payload.find(info => info.id === constantsHelper.staticUserId).order.line_items.length
            }

        case ADD_TO_CART_SUCCESS:
            return state = {
                ...state,
                userInfo: action.payload,
                cartCount: action.payload.order.line_items.length,
                order: action.payload.order
            }

        case REMOVE_ITEM_IN_CART_SUCCESS:
            return state = {
                ...state,
                userInfo: action.payload,
                cartCount: action.payload.order.line_items.length,
                order: action.payload.order
            }

        case UPDATE_ITEM_COUNT_SUCCESS:
            return state = {
                ...state,
                userInfo: action.payload,
                cartCount: action.payload.order.line_items.length,
                order: action.payload.order
            }
        
        case SORT_PRODUCT_SUCCESS:
            return state = {
                ...state,
                sortName: state.sortName === 'asc' ? 'desc' : 'asc' ,
                sortPrice: state.sortPrice === 'asc' ? 'desc' : 'asc' ,
            }

        default:
            return state;
    }
}

const getUserInfoSuccess = (userInfo) => ({
    type: GET_USER_INFO_SUCCESS,
    payload: userInfo
})

export const getUserInfo = () => (dispatch) => {
    axios.get(`${constantsHelper.baseUrl}users`).then((response) => {
        dispatch(getUserInfoSuccess(response.data));
    })
}

const removeItemInCartSuccess = (userInfo) => ({
    type: REMOVE_ITEM_IN_CART_SUCCESS,
    payload: userInfo
})

export const removeItemInCart = (userInfo, selectedProduct) => (dispatch) => {
    const userId = userInfo.id;
    const newItems = userInfo.order.line_items.filter(item => item.product_id !== selectedProduct.product_id);
    userInfo.order.total = newItems.reduce((acc, val) => {
        return acc + val.total
    }, 0);
    userInfo.order.line_items = newItems;

    axios.put(`${constantsHelper.baseUrl}users/${userId}`, userInfo).then((response) => {
        dispatch(removeItemInCartSuccess(response.data));
    })
}

const updateItemCountSuccess = (userInfo) => ({
    type: UPDATE_ITEM_COUNT_SUCCESS,
    payload: userInfo
})

export const updateItemCount = (userInfo, selectedProduct, isIncrement) => (dispatch) => {
    const userId = userInfo.id;
    const newItems = userInfo.order.line_items.filter(info => info.quantity !== 0).map(item => {
        if (item.product_id === selectedProduct.product_id && isIncrement) {
            item.quantity = item.quantity += 1;
            item.total = item.quantity * item.price;
        }
        if (item.product_id === selectedProduct.product_id && !isIncrement) {
            item.quantity = item.quantity -= 1;
            item.total = item.quantity * item.price;
        }
        return item;
    })
    userInfo.order.total = newItems.reduce((acc, val) => {
        return acc + val.total
    }, 0);
    userInfo.order.line_items = newItems;
    axios.put(`${constantsHelper.baseUrl}users/${userId}`, userInfo).then((response) => {
        dispatch(updateItemCountSuccess(response.data));
    })
}

const searchProductNameSuccess = (productList) => ({
    type: SEARCH_PRODUCT_NAME_SUCCESS,
    payload: productList
})

export const searchProductName = (event) => (dispatch) => {
    if (event.key === 'Enter') {
        const productName = event.target.value;
        axios.get(`${constantsHelper.productSearchUrl}${productName}&_page=1&_limit=15`).then(response => {
            dispatch(searchProductNameSuccess(response.data));
        })

    }
}

const filterProductByCategorySuccess = (productList) => ({
    type: FILTER_PRODUCT_BY_CATEGORY_SUCCESS,
    payload: productList
})

export const filterProductByCategory = (category) => (dispatch) => {
    axios.get(`${constantsHelper.productFilterCategory}${category}&_page=1&_limit=15`).then(response => {
        dispatch(filterProductByCategorySuccess(response.data));
    })
}

const sortProductSuccess = (productList) => ({
    type: SORT_PRODUCT_SUCCESS,
    payload: productList
})

export const sortProduct = (sortType, sortBy) => (dispatch) => {
    axios.get(`${constantsHelper.productSort}${sortBy}&_order=${sortType}&_page=1&_limit=15`).then(response => {
        dispatch(sortProductSuccess(response.data));
    })
}



