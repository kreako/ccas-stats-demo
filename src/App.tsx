import EventPage from "./features/event/Event"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"

export default function App() {
  return (
    <Router>
      <Switch>
        <Route path="/">
          <EventPage />
        </Route>
      </Switch>
    </Router>
  )
}
