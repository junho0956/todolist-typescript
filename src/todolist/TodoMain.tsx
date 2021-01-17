import TodoList from "./TodoList";
import {useState, useRef} from 'react';
import {TodoItemType} from '../common';

export default function TodoMain(){
    const id = useRef<number>(0);
    const todoText = useRef<HTMLInputElement>(null);
    const [input, setInput] = useState<string>('');
    const [todolist, setTodolist] = useState<TodoItemType[]>([]);
    
    function handleInput(e: React.FormEvent<HTMLInputElement>):void {
        setInput(e.currentTarget.value);
    }

    function handleKeydown(e: React.KeyboardEvent<HTMLInputElement>){
        if(e.key === 'Enter'){
            handleAddTodo();
        }
    }

    function handleAddTodo(){
        const newTodo : TodoItemType = {
            todo: input,
            done: false,
            id: id.current,
        }
        id.current++;
        (document.querySelector('.input') as HTMLInputElement).value = '';
        setInput('');
        setTodolist(todolist.concat(newTodo));
        (todoText.current as HTMLInputElement).focus();
    }

    function handleDeleteTodo(el: HTMLDivElement){
        const todoId:number = Number(el.dataset.id);
        const newTodo:TodoItemType[] = todolist.filter(item => item.id !== todoId);
        setTodolist(newTodo);
    }


    return(
        <>
            <input ref={todoText} className="input" type="text" placeholder="write your todo" onChange={handleInput} onKeyDown={handleKeydown}></input>
            <span className="inputSetButton" onClick={handleAddTodo}>담기</span>
            <strong><div style={{marginLeft:'2rem', marginBottom:'0.5rem'}}>남은 할 일: {todolist.length}</div></strong>
            <TodoList todo={todolist} handleDeleteTodo={handleDeleteTodo}/>
        </>
    )
} 
