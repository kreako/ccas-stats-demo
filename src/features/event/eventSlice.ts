import {
  createEntityAdapter,
  createAsyncThunk,
  createSlice,
  nanoid,
} from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { sub } from "date-fns";
import { CITIES } from "./city";

export type EventType = {
  id: string;
  kind: "passage" | "mail" | "phone";
  gender: "male" | "female" | "x";
  age:
    | "0-14"
    | "15-24"
    | "25-34"
    | "35-44"
    | "45-54"
    | "55-64"
    | "65-74"
    | "75-+";
  city: string;
  date: string;
};

type InitialStateExtra = {
  status: "idle" | "loading" | "done";
};

const randInt = (max: number) => Math.floor(Math.random() * max);
const randChoices = (choices: Array<any>) => choices[randInt(choices.length)];

export const generateEvent = createAsyncThunk("event/generate", async () => {
  const events: Array<EventType> = [];
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
      city: randChoices(Object.keys(CITIES.cities)),
      date: sub(new Date(), { minutes: randInt(60 * 24 * 7) }).toISOString(),
    });
  }
  return events;
});

const eventsAdapter = createEntityAdapter<EventType>({
  // Keep the "all IDs" array sorted based on date (desc)
  sortComparer: (a, b) => b.date.localeCompare(a.date),
});

const initialStateExtra: InitialStateExtra = { status: "idle" };
const initialState = eventsAdapter.getInitialState(initialStateExtra);

export const eventSlice = createSlice({
  name: "counter",
  initialState: initialState,
  reducers: {
    add: eventsAdapter.addOne,
  },
  extraReducers: (builder) => {
    builder.addCase(generateEvent.fulfilled, (state, action) => {
      state.status = "done";
      eventsAdapter.setAll(state, action.payload);
    });
  },
});

export const { add } = eventSlice.actions;
export const { selectAll: selectAllEvents } = eventsAdapter.getSelectors(
  (state: RootState) => state.event
);

export default eventSlice.reducer;
