import { createStore, combineReducers } from "redux";
import Todoreducer from "../todolist/state";

const reducer = combineReducers({
    todoState: Todoreducer,
})

const store = createStore(reducer);

export default store;

export type RootState = ReturnType<typeof reducer>;