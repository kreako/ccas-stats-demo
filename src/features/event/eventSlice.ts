import {
  createEntityAdapter,
  createAsyncThunk,
  createSlice,
  nanoid,
  createSelector,
} from "@reduxjs/toolkit"
import { RootState } from "../../app/store"
import {
  addBusinessDays,
  addDays,
  formatISO,
  isWeekend,
  parseISO,
} from "date-fns"
import chance from "chance"

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
    const ch = chance()
    const events: Array<EventType> = []
    // Generate events for each business days of the year
    const year = new Date().getFullYear()
    const now = new Date()
    let dt = new Date(year, 0, 1)
    // go to the first non-week-end day
    while (isWeekend(dt)) {
      dt = addDays(dt, 1)
    }
    while (dt <= now) {
      // adjust based on period
      let adjust = 20
      if (dt.getMonth() === 6 || dt.getMonth() === 7) {
        // Less activity during summer
        adjust -= 20
      }
      if (dt.getDay() === 3) {
        // Less activity on wenesday
        adjust -= 10
      }
      // number of events to generate
      const nb = randInt(25) + adjust
      for (let i = 0; i < nb; i++) {
        // Select a date
        const hour = randInt(11) + 8 // From 8h to 18h
        const minute = randInt(59)
        const second = randInt(59)
        const d = new Date(
          year,
          dt.getMonth(),
          dt.getDate(),
          hour,
          minute,
          second
        )
        if (d > now) {
          // Do not register a future event :)
          continue
        }
        // Push the event
        events.push({
          id: nanoid(),
          kind: randChoices(["passage", "mail", "phone"]),
          gender: ch.weighted(["male", "female", "x"], [49, 50, 1]),
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
          date: d.toISOString(),
        })
      }
      // Go to the next business day
      dt = addBusinessDays(dt, 1)
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

export const selectEventCountPerDate = createSelector(
  [selectAllEvents, (state: RootState, from: string, to: string) => [from, to]],
  (events: Array<EventType>, [from, to]) => {
    const fromDt = parseISO(from)
    const toDt = parseISO(to)
    // keep for each date in the period the count
    const count: { [dt: string]: number } = {}
    for (const event of events) {
      const dt = parseISO(event.date)
      if (fromDt <= dt && dt <= toDt) {
        const d = formatISO(dt, { representation: "date" })
        count[d] = count[d] || 0
        count[d] += 1
      }
    }
    // Now flatten count object to match the needed structure
    return Object.entries(count).map(([day, value]: [string, number]) => {
      return { value, day }
    })
  }
)

export const selectEventGenderPerDate = createSelector(
  [selectAllEvents, (state: RootState, from: string, to: string) => [from, to]],
  (events: Array<EventType>, [from, to]) => {
    const fromDt = parseISO(from)
    const toDt = parseISO(to)
    const count = { female: 0, male: 0, other: 0 }
    for (const event of events) {
      const dt = parseISO(event.date)
      if (fromDt <= dt && dt <= toDt) {
        if (event.gender === "female") {
          count.female += 1
        } else if (event.gender === "male") {
          count.male += 1
        } else {
          count.other += 1
        }
      }
    }
    return count
  }
)

export const selectEventKindPerDate = createSelector(
  [selectAllEvents, (state: RootState, from: string, to: string) => [from, to]],
  (events: Array<EventType>, [from, to]) => {
    const fromDt = parseISO(from)
    const toDt = parseISO(to)
    const count = { passage: 0, phone: 0, mail: 0 }
    for (const event of events) {
      const dt = parseISO(event.date)
      if (fromDt <= dt && dt <= toDt) {
        if (event.kind === "passage") {
          count.passage += 1
        } else if (event.kind === "phone") {
          count.phone += 1
        } else {
          count.mail += 1
        }
      }
    }
    return count
  }
)

export default eventSlice.reducer
