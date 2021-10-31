import ReactDOM from "react-dom";
import styles from './modal.module.scss'
import {useTaskContext} from '../context/toDoContext'

const LoginModal = () => {
    const {showLoginModal, changeLoginModalVisibility} = useTaskContext()

    if (showLoginModal === false){
        return ReactDOM.createPortal(
            <div className={styles.modal}>
                <div className={styles.modal_card}>
                    <div className={styles.modal_card_x_button} onClick={changeLoginModalVisibility}>x</div>
                    <div className={styles.modal_card_style}>
                        <p>Sorry! I couldn't find your registration </p>
                    </div>
                </div>
            </div>, document.querySelector("#modal-root")
        )
    } else {
        return null
    }
};

export default LoginModal;