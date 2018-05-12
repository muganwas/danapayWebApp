import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch} from 'react-router-dom';
import './index.css';
import App from './App';
import User from './extras/components/User';
import {Provider} from "react-redux";

//import recipientReducer from "./reducers/recipient-reducer";
//import destinationReducer from "./reducers/destination-reducer"
//import amountReducer from "./reducers/amount-reducer"
import NotFound from './extras/NotFound';
import registerServiceWorker from './registerServiceWorker';
import store from './store';

let mPoint = document.getElementById('root');

var mainComponent = ()=>{
    return(
        <Provider store={store}>
            <App />
        </Provider>
    )
}
var UserComponent = ()=>{
    return(
        <Provider store={store}>
            <User />
        </Provider>
    )
}

var Root = ()=>{
    return(
        <BrowserRouter basename = "/" >
            <div className="main">
                <Switch>
                    <Route exact path="/" component={ mainComponent } />
                    <Route exact path="/login" component={ UserComponent } />
                    <Route exact path="/user" component={ UserComponent } />
                    <Route component={ NotFound } />
                </Switch>
            </div>
        </BrowserRouter>
    )
}
// store.dispatch(action)

// console.log(store.getState())

ReactDOM.render(
    <Root/>, mPoint
    );

registerServiceWorker();
