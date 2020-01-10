
const redux = require('redux');
const thunkMiddleware = require('redux-thunk').default;
const axios = require('axios');

const createStore = redux.createStore;
const applyMiddleware = redux.applyMiddleware;

// State
const initialState = {
    loading: false,
    users:[],
    error:''
}

// actions

const FETCH_USERS_REQUEST = 'FETCH_USERS_REQUEST';
const FETCH_USERS_SUCCESS = 'FETCH_USERS_SUCCESS';
const FECTCH_USERS_FAILURE = 'FECTCH_USERS_FAILURE';

const fetchUsersRequest = () => {
    return {
        type: FETCH_USERS_REQUEST
    }
}

const fetchUsersSuccess = users => {
    return {
        type: FETCH_USERS_SUCCESS,
        payload: users
    }
}

const fetchUsersFailure = error =>{
    return {
        type: FECTCH_USERS_FAILURE,
        payload: error
    }
}

// Reducer
const reducer = (state = initialState, action) => {
   switch(action.type){

    case FETCH_USERS_REQUEST:
        return {
            loading: true,
            users: [],
            error:''
        }
        case FETCH_USERS_SUCCESS:
            return {
                loading: false,
                users: action.payload,
                error: ''
            }
        case FECTCH_USERS_FAILURE:
            return {
                loading: false,
                users:[],
                error: action.payload
            }
    default: return {state}
   }
}

// Action creators
const fetchUsers = () => {
    return (dispatch) => {
        dispatch(fetchUsersRequest());
        axios.get('https://jsonplaceholder.typicode.com/users')
        .then( res =>{
           const users = res.data.map( user=> user.id);
           dispatch(fetchUsersSuccess(users));
        })
        .catch( err => {
            dispatch(fetchUsersFailure(err.message));
        })

    }
}
// Store

const store = createStore(reducer,applyMiddleware(thunkMiddleware));

// subscribe
store.subscribe(() => console.log(store.getState()));

store.dispatch(fetchUsers());






