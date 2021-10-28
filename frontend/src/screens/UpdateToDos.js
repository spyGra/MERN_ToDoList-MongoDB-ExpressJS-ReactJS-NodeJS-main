import React, {useEffect} from 'react';
import './updateToDos.scss';
import {useTaskContext} from "../context/toDoContext";
import {useHistory, useParams} from "react-router-dom";
import axios from "axios";

const UpdateToDos = () => {

    const {toDoParams, id} = useParams()
    const history = useHistory()
    const {
        setUpdateId,
        handleCompletedTasks,
        handleUpdateClick,
        handleUpdateChange,
        inputNewToDo,
        setCompletedTask,
        completedTask,
        deletePost,
        setInputNewToDo
    } = useTaskContext()

    useEffect(()=>{
        axios.get(`http://localhost:3001/findone/${id}`)
            .then(data=>setCompletedTask(data?.data[0]?.complete))
            .then(()=>setUpdateId(id))
    },[id])

    return(
        <div>
            <div className="update_card_parent">
                <div className={completedTask?"update_card_sun":"update_card_moon"}>
                    {toDoParams}
                </div>
            </div>
            <div className="update_row">
                <div className="update_row_children">
                    <input
                        className={completedTask?"update_input_sun":"update_input_moon"}
                        type="text"
                        onChange={handleUpdateChange}
                        name="task"
                        value={inputNewToDo.task}
                        autoComplete="off"
                        placeholder="Please update the task.."
                        maxLength="28"
                    />
                </div>
                <div className="update_row_children">
                    <div
                        className="update_row_buttons"
                        onClick={handleUpdateClick}
                    >Update</div>
                </div>
                <div className="update_row_children">
                    <div
                        className="update_row_buttons"
                        onClick={handleCompletedTasks}
                    >{completedTask && completedTask?<>Task Completed</>:<>Not Yet!</>}</div>
                </div>
                <div className="update_row_children">
                    <div
                        className="update_row_buttons"
                        onClick={deletePost}
                    >Delete</div>
                </div>
                <div className="update_row_children">
                    <div
                        className="update_row_buttons"
                        onClick={()=> {
                            history.replace("/")
                            setInputNewToDo({task: ""})
                        }}
                    >Cancel</div>
                </div>
            </div>
        </div>
    )
}

export default UpdateToDos;