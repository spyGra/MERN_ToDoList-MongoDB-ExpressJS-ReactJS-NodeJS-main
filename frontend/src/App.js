import ScreenLayout from "./components/ScreenLayout";
import TasksContextProvider from "./context/toDoContext";
import {BrowserRouter as Router, Route, Switch, useHistory} from "react-router-dom";
import Modal from "./modal/Modal";
import UpdateToDos from "./screens/UpdateToDos";
import Home from "./screens/Home";
import NotFound from "./screens/NotFound";
import DeleteModal from "./modal/DeleteModal";
import Login from "./screens/Login";
import Register from "./screens/Register";
import LogoutModal from "./modal/LogoutModal";
import LoginModal from "./modal/LoginModal";

const PrivateRoute =({children})=>{
    const history = useHistory()
    const userId = sessionStorage.getItem('userId')
    if(userId){
        return children
    } else {
        history.push('/')
        return null
    }
}

function App() {
  return (
      <Router>
      <ScreenLayout>
          <TasksContextProvider>
              <Modal />
              <DeleteModal />
              <LogoutModal />
              <LoginModal />
                  <Switch>
                      <Route exact path="/">
                          <Login />
                      </Route>
                      <Route path="/register">
                          <Register/>
                      </Route>
                      <Route path="/admin">
                          <PrivateRoute>
                              <Route path = "/admin/home">
                                  <Home />
                              </Route>
                              <Route path ="/admin/updateTask/:toDoParams/:id">
                                  <UpdateToDos />
                              </Route>
                          </PrivateRoute>
                      </Route>
                      <Route path = "*">
                          <NotFound />
                      </Route>
                  </Switch>
          </TasksContextProvider>
      </ScreenLayout>
      </Router>
  );
}

export default App;
