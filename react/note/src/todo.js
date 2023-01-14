import React, {useState} from 'react';
import ReactDOM from 'react-dom/client';

const Todo = () => {
    const [value, setValue] = useState("")

    const handleChange = () => {
        
    }

    return (
        <div>
            <h1>TODO App</h1>
            <input onChange={handleChange}/>
            <p>{value}</p>
        </div>
    )
}

const todo = ReactDOM.createRoot(document.getElementById("todo"));
todo.render(<Todo />);