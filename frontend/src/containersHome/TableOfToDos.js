import React,{ useEffect } from 'react';
import { useTaskContext } from "../context/toDoContext";
import axios from "axios";
import "./tableOfToDos.scss";

const TableOfToDos = () => {
    const {
        toDoList,
        setToDoList,
        sendToUpdatePage,
        setCheckedItems,
        pageLength,
        pageNumber,
        setTotalToDos,
        totalToDos
    } = useTaskContext()

    useEffect(() => {
        axios.get(`http://localhost:3001/alltasks/${pageNumber}/${pageLength}`)
            .then(data => setToDoList(data?.data)
            )
            .catch(err=>{
                console.log(err)
            })
    },[pageNumber, pageLength, setToDoList])

    useEffect(() => {
        axios.get(`http://localhost:3001/alltasks`)
            .then(data => setTotalToDos(data?.data)
            )
            .catch(err=>{
                console.log(err)
            })
    },[setTotalToDos, toDoList])

    useEffect(()=>{
        setCheckedItems(totalToDos.filter(item=>!item.complete).map((item)=>item._id))
    },[totalToDos, setCheckedItems])

    const allToDoButtons = toDoList.map((item) => {
            return (
                <tr key={item._id}>
                    <td>
                        <button className={item.complete?"todos_button_sun sun":"todos_button_moon moon"}
                            id={item._id}
                            onClick={sendToUpdatePage}
                        >{item.task}
                        </button>
                    </td>
                </tr>
            )
        }
    )
    return (
        <table className="todos_table">
            <tbody>
                {allToDoButtons}
            </tbody>
        </table>
    )
}

export default TableOfToDos;