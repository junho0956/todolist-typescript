import TodoList from "./TodoList";
import {useState, useRef} from 'react';
import {TodoItemType} from '../common';
import {useSelector} from 'react-redux';
import store, { RootState } from '../common/store';
import { addTodo, delTodo } from "./state";

export default function TodoMain(){
    const id = useRef<number>(0);
    const todoText = useRef<HTMLInputElement>(null);
    const [input, setInput] = useState<string>('');
    const todolist = useSelector((state:RootState) => state.todoState);

    function handleInput(e: React.FormEvent<HTMLInputElement>):void {
        setInput(e.currentTarget.value);
    }

    function handleKeydown(e: React.KeyboardEvent<HTMLInputElement>){
        if(e.key === 'Enter'){
            handleAddTodo();
        }
    }

    function handleAddTodo(){
        const newTodo = input;
        setInput('');
        store.dispatch(addTodo(newTodo));
        (document.querySelector('.input') as HTMLInputElement).value = '';
        (todoText.current as HTMLInputElement).focus();
    }

    function handleDeleteTodo(el: HTMLDivElement){
        const todoId:number = Number(el.dataset.id);
        store.dispatch(delTodo(todoId));
    }


    return(
        <>
            <input ref={todoText} className="input" type="text" placeholder="write your todo" onChange={handleInput} onKeyDown={handleKeydown}></input>
            <span className="inputSetButton" onClick={handleAddTodo}>담기</span>
            <strong><div style={{marginLeft:'2rem', marginBottom:'0.5rem'}}>남은 할 일: {(todolist as TodoItemType[]).length}</div></strong>
            <TodoList todo={todolist}/>
        </>
    )
} 
