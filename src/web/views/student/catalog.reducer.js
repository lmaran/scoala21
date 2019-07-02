// This will be fed into the reducer when the app loads to initialize the state
const getInitialState = () => ({
    todoList: []
});

export const reducer = (prevState = getInitialState(), action) => {
    switch (action.type) {
        case "ADD_TODO": {
            const nextState = {
                todoList: [...prevState.todoList, action.text]
            };

            return nextState;
        }
        default:
            return prevState;
    }
};
