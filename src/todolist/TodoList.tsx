import { TodoItemType } from "../common"
import {useState, useEffect} from 'react';

function TodoItem({todo, handleDeleteTodo}:{todo:TodoItemType, handleDeleteTodo:(props:HTMLDivElement)=>void}){

    const [todoDone, setTodoDone] = useState<boolean>(todo.done);

    function handleCheck(e: React.MouseEvent<HTMLSpanElement>){
        const todoEl = (e.currentTarget.parentNode as HTMLDivElement).children[0];
        if(!todoDone){
            (todoEl as HTMLSpanElement).style.textDecoration = "line-through";
            (todoEl as HTMLSpanElement).style. color = 'grey';
            setTodoDone(!todo.done);
        }
        else{
            handleDeleteTodo(todoEl.parentElement as HTMLDivElement);
        }
    }


    return (
        <div className="todoItem" data-id={todo.id}>
            <span className="todo">{todo.todo}</span>
            {!todoDone ? 
                <span className="checkbox" onClick={handleCheck}>✔</span> : 
                <span onClick={handleCheck} style={{color:'red'}}>✖</span>
            }
        </div>
    )
}

export default function TodoList({todo, handleDeleteTodo}:{todo:TodoItemType[], handleDeleteTodo: (props: HTMLDivElement) => void}){
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
                return(<TodoItem key={item.id} todo={item} handleDeleteTodo={handleDeleteTodo}/>)
            })}
        </>
    )
}