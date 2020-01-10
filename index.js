const redux = require('redux');
const createStore = redux.createStore;

const BUY_CAKE = 'BUY_CAKE';
const BUY_ICE_CREAM = 'BUY_ICE_CREAM';

 buyCake = () => {
    return {
        type: BUY_CAKE,
        info:'First redux action'
    }
}
buyIceCream = () => {
    return {

        type: BUY_ICE_CREAM,
        info: 'Second redux action'
    };
}

const initialState = {
    numOfCakes: 10,
    numberOfIceCreams: 20
}

const reducer = (state = initialState, action) => {
    switch(action.type){
        case BUY_CAKE: return {
            ...state,
            numOfCakes: state.numOfCakes - 1
        }

        case BUY_ICE_CREAM: return {
            ...state,
            numberOfIceCreams: state.numberOfIceCreams - 1
        }
        default: return state;
    }
}

const store = createStore(reducer);
console.log('Initial State:', store.getState());
const unsubscribe = store.subscribe(() => console.log('UpdatedState: ', store.getState()));
store.dispatch(buyCake());
store.dispatch(buyCake());
store.dispatch(buyCake());

store.dispatch(buyIceCream());
store.dispatch(buyIceCream());

unsubscribe();