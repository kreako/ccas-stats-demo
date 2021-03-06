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
  isSunday,
  isWeekend,
  parseISO,
} from "date-fns"
import chance from "chance"
import { selectAllPostCode } from "../city/citySlice"

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
    const ageWeight = ch.n(ch.integer, 8, { min: 5, max: 20 })
    const events: Array<EventType> = []
    // Generate events for each business days of the year
    const year = new Date().getFullYear()
    const now = new Date()
    let dt = new Date(year - 1, 0, 1)
    // go to the first non-sunday day
    while (isSunday(dt)) {
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
          dt.getFullYear(),
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
          kind: ch.weighted(["passage", "mail", "phone"], [65, 15, 20]),
          gender: ch.weighted(["male", "female", "x"], [49, 50, 1]),
          age: ch.weighted(
            [
              "0-14",
              "15-24",
              "25-34",
              "35-44",
              "45-54",
              "55-64",
              "65-74",
              "75-+",
            ],
            ageWeight
          ),
          city: randChoices(cityIds),
          date: d.toISOString(),
        })
      }
      // Go to the next day
      dt = addDays(dt, 1)
      if (isSunday(dt)) {
        // no activity on sunday
        dt = addDays(dt, 1)
      }
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

export const selectEventDateSlice = createSelector(
  [selectAllEvents, (state: RootState, from: string, to: string) => [from, to]],
  (events: Array<EventType>, [from, to]) => {
    const fromDt = parseISO(from)
    const toDt = addDays(parseISO(to), 1) // end of the last day is the beginning of the next one (at 00:00:00)
    const slice: Array<EventType> = []
    for (const event of events) {
      const dt = parseISO(event.date)
      if (fromDt <= dt && dt <= toDt) {
        slice.push(event)
      }
    }
    return slice
  }
)

export const selectEventCountPerDate = createSelector(
  [selectAllEvents, (state: RootState, from: string, to: string) => [from, to]],
  (events: Array<EventType>, [from, to]) => {
    const fromDt = parseISO(from)
    // TODO this is a mess this 5x copy-paste
    // Move this logic out of the store into an adapter module somewhere
    const toDt = addDays(parseISO(to), 1) // end of the last day is the beginning of the next one (at 00:00:00)
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
    const toDt = addDays(parseISO(to), 1) // end of the last day is the beginning of the next one (at 00:00:00)
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
    const toDt = addDays(parseISO(to), 1) // end of the last day is the beginning of the next one (at 00:00:00)
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

export const selectEventAgePerDate = createSelector(
  [selectAllEvents, (state: RootState, from: string, to: string) => [from, to]],
  (events: Array<EventType>, [from, to]) => {
    const fromDt = parseISO(from)
    const toDt = addDays(parseISO(to), 1) // end of the last day is the beginning of the next one (at 00:00:00)
    const count = {
      "0-14": 0,
      "15-24": 0,
      "25-34": 0,
      "35-44": 0,
      "45-54": 0,
      "55-64": 0,
      "65-74": 0,
      "75-+": 0,
    }
    for (const event of events) {
      const dt = parseISO(event.date)
      if (fromDt <= dt && dt <= toDt) {
        if (event.age === "0-14") {
          count["0-14"] += 1
        } else if (event.age === "15-24") {
          count["15-24"] += 1
        } else if (event.age === "25-34") {
          count["25-34"] += 1
        } else if (event.age === "35-44") {
          count["35-44"] += 1
        } else if (event.age === "45-54") {
          count["45-54"] += 1
        } else if (event.age === "55-64") {
          count["55-64"] += 1
        } else if (event.age === "65-74") {
          count["65-74"] += 1
        } else {
          count["75-+"] += 1
        }
      }
    }
    return count
  }
)

export default eventSlice.reducer
