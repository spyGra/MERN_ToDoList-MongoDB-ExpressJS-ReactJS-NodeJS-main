import {useTaskContext} from "../context/toDoContext";
import "./pagination.scss";

const Pagination = () => {

    const {
        pageNumber,
        setPageNumber,
        totalToDos,
        pageLength,
    } = useTaskContext();

    const totalToDoNumber = totalToDos?.length
    const totalPagesNumber = Math.ceil( totalToDoNumber / pageLength)

    let pageButtonNumbers = []
    for(let i=0; i<totalPagesNumber; i++){
        pageButtonNumbers.push(
            <li key={i} className="pagination_li">
                <button className={i+1 !== pageNumber?"number_buttons":"number_buttons_current"} onClick={()=>setPageNumber(i+1)}>
                    {i + 1}
                </button>
            </li>
        )
    }

    return(
        <nav className="pagination_nav">
            <ul className="pagination_ul">
                <li className="pagination_li">
                    <button className="previous_button" onClick={()=>setPageNumber(prev=>Math.max(prev-1, 1))}>Previous</button>
                </li>
                    {pageButtonNumbers}
                <li className="pagination_li">
                    <button className="next_button" onClick={()=>setPageNumber(prev => (pageNumber === totalPagesNumber)? prev : prev + 1)}>Next</button>
                </li>
            </ul>
        </nav>
    )
}

export default Pagination;