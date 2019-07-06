import { initHbsEventBinders } from "/views/catalog/catalog.hbs-event-binders.js";
import { render } from "/views/catalog/containers/absence-add.container.js";
import store from "/views/catalog/store/store.js";

initHbsEventBinders();

// init(store);

function renderAll() {
    render(store);
}

// const renderAll = store => render(store);

store.subscribe(renderAll);
