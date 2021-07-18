/* eslint-disable import/no-anonymous-default-export */
import axios from 'axios';
import { constant } from 'lodash';
import constantsHelper from '../../../util/constants/constants';

import { toast } from 'react-toastify';
import ToastMsg from '../../../shared-components/toast-msg';

toast.configure()

const EDIT_PRODUCT_ITEM_SUCCESS = 'EDIT_PRODUCT_ITEM_SUCCESS'; 


export default (state ={

}, action) => {
    switch(action.type) {
        case EDIT_PRODUCT_ITEM_SUCCESS:
            return state ={
                ...state,

            }
        default:
            return state;
    }
}


const editProductItemSuccess = (productList) => ({
    type: EDIT_PRODUCT_ITEM_SUCCESS,
    payload: productList
})

export const editProductItem = (selectedProduct) => (dispatch) => {
    const selectedProductId = selectedProduct.id;
    const data = {
        id: selectedProductId,
        name: selectedProduct.name,
        stock_quantity: selectedProduct.stockQuantity,
        price: selectedProduct.price,
        images: selectedProduct.images,
        category_id: selectedProduct.category,
        description: selectedProduct.description
    }

    axios.put(`${constantsHelper.baseUrl}products/${selectedProductId}`, data).then(response => {
        dispatch(editProductItemSuccess(response.data));
        toast.success(<ToastMsg message={`Successfully updated product - ${selectedProduct.name}`} />, { position: toast.POSITION.TOP_CENTER })
    })
}