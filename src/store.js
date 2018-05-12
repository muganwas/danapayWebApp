import { combineReducers, applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import promise from 'redux-promise-middleware';
import userReducer from './extras/reducers/userReducer';
import recipientReducer from './extras/reducers/recipientReducer';
import destinationReducer from './extras/reducers/destinationReducer';
import amountReducer from './extras/reducers/amountReducer';
import registrationReducer from './extras/reducers/registrationReducer';
import paymentReducer from './extras/reducers/paymentReducer';

const middleware = applyMiddleware(promise(), thunk, logger);
const allReducers = combineReducers({
    recipient: recipientReducer,
    user: userReducer,
    registration: registrationReducer,
    payment: paymentReducer,
    destination: destinationReducer,
    amount : amountReducer
})
const store = createStore(
    allReducers, 
    middleware 
    //window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

export default store