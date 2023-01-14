import React, {useState} from 'react';
import ReactDOM from 'react-dom/client';

const Todo = () => {
    const [value, setValue] = useState("");
    const [todoList, setTodoList] = useState([]);

    const handleChange = e => {
        const newValue = e.target.value
        setValue(newValue)
    }

    const add = () => {
        const newList = todoList.concat(value)
        setTodoList(newList)
        setValue("")
    }

    const onDelete = (i) => {
        const newList = todoList.filter(text => text !== todoList[i])
        setTodoList(newList)
    }

    return (
        <div>
            <h1>TODO App</h1>
            <AddTodo value={value} onChange={handleChange} add={add}/>
            <ul>
                {todoList.map((todo, i) => (
                    <TodoElement key={i} content={todo} onDelete={() => {onDelete(i)}}/>
                ))}
            </ul>
        </div>
    )
}

const TodoElement = props => {
    return(
        <li>
            {props.content}
            <button onClick={props.onDelete}>削除</button>
        </li>
    )
}

const AddTodo = props => {
    return(
        <div>
            <input value={props.value} onChange={props.onChange}/>
            <button onClick={props.add}>追加</button>
        </div>
        
    )
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Todo />);