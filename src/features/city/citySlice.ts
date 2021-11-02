import {
  createAsyncThunk,
  createEntityAdapter,
  createSelector,
  createSlice,
  nanoid,
} from "@reduxjs/toolkit"
import { RootState } from "../../app/store"
import { EventType } from "../event/eventSlice"

type City = {
  id: string
  postCode?: string
  name: string
}

export const generateCity = createAsyncThunk("city/generate", async () => {
  return [
    { id: nanoid(), postCode: "12130", name: "La Capelle Bonance" },
    { id: nanoid(), postCode: "12130", name: "Pierrefiche" },
    { id: nanoid(), postCode: "12140", name: "Campouriez" },
    { id: nanoid(), postCode: "12140", name: "Entraygues Sur Truyere" },
    { id: nanoid(), postCode: "12140", name: "Florentin La Capelle" },
    { id: nanoid(), postCode: "12140", name: "Le Fel" },
    { id: nanoid(), postCode: "12140", name: "St Hippolyte" },
    {
      id: nanoid(),
      postCode: "12150",
      name: "Severac d'Aveyron - Recoules Previnquieres",
    },
    {
      id: nanoid(),
      postCode: "12150",
      name: "Severac d'Aveyron - Lapanouse",
    },
    {
      id: nanoid(),
      postCode: "12150",
      name: "SEverac d'Aveyron - Buzeins",
    },
    { id: nanoid(), name: "Autre" },
  ]
})

const citiesAdapter = createEntityAdapter<City>()
const initialState = citiesAdapter.getInitialState()

export const citySlice = createSlice({
  name: "city",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(generateCity.fulfilled, (state, action) => {
      citiesAdapter.setAll(state, action.payload)
    })
  },
})

export const { selectAll: selectAllCities, selectIds: selectAllCityIds } =
  citiesAdapter.getSelectors((state: RootState) => state.city)

export const selectAllPostCode = createSelector(
  [selectAllCities],
  (cities: Array<City>) => {
    const s = cities.reduce((storage: Set<string>, c: City) => {
      if (c.postCode != undefined) {
        storage.add(c.postCode)
      }
      return storage
    }, new Set())
    return [...s.values()]
  }
)

export const selectByPostCode = createSelector(
  [selectAllCities, (state: RootState, postCode: string) => postCode],
  (cities: Array<City>, postCode: string) =>
    cities.reduce((storage: Array<City>, c: City) => {
      if (c.postCode === postCode) {
        storage.push(c)
      }
      return storage
    }, [])
)

export default citySlice.reducer
