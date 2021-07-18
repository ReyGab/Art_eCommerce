import { combineReducers } from 'redux';


import productListReducer from '../src/features/product/list/duck';
import mainReducer from '../src/features/main/duck';
import cartListReducer from '../src/features/cart/list/duck';
import loginReducer from '../src/features/login/duck';
import adminListReducer from '../src/features/admin/list/duck';
import adminEditReducer from '../src/features/admin/edit/duck';
import adminAddReducer from '../src/features/admin/new/duck';

const appReducer = combineReducers({
    mainReducer,
    productListReducer,
    cartListReducer,
    adminListReducer,
    loginReducer,
    adminEditReducer,
    adminAddReducer
})

const rootReducer = (state, action) => {
    return appReducer(state, action)
}

export default rootReducer;