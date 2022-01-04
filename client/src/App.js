import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Employee from "./modules/Employee";
import Inventory from "./modules/Inventory";
import Exam from "./modules/Exam";
import LectureHall from "./modules/LectureHall";
import Home from "./Home";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/inventory">
          <Inventory />
        </Route>
        <Route path="/employee">
          <Employee />
        </Route>
        <Route path="/lecturehall">
          <LectureHall />
        </Route>
        <Route path="/exam">
          <Exam />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
