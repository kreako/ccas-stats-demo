import {
  createEntityAdapter,
  createAsyncThunk,
  createSlice,
  nanoid,
  createSelector,
} from "@reduxjs/toolkit"
import { RootState } from "../../app/store"
import { sub } from "date-fns"

export type EventKind = "passage" | "mail" | "phone"
export type EventGender = "male" | "female" | "x"
export type EventAge =
  | "0-14"
  | "15-24"
  | "25-34"
  | "35-44"
  | "45-54"
  | "55-64"
  | "65-74"
  | "75-+"

export type EventType = {
  id: string
  kind: EventKind
  gender: EventGender
  age: EventAge
  city: string
  date: string
}

export type NewEventType = {
  kind: EventKind | null
  gender: EventGender | null
  age: EventAge | null
  city: null | string
  date: string | null
}

type InitialStateExtra = {
  status: "idle" | "loading" | "done"
}

const randInt = (max: number) => Math.floor(Math.random() * max)
const randChoices = (choices: Array<any>) => choices[randInt(choices.length)]

export const generateEvent = createAsyncThunk(
  "event/generate",
  async (cityIds: Array<string>) => {
    const events: Array<EventType> = []
    for (let i = 0; i < 30; i++) {
      events.push({
        id: nanoid(),
        kind: randChoices(["passage", "mail", "phone"]),
        gender: randChoices(["male", "female", "x"]),
        age: randChoices([
          "0-14",
          "15-24",
          "25-34",
          "35-44",
          "45-54",
          "55-64",
          "65-74",
          "75-+",
        ]),
        city: randChoices(cityIds),
        date: sub(new Date(), { minutes: randInt(60 * 24 * 7) }).toISOString(),
      })
    }
    return events
  }
)

const eventsAdapter = createEntityAdapter<EventType>({
  // Keep the "all IDs" array sorted based on date (desc)
  sortComparer: (a, b) => b.date.localeCompare(a.date),
})

const initialStateExtra: InitialStateExtra = { status: "idle" }
const initialState = eventsAdapter.getInitialState(initialStateExtra)

export const eventSlice = createSlice({
  name: "counter",
  initialState: initialState,
  reducers: {
    addEvent(state, action) {
      const id = nanoid()
      const kind = action.payload.kind
      const gender = action.payload.gender
      const age = action.payload.age
      const city = action.payload.city
      const date = action.payload.date
      if (
        kind == null ||
        gender == null ||
        age == null ||
        city == null ||
        date == null
      ) {
        return
      }
      eventsAdapter.addOne(state, { id, kind, gender, age, city, date })
    },
  },
  extraReducers: (builder) => {
    builder.addCase(generateEvent.fulfilled, (state, action) => {
      state.status = "done"
      eventsAdapter.setAll(state, action.payload)
    })
  },
})

export const { addEvent } = eventSlice.actions
export const { selectAll: selectAllEvents } = eventsAdapter.getSelectors(
  (state: RootState) => state.event
)

export const selectEventSlice = createSelector(
  [
    selectAllEvents,
    (state: RootState, start: number, end: number) => [start, end],
  ],
  (events: Array<EventType>, [start, end]) => events.slice(start, end)
)

export default eventSlice.reducer
