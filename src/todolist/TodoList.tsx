import { TodoItemType } from "../common"
import {useState, useEffect} from 'react';
import { delTodo, toggleTodo } from "./state";
import store from "../common/store";

function TodoItem({todo}:{todo:TodoItemType}){

    function handleCheck(e: React.MouseEvent<HTMLSpanElement>){
        const todoEl = (e.currentTarget.parentNode as HTMLDivElement).children[0];
        if(!todo.done){
            (todoEl as HTMLSpanElement).style.textDecoration = "line-through";
            (todoEl as HTMLSpanElement).style. color = 'grey';
            store.dispatch(toggleTodo(todo.id));
        }
        else{
            store.dispatch(delTodo(todo.id));
        }
    }


    return (
        <div className="todoItem" data-id={todo.id}>
            <span className="todo">{todo.todo}</span>
            {!todo.done ? 
                <span className="checkbox" onClick={handleCheck}>✔</span> : 
                <span onClick={handleCheck} style={{color:'red'}}>✖</span>
            }
        </div>
    )
}

export default function TodoList({todo}:{todo:TodoItemType[]}){
    useEffect(() => {
        let todoId = 0;
        const allTodo = document.querySelectorAll('.todoItem');
        allTodo.forEach(item => {
            todoId++;
            if(todoId % 2 === 0){
                (item as HTMLDivElement).style.backgroundColor = 'aliceblue';
            }
            else{
                (item as HTMLDivElement).style.backgroundColor = 'white';
            }
        })
    }, [todo]);
    
    return(
        <>
            {todo.map((item:TodoItemType) => {
                return(<TodoItem key={item.id} todo={item} />)
            })}
        </>
    )
}