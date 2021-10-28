import ReactDOM from "react-dom";
import {useTaskContext} from "../context/toDoContext";
import "./deleteModal.scss";

const DeleteModal = () => {
    const {showDeleteModal, changeDeleteModalVisibility, deletePost, paramsName} = useTaskContext()

    if (showDeleteModal === false){
        return ReactDOM.createPortal(
            <div className="delete_modal">
                <div className="delete_modal_card">
                    <div className="delete_modal_card_x_button" onClick={changeDeleteModalVisibility}>x</div>
                    <div className="delete_yes_button">YES</div>
                    <div className="delete_modal_card_style">
                        <p className="delete_modal_p">Are you sure to delete "{paramsName}" task?</p>
                    </div>
                </div>
            </div>, document.querySelector("#modal-root")
        )
    } else {
        return null
    }
};

export default DeleteModal;