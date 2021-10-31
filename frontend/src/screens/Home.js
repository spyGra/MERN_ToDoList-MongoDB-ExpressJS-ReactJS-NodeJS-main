import TableOfToDos from "../containersHome/TableOfToDos";
import InputRow from "../containersHome/InputRow";
import Pagination from "../containersHome/Pagination";

const Home = () => {

    return(
        <>
            <InputRow />
            <TableOfToDos />
            <Pagination />
        </>
    )
}

export default Home;