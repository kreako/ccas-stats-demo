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
    { id: nanoid(), postCode: "12130", name: "LA CAPELLE BONANCE" },
    { id: nanoid(), postCode: "12130", name: "PIERREFICHE" },
    { id: nanoid(), postCode: "12140", name: "CAMPOURIEZ" },
    { id: nanoid(), postCode: "12140", name: "ENTRAYGUES SUR TRUYERE" },
    { id: nanoid(), postCode: "12140", name: "FLORENTIN LA CAPELLE" },
    { id: nanoid(), postCode: "12140", name: "LE FEL" },
    { id: nanoid(), postCode: "12140", name: "ST HIPPOLYTE" },
    {
      id: nanoid(),
      postCode: "12150",
      name: "SEVERAC D AVEYRON - RECOULES PREVINQUIERES",
    },
    {
      id: nanoid(),
      postCode: "12150",
      name: "SEVERAC D AVEYRON - LAPANOUSE",
    },
    {
      id: nanoid(),
      postCode: "12150",
      name: "SEVERAC D AVEYRON - BUZEINS",
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
