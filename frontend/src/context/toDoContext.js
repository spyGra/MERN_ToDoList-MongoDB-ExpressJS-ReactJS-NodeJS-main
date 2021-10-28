import React, { createContext, useContext, useState } from 'react';
import { useHistory } from "react-router-dom";
import axios from "axios";

const toDoContext = createContext('')

const TasksContextProvider = ({children}) => {
    const history = useHistory();
    const [toDoList, setToDoList] = useState([])
    const [showModal, setShowModal] = useState(true)
    const [checkedItems, setCheckedItems] = useState([])
    const [inputNewToDo, setInputNewToDo] = useState({ task: "" })
    const [totalToDos, setTotalToDos] = useState([])
    const [pageNumber, setPageNumber] = useState(1)
    const [pageLength, setPageLength] = useState(5)
    const [updateId, setUpdateId] = useState(0)
    const [completedTask, setCompletedTask] =useState()

    const changeModalVisibility = () => {
        setShowModal(!showModal)
    }

    const sendToUpdatePage = e =>{
        const id = e.target.id;
        const task = toDoList.filter(
            item => item._id === id
        )
        history.replace(`/updateTask/${task?.[0]?.task}/${task?.[0]?._id}/`)
    }

    const handleNewToDoChange=(event)=>{
        const {name, value} = event.target
        setInputNewToDo({[name]: value})
    }

    const handleNewToDoClick =()=>{
        const isEmpty = string => !string.trim().length
        if (isEmpty(inputNewToDo.task)) {
            changeModalVisibility()
        } else {
            const newTask = {
                task: inputNewToDo.task
            }
            axios.post("http://localhost:3001/addtask", newTask)
                .then(()=>{
                    axios.get(`http://localhost:3001/alltasks/${pageNumber}/${pageLength}`)
                        .then(data=>setToDoList(data.data))
                        .catch(err=>{
                            console.log(err)
                        })
                }).catch(err=>{
                    console.log(err)
            })
        }
        setInputNewToDo({task: ""})
    }

    const clearCompletedTasks=()=>{
        axios.delete(`http://localhost:3001/deletemany/${checkedItems}`)
            .then(()=>{
                axios.get(`http://localhost:3001/alltasks/${pageNumber}/${pageLength}`)
                    .then(data=>setToDoList(data.data))
                    .catch(err=> console.log(err))
            })
            .catch(err=>console.log(err, "there are no checked items"))
    }

    // update page functions

    const handleUpdateChange=(event)=>{
        const {name, value} = event.target
        setInputNewToDo({[name]: value})
    }

    const handleUpdateClick =()=>{
        const isEmpty = string => !string.trim().length
        if (isEmpty(inputNewToDo.task)) {
            changeModalVisibility()
        } else {
            const newTask = { task: inputNewToDo.task }
            axios.put(`http://localhost:3001/update/${updateId}`, newTask)
                .then(()=>history.replace("/"))
                .catch(err=>console.log(err))
        }
        setInputNewToDo({task: ""})
    }

    const handleCompletedTasks = () =>{
        const complete = !completedTask
        const newComplete = {complete: complete}
        axios.put(`http://localhost:3001/updatecomplete/${updateId}`, newComplete)
            .then(()=>{
                axios.get(`http://localhost:3001/findone/${updateId}`)
                    .then(data=>setCompletedTask(data.data[0].complete))
            })
    }

    const deletePost = () =>{
        axios.delete(`http://localhost:3001/delete/${updateId}`)
            .then(()=>{history.replace("/")
            })
            .catch(err=>console.log(err))
    }

    return(
        <toDoContext.Provider value={{
            showModal,
            toDoList,
            setToDoList,
            inputNewToDo,
            checkedItems,
            setInputNewToDo,
            setCheckedItems,
            pageNumber,
            setPageNumber,
            pageLength,
            setPageLength,
            totalToDos,
            setTotalToDos,
            setUpdateId,
            updateId,
            setCompletedTask,
            completedTask,
            deletePost,
            handleCompletedTasks,
            handleUpdateClick,
            changeModalVisibility,
            sendToUpdatePage,
            handleNewToDoChange,
            handleNewToDoClick,
            clearCompletedTasks,
            handleUpdateChange,
        }}>
                {children}
        </toDoContext.Provider>
    )
}

export const useTaskContext = () => {
    return useContext(toDoContext)
}

export default TasksContextProvider;