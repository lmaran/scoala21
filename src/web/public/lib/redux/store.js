// dan abramov: https://egghead.io/lessons/react-redux-implementing-store-from-scratch
// https://github.com/saigowthamr/React-Store/blob/master/src/store.js

export const createStore = (reducer, initialState) => {
    // console.log("initialState in Store inside:");
    // console.log(initialState);
    let state = initialState;
    let listeners = [];

    const getState = () => state;

    const dispatch = action => {
        state = reducer(state, action);
        listeners.forEach(listener => listener());
    };

    const subscribe = listener => {
        listeners.push(listener);
        // return a function to unsubscribe
        return () => {
            listeners = listeners.filter(l => l !== listener);
        };
    };

    // display a dummy action to init the store
    dispatch({});

    function Async(cb, request) {
        request(cb);
    }

    //helps to do async things
    const thunk = function(cb, request, delay) {
        if (delay) {
            return setTimeout(() => {
                Async(cb, request);
            }, delay);
        }
        Async(cb, request);
    };

    return { getState, subscribe, dispatch, thunk };
};
