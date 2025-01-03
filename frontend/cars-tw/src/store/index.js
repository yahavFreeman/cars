import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import {thunk} from "redux-thunk";
import {carsReducer} from "./reducers/carsReducer.js"
import {userReducer} from "./reducers/userReducer.js"

const rootReducer = combineReducers({
    carsModule: carsReducer,
    userModule: userReducer
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

export const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)))
window.myStore = store