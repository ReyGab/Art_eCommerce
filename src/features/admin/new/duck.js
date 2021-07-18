/* eslint-disable import/no-anonymous-default-export */
import axios from 'axios';
import constantsHelper from '../../../util/constants/constants';
import { v4 as uuid } from 'uuid';

import { toast } from 'react-toastify';
import ToastMsg from '../../../shared-components/toast-msg';

toast.configure()

const ADD_NEW_PRODUCT_SUCCESS = 'ADD_NEW_PRODUCT_SUCCESS'; 

export default (state = {

}, action) => {
    switch(action.type) {
        case ADD_NEW_PRODUCT_SUCCESS:
            return state = {
                ...state,
                
            }
        
        default:
            return state;
    }
}

const addNewProductSuccess = (newProduct) => ({
    type: ADD_NEW_PRODUCT_SUCCESS,
    payload: newProduct
})

export const addNewProduct = (newProduct, ) => (dispatch) => {
    const newProductId  = uuid();
    //static image
    const imageId = Math.floor(Math.random() * 500);
    const newImage = `https://picsum.photos/id/${imageId}/200/300`;
    const data = {
        id: newProductId,
        name: newProduct.name,
        stock_quantity: newProduct.stockQuantity,
        price: newProduct.price,
        images: newImage,
        category_id: newProduct.category,
        description: newProduct.description
    }
    axios.post(`${constantsHelper.baseUrl}products`, data).then(response => {
        dispatch(addNewProductSuccess(response.data));
        toast.success(<ToastMsg message={`Successfully updated product - ${newProduct.name}`} />, { position: toast.POSITION.TOP_CENTER })
    })
}


