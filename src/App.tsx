import EventPage from "./features/event/Event"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import NavBar from "./ui/NavBar"
import StatPage from "./features/stat/Stat"

export default function App() {
  return (
    <Router basename="/ccas-demo">
      <NavBar />
      <Switch>
        <Route exact path="/">
          <EventPage />
        </Route>
        <Route path="/stats">
          <StatPage />
        </Route>
      </Switch>
    </Router>
  )
}
