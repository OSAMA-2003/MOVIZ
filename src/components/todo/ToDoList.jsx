/** @format */
// import { useForm } from "react-hook-form";
import { useState } from "react";
import "./todo.css";
import { TiDelete } from "react-icons/ti";


function ToDoList() {

    
    
    const onSubmit = (e)=>{
        e.preventDefault();
        setTasks([...tasks ,{ title:input , completed:false }]) ;
        setInput(" ")
    } 

    const [input,setInput] = useState("")
    const [tasks, setTasks] = useState([])

    const onInputChange = (e)=>{
        setInput(e.target.value)
    }


    const handleDelete = (task) => {
        setTasks(tasks.filter((item) => item.title!== task.title));
    }

    const handleDone=(task)=>{
        setTasks(tasks.map((item) => item.title === task.title? {...item, completed:!item.completed} : item))
    }
  

  return (
    <div className="todoList my-5 d-flex  flex-column container  todo_container  text-white ">
      <form className="my-5" onSubmit={onSubmit}>
        <h1  className="text-center"> To Do List</h1>
        <div className="d-flex gap-4 mx-3 align-items-start   ">
          <input
            type="text"
            placeholder="Add a task"
            className="form-control task-input"
            value={input}
            required
            onChange={onInputChange}
            name="task"
            
          />
          <button type="submit" className="btn btn-primary">
            Add
          </button>
        </div>
      </form>

    <div>
    <ul className="">
        {tasks.map((item , index)=>(
            <li key={index}>
                {/* <input type="text" value={item.title} onChange={(e)=>e.preventDefault()} /> */}
                <div className="content-container ">
                <div className=" start-0 "><h5>{item.title}</h5></div>
                <div className="d-flex">
                    
                    
                    <button className="end btn fs-3 text-danger" onClick={()=>{handleDelete(item)}} ><TiDelete /></button>
                </div>
                </div>
            </li>
        ))}
        </ul>
    </div>


    </div>
  );
}

export default ToDoList;
