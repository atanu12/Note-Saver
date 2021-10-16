import { createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { userLoginReducer, userRegesterReducer } from './Reducers/userReducers';

const reducer = combineReducers({
    // it will contain all the reducer
    userLogin:userLoginReducer,
    userRegester: userRegesterReducer
})

// fetch user data from local storage
const userInfoStorege = localStorage.getItem('userInfo') 
    ? JSON.parse(localStorage.getItem('userInfo')) 
    : null

const initialState = {
    userLogin : {userInfoStorege}
}

// add middleware
const middleware = [thunk]

// store all the value
const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
)

export default store;
