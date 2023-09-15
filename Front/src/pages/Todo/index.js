import { useState } from "react";
import ToDoItem from "../../components/ToDoComponent";
import './style.css'
export default function Tasks () {

    const [ TasksList, setTasks ] = useState([]);
    const [ textNewTask, setNewTask ] = useState("");

    const addTaks = ( task ) => {
        setTasks([...TasksList, task])
        setNewTask("");
    };

    const TaskList = () => {
        return TasksList.map(obj => {
            return (
                <div className="taksList">
                    <ToDoItem className="ToDoItem" description={`${obj}`} />
                </div>
                )
            })
        
    }

    return (
        <main className="tasks-container">
            <div className="container">
                <div className="input-new-task-div">
                    <input type="text" 
                        placeholder="Task"
                        value={textNewTask}
                        onChange={(e) => setNewTask( e.target.value )}
                        />
                    <button onClick={(e) => {
                        addTaks(textNewTask);
                        console.log(TasksList);
                    }}>Add</button>

                </div>
                <TaskList></TaskList>
            </div>
        </main>
    );
}