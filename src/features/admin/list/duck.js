/* eslint-disable import/no-anonymous-default-export */
import axios from 'axios';
import constantsHelper from '../../../util/constants/constants';

import { toast } from 'react-toastify';
import ToastMsg from '../../../shared-components/toast-msg';

toast.configure()

const GET_PRODUCT_LIST_SUCCESS = 'GET_PRODUCT_LIST_SUCCESS'; 
const EDIT_PRODUCT_ITEM_SUCCESS = 'EDIT_PRODUCT_ITEM_SUCCESS'; 
const DELETE_PRODUCT_ITEM_SUCCESS = 'DELETE_PRODUCT_ITEM_SUCCESS';
const GET_PRODUCT_LIST_COUNT_SUCCESS = 'GET_PRODUCT_LIST_COUNT_SUCCESS';
const ADD_NEW_PRODUCT_SUCCESS = 'ADD_NEW_PRODUCT_SUCCESS';
const GET_NEXT_PAGE_SUCCESS = 'GET_NEXT_PAGE_SUCCESS';
const SEARCH_PRODUCT_NAME_SUCCESS = 'SEARCH_PRODUCT_NAME_SUCCESS';

export default (state = {
productList: [],
productListCount: 0, 

}, action) => {
    switch(action.type) {
        case GET_PRODUCT_LIST_SUCCESS:
            return state = {
                ...state,
                productList: action.payload
            }
        case EDIT_PRODUCT_ITEM_SUCCESS:
            return state = {
                ...state,
                productList: state.productList.map((product) => {
                    if(product.id === action.payload.id) {
                        product = action.payload
                    }
                    return product;
                })
            }
        case DELETE_PRODUCT_ITEM_SUCCESS:
            return state = {
                ...state,
                productList: state.productList.filter((product) => product.id !== action.payload)
            }
        case GET_PRODUCT_LIST_COUNT_SUCCESS:
            return state = {
                ...state,
                productListCount: parseInt(action.payload)
            }
        case ADD_NEW_PRODUCT_SUCCESS:
            return state = {
                ...state,
                productList: [...state.productList, action.payload],
                productListCount: parseInt(state.productListCount) + 1
            }
        case GET_NEXT_PAGE_SUCCESS:
            return state = {
                ...state,
                productList: action.payload
            }

        case SEARCH_PRODUCT_NAME_SUCCESS:
            return state = {
                ...state,
                productList: action.payload
            }
        
        default:
            return state;
    }
}

const getProductListSuccess = (productList) => ({
    type: GET_PRODUCT_LIST_SUCCESS,
    payload: productList
})

const getProductListCountSuccess = (productListCount) => ({
    type: GET_PRODUCT_LIST_COUNT_SUCCESS,
    payload: productListCount
})

export const getProductList = () => (dispatch) => {
    axios.get(constantsHelper.productBaseUrl).then((response) => {
        dispatch(getProductListCountSuccess(response.headers['x-total-count']))
        dispatch(getProductListSuccess(response.data));
    })
}

const deleteProductItemSuccess = (deletedProductId) => ({
    type: DELETE_PRODUCT_ITEM_SUCCESS,
    payload: deletedProductId
})

export const deleteProductItem = (selectedProduct, onCloseBasicDiag) => (dispatch) => {
    const selectedProductId = selectedProduct.id;

    axios.delete(`${constantsHelper.baseUrl}products/${selectedProductId}`).then(response => {
        dispatch(deleteProductItemSuccess(selectedProductId));
        toast.success(<ToastMsg message={`Successfully deleted product - ${selectedProduct.name}`} />, { position: toast.POSITION.TOP_CENTER })
    })
    onCloseBasicDiag();
}

const getPageNextSuccess = (productList) => ({
    type: GET_NEXT_PAGE_SUCCESS,
    payload: productList
})

export const nextPageProducts = (page) => (dispatch) => {
    axios.get(`${constantsHelper.baseUrl}products?_page=${page}&_limit=${constantsHelper.defaultLimit}`).then(response => {
        dispatch(getPageNextSuccess(response.data));
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





