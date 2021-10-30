import Event from "./features/event/Event";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/">
          <Event />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
