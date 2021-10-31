import ReactDOM from "react-dom";
import {useTaskContext} from "../context/toDoContext";
import "./deleteModal.scss";
import {useHistory} from "react-router-dom";

const LogoutModal = () => {
    const history = useHistory()
    const {showLogoutModal, changeLogoutModalVisibility, setUserLogin} = useTaskContext()
    const userId = sessionStorage.getItem('userId')

    if (showLogoutModal === false){
        return ReactDOM.createPortal(
            <div className="delete_modal">
                <div className="delete_modal_card">
                    <div className="delete_modal_card_x_button" onClick={changeLogoutModalVisibility}>x</div>
                    <div className="delete_yes_button" onClick={()=>{
                        setUserLogin()
                        sessionStorage.clear()
                        changeLogoutModalVisibility()
                        history.push("/")
                    }}>YES</div>
                    <div className="delete_modal_card_style">
                        <p className="delete_modal_p">{userId} are you sure you want to logout?</p>
                    </div>
                </div>
            </div>, document.querySelector("#modal-root")
        )
    } else {
        return null
    }
};

export default LogoutModal;