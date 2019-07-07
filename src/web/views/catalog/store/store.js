// https://stackoverflow.com/a/46951783
// https://redux.js.org/recipes/code-splitting
// https://daveceddia.com/access-redux-store-outside-react/
// https://github.com/leocristofani/testing-react-redux-applications/blob/master/src/configureStore.js
// https://github.com/reduxjs/redux/blob/master/examples/real-world/src/store/configureStore.prod.js
import { createStore } from "/views/catalog/store/store.lib.js";
import { reducer } from "/views/catalog/reducers/catalog.reducer.js";

// this initialization code is executed only once (by the first module which need it)
const initialState = {
    ui: {} // keep ui-specific state in a dedicated section
};
const store = createStore(reducer, initialState);
export default store;

// export const configStore = initialState => createStore(reducer, initialState);
