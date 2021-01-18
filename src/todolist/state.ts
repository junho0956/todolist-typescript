import {TodoItemType} from '../common';
// import createReducer from '../common/createReducer';
import {produce} from 'immer';

export const AddTodo = 'state/AddTodo' as const;
export const DelTodo = 'state/DelTodo' as const;
export const ToggleTodo = 'state/ToggleTodo' as const;

let todoId = 1;
export interface addTodoType {
    type: string;
    todo: TodoItemType,
}
export interface delTodoType{
    type:string;
    id: number;
}
export interface toggleTodoType{
    type:string;
    id:number;
}

export const addTodo = (todo:string) => ({
    type: AddTodo,
    todo: {
        todo: todo,
        done: false,
        id: todoId++,
    }
})

export const delTodo = (id:number) => ({
    type: DelTodo,
    id: id,
})

export const toggleTodo = (id:number) => ({
    type: ToggleTodo,
    id: id,
})


const initialState:TodoItemType[] = [{
    todo: 'todo example',
    done: false,
    id: 0,
}]

type actionType = ReturnType<typeof addTodo> | ReturnType<typeof delTodo> | ReturnType<typeof toggleTodo>;

// const reducer = createReducer(initialState, {
//     [AddTodo]: (state:TodoItemType[], action:addTodoType) => state.push(action.todo),
//     [DelTodo]: (state:TodoItemType[], action:delTodoType) => state.filter(item => item.id !== action.id),
//     [ToggleTodo]: (state:TodoItemType[], action:toggleTodoType) => state.map(item => item.id === action.id ? {...item, done: !item.done} : item),
// })

const reducer = (state = initialState, action:actionType) => {
    // return produce((state, draft:any) => {
    //     switch(action.type){
    //         case AddTodo:{
    //             return state.push(action.todo);
    //         }
    //         case DelTodo:{
    //             return state.filter((item:TodoItemType) => item.id !== action.id);
    //         }
    //         case ToggleTodo:{
    //             return state.map((item:TodoItemType) => item.id === action.id ? {...item, done: !item.done}: item)
    //         }
    //         default:
    //             return state;
    //     }
    // })
    switch(action.type){
        case AddTodo:{
            return state.concat(action.todo);
        }
        case DelTodo:{
            return state.filter((item:TodoItemType) => item.id !== action.id);
        }
        case ToggleTodo:{
            return state.map((item:TodoItemType) => item.id === action.id ? {...item, done: !item.done}: item)
        }
        default:
            return state;
    }
}

export default reducer;