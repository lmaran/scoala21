import { createStore } from "/views/student/store.js";
import { reducer } from "/views/student/catalog.reducer.js";

const uiDataTemplate = document.getElementById("ui-data");
const initialState = JSON.parse(uiDataTemplate.innerHTML);

const store = createStore(reducer, initialState);

function render() {
    // valueEl.innerHTML = store.getState().toString()
    console.log(store.getState());
}

store.subscribe(render);

console.log(store.getState());
