import styles from "./screenLayout.module.scss"
import Header from "./Header";

const ScreenLayout = ({children}) => {
    return(
        <div className={styles.backPicture}>
            <Header />
            {children}
        </div>
    )
}
export default ScreenLayout;