import { applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

const middleWares = applyMiddleware(thunk.withExtraArgument({}));

export default middleWares;