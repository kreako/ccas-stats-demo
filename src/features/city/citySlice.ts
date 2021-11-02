import {
  createAsyncThunk,
  createEntityAdapter,
  createSelector,
  createSlice,
  nanoid,
} from "@reduxjs/toolkit"
import { RootState } from "../../app/store"
import { EventType } from "../event/eventSlice"

export type CityType = {
  id: string
  postCode?: string
  name: string
}

export const OTHER_ID = nanoid()

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
    { id: OTHER_ID, name: "Autre" },
  ]
})

const citiesAdapter = createEntityAdapter<CityType>()
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

export const {
  selectAll: selectAllCities,
  selectIds: selectAllCityIds,
  selectById: selectCityById,
} = citiesAdapter.getSelectors((state: RootState) => state.city)

export const selectAllPostCode = createSelector(
  [selectAllCities],
  (cities: Array<CityType>) => {
    const s = cities.reduce((storage: Set<string>, c: CityType) => {
      if (c.postCode != undefined) {
        storage.add(c.postCode)
      }
      return storage
    }, new Set())
    const postcodes = [...s.values()]
    postcodes.sort()
    return postcodes
  }
)

export const selectCityByPostCode = createSelector(
  [selectAllCities, (state: RootState, postCode: string) => postCode],
  (cities: Array<CityType>, postCode: string) =>
    cities.reduce((storage: Array<CityType>, c: CityType) => {
      if (c.postCode === postCode) {
        storage.push(c)
      }
      return storage
    }, [])
)

export default citySlice.reducer
