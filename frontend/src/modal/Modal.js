import ReactDOM from "react-dom";
import styles from './modal.module.scss'
import {useTaskContext} from './../context/toDoContext'

const Modal = () => {
    const {showModal, changeModalVisibility} = useTaskContext()

    if (showModal === false){
        return ReactDOM.createPortal(
            <div className={styles.modal}>
                <div className={styles.modal_card}>
                    <div className={styles.modal_card_x_button} onClick={changeModalVisibility}>x</div>
                    <div className={styles.modal_card_style}>
                        <p>Please write a task.</p>
                    </div>
                </div>
            </div>, document.querySelector("#modal-root")
        )
    } else {
        return null
    }
};

export default Modal;