import React, { createContext, useContext, useState } from 'react';
import { useHistory } from "react-router-dom";
import axios from "axios";

const toDoContext = createContext('')

const TasksContextProvider = ({children}) => {
    const history = useHistory();
    const [paramsName, setParamsName] = useState()
    const [toDoList, setToDoList] = useState([])
    const [showLoginModal, setShowLoginModal] = useState(true)
    const [showLogoutModal, setShowLogoutModal] = useState(true)
    const [showDeleteModal, setShowDeleteModal] = useState(true)
    const [showModal, setShowModal] = useState(true)
    const [checkedItems, setCheckedItems] = useState([])
    const [inputNewToDo, setInputNewToDo] = useState({ task: "" })
    const [totalToDos, setTotalToDos] = useState([])
    const [pageNumber, setPageNumber] = useState(1)
    const [pageLength, setPageLength] = useState(5)
    const [updateId, setUpdateId] = useState(0)
    const [completedTask, setCompletedTask] =useState()
    const [userLogin, setUserLogin] = useState()
    const [inputUser, setInputUser] = useState({
        userName: "",
        userPassword: ""
    })

//users functions
    const changeLoginModalVisibility = () => {
        setShowLoginModal(!showLoginModal)
    }

    const handleNewUserRegistrationClick = (e) =>{
        e.preventDefault()
        axios.post("http://localhost:3001/adduser", inputUser)
            .then((data)=>{
                setInputUser({
                        userName: "",
                        userPassword: ""
                })
            })
            .then(()=>history.push("/"))
            .catch(err=> console.log(err))
    }

    const handleLogin = (e) =>{
        e.preventDefault()
        axios.get(`http://localhost:3001/login/${inputUser.userName}/${inputUser.userPassword}`)
            .then(data=> {
                if(data.data[0]._id){
                    setUserLogin(data.data)
                }
            })
            .catch(err=>{
                changeLoginModalVisibility()
                console.log(err)
            })
    }

// home screen functions

    const changeLogoutModalVisibility = () => {
        setShowLogoutModal(!showLogoutModal)
    }

    const changeModalVisibility = () => {
        setShowModal(!showModal)
    }

    const changeDeleteModalVisibility = () => {
        setShowDeleteModal(!showDeleteModal)
    }

    const handleLogout = () => {
        changeLogoutModalVisibility()
    }

    const handleDelete = () => {
        changeDeleteModalVisibility()
    }

    const sendToUpdatePage = e =>{
        const id = e.target.id;
        const task = toDoList.filter(
            item => item._id === id
        )
        history.replace(`/admin/updateTask/${task?.[0]?.task}/${task?.[0]?._id}/`)
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

// update screen functions

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
                .then(()=>history.replace("/admin/home"))
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
            .then(()=>{history.replace("/admin/home")
            })
            .then(()=>changeDeleteModalVisibility())
            .catch(err=>console.log(err))
    }

    return(
        <toDoContext.Provider value={{
            setUserLogin,
            userLogin,
            inputUser,
            setInputUser,
            showLoginModal,
            showLogoutModal,
            showDeleteModal,
            paramsName,
            setParamsName,
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
            changeLoginModalVisibility,
            handleLogout,
            changeLogoutModalVisibility,
            handleLogin,
            handleNewUserRegistrationClick,
            changeDeleteModalVisibility,
            handleDelete,
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