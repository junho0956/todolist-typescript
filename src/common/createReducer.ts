import {produce} from 'immer';
import { TodoItemType } from '.';
// import { addTodoType, delTodoType, toggleTodoType } from '../todolist/state';

export default function createReducer(initialState:TodoItemType[], handlerMap:any){
    console.log("handlerMap : ", handlerMap);
    return function(state = initialState, action:any){
        console.log("action : ", action);
        return produce((state, draft:any) => {
            const handler = handlerMap[action.type];
            if(handler){
                handler(draft, action);
            }
        })
    }
}