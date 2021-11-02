import React from "react"
import ReactDOM from "react-dom"
import "./index.css"
import App from "./App"
import { Provider } from "react-redux"
import { store } from "./app/store"
import { generateEvent } from "./features/event/eventSlice"
import { generateCity, selectAllCityIds } from "./features/city/citySlice"

;(async () => {
  await store.dispatch(generateCity())
  // cast Array<EntityId> to Array<string> is safe here because city id are string
  const cityIds = selectAllCityIds(store.getState()) as Array<string>
  await store.dispatch(generateEvent(cityIds))
})()

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
)
