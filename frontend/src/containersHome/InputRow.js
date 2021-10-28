import {useTaskContext} from "../context/toDoContext";
import "./inputRow.scss";

const InputRow = () => {

    const {
        handleNewToDoClick,
        handleNewToDoChange,
        inputNewToDo,
        clearCompletedTasks
    } = useTaskContext()

    return (
        <div className="home_new_todo_row">
            <div className="home_row_children">
                <input
                    className="home_new_todo_input"
                    type="text"
                    onChange={handleNewToDoChange}
                    name="task"
                    value={inputNewToDo.task}
                    autoComplete="off"
                    placeholder="Please add a new task.."
                    maxLength="28"
                />
            </div>
            <div className="home_row_children">
                <div
                    className="home_row_buttons"
                    onClick={handleNewToDoClick}
                >Add</div>
            </div>
            <div className="home_row_children">
                <div
                    className="home_row_buttons"
                    onClick={clearCompletedTasks}
                >Clear Completed Tasks</div>
            </div>
        </div>
    )
}

export default InputRow;