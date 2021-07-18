import { createStore, compose } from 'redux';
import reducers from './reducers';
import middleWares from './middlewares';


const store = createStore(
    reducers,
    compose(middleWares)
)

export default store;

