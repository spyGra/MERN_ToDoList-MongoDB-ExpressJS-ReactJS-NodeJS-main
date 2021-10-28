import ScreenLayout from "./components/ScreenLayout";
import TasksContextProvider from "./context/toDoContext";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Modal from "./modal/Modal";
import UpdateToDos from "./screens/UpdateToDos";
import Home from "./screens/Home";
import NotFound from "./screens/NotFound";

function App() {
  return (
      <Router>
      <ScreenLayout>
          <TasksContextProvider>
              <Modal />
                  <Switch>
                      <Route path ="/updateTask/:toDoParams/:id">
                          <UpdateToDos />
                      </Route>
                      <Route exact path = "/">
                          <Home />
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
