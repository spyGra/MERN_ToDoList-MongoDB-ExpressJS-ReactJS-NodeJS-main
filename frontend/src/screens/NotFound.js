import { Link } from 'react-router-dom';
import styles from './notFound.module.scss';

const NotFound = () => {
    return(
        <div className={styles.errorPage}>
            <div className={styles.errorBoard}>
                <p className={styles.sorryText}>OOPS!</p>
                <p className={styles.errorText}>Nothing was found!</p>
                <Link to='/' className={styles.returnText}>Return to homepage..</Link>
            </div>
        </div>
    )
}

export default NotFound;