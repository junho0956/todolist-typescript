import '../App.css';
import TodoTitle from './TodoTitle';
import TodoMain from './TodoMain';

export default function TodoContainer(){
    return(
        <div className="container">
            <div className="todoTitle">
                <TodoTitle />
            </div>
            <div className="todoMain">
                <TodoMain />
            </div>
        </div>
    )
}