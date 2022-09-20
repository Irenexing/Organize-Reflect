import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useState } from "react";
import "./ToDo.scss"


function ToDo ({
    todo, 
    toggleComplete,
    handleDelete,
    handleEdit,
    onClose,
}) {
    //useState for storing todo title
    const [newTitle, setNewTitle] = useState(todo.title);

    const handleChange =(event) => {
        event.preventDefault(); 
        if (todo.complete === true) {setNewTitle(todo.title)
    } else {
        todo.title ="";
        setNewTitle(event.target.value);
    }
    }
    return (
        <div className="todo">
            <input 
            //if todo is completed, there will be strike through text effect
            type="text"
            //show new title if it is empty
            value ={todo.title === "" ? newTitle : todo.title}
            className="todo__list"
            onChange={handleChange}
            /> 
        <div>
            <button 
            className="todo__button--complete"
            onClick={() =>toggleComplete(todo)} >
                <CheckCircleIcon  /> 
            </button>
            <button className="todo__button--edit"
            onClick={()=> handleEdit (todo,newTitle)}>
                <EditIcon /> 
            </button>
            <button className="todo__button--delete"
            onClick={()=> handleDelete (todo.id)}>
                <DeleteIcon /> 
            </button>

        </div>
        </div>
    )
}

export default ToDo;
