import { Dispatch, useReducer } from "react"
import { PencilIcon } from "@heroicons/react/solid"
import {
  EventKind,
  EventGender,
  EventAge,
  addEvent,
  NewEventType,
} from "./eventSlice"
import { ageToStr, dateToStr, genderToStr, kindToStr } from "./util"
import {
  OTHER_ID,
  selectAllPostCode,
  selectCityByPostCode,
} from "../city/citySlice"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { Group, GroupOption } from "../../ui/RadioGroup"

type CheckIconProps = {
  className: string
}

function CheckIcon(props: CheckIconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <circle cx={12} cy={12} r={12} fill="#000" opacity="0.2" />
      <path
        d="M7 13l3 3 7-7"
        stroke="#000"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

type KindGroupProps = {
  kind: EventKind | null
  setKind: (k: EventKind) => void
}

function KindGroup({ kind, setKind }: KindGroupProps) {
  return (
    <div className="flex justify-center py-6 space-x-2">
      <Group value={kind} onChange={setKind} label="Le type d'évènement">
        <div className="flex flex-col space-y-4">
          <GroupOption bg="bg-amber-200" label="Passage" value="passage" />
          <GroupOption bg="bg-cyan-200" label="Téléphone" value="phone" />
          <GroupOption bg="bg-purple-200" label="Email" value="mail" />
        </div>
      </Group>
    </div>
  )
}

type GenderGroupProps = {
  gender: EventGender | null
  setGender: (k: EventGender) => void
}

function GenderGroup({ gender, setGender }: GenderGroupProps) {
  return (
    <div className="flex justify-center py-6 space-x-2">
      <Group value={gender} onChange={setGender} label="Le genre du visiteur">
        <div className="flex flex-col space-y-4">
          <GroupOption bg="bg-blue-200" label="Homme" value="male" />
          <GroupOption bg="bg-pink-200" label="Femme" value="female" />
          <GroupOption bg="bg-blueGray-200" label="Autre" value="x" />
        </div>
      </Group>
    </div>
  )
}

type AgeGroupProps = {
  age: EventAge | null
  setAge: (a: EventAge) => void
}

function AgeGroup({ age, setAge }: AgeGroupProps) {
  return (
    <div className="flex justify-center py-6 space-x-2">
      <Group value={age} onChange={setAge} label="L'age du visiteur">
        <div className="flex flex-col space-y-4">
          <GroupOption
            bg="bg-amber-100"
            label={ageToStr("0-14")}
            value="0-14"
          />
          <GroupOption
            bg="bg-amber-100"
            label={ageToStr("15-24")}
            value="15-24"
          />
          <GroupOption
            bg="bg-amber-100"
            label={ageToStr("25-34")}
            value="25-34"
          />
          <GroupOption
            bg="bg-amber-100"
            label={ageToStr("35-44")}
            value="35-44"
          />
          <GroupOption
            bg="bg-amber-100"
            label={ageToStr("45-54")}
            value="45-54"
          />
          <GroupOption
            bg="bg-amber-100"
            label={ageToStr("55-64")}
            value="55-64"
          />
          <GroupOption
            bg="bg-amber-100"
            label={ageToStr("65-74")}
            value="65-74"
          />
          <GroupOption
            bg="bg-amber-100"
            label={ageToStr("75-+")}
            value="75-+"
          />
        </div>
      </Group>
    </div>
  )
}

type CityGroupByPostCodeProps = {
  postCode: string
}

function CityGroupByPostCode({ postCode }: CityGroupByPostCodeProps) {
  const cities = useAppSelector((state) =>
    selectCityByPostCode(state, postCode)
  )
  return (
    <>
      {cities.map((c) => (
        <GroupOption key={c.id} bg="bg-teal-200" label={c.name} value={c.id} />
      ))}
    </>
  )
}

type CityGroupProps = {
  city: string | null
  setCity: (c: string) => void
}

function CityGroup({ city, setCity }: CityGroupProps) {
  const postCodes = useAppSelector(selectAllPostCode)

  return (
    <div className="flex justify-center py-6 space-x-2">
      <Group value={city} onChange={setCity} label="La ville du visiteur">
        {postCodes.map((pc) => (
          <div key={pc} className="flex flex-col space-y-4">
            <div className="font-bold mt-8">{pc}</div>
            <CityGroupByPostCode postCode={pc} />
          </div>
        ))}

        <div className="flex flex-col space-y-4">
          <div className="font-bold mt-8">Autre</div>
          <GroupOption bg="bg-teal-200" label="Autre" value={OTHER_ID} />
        </div>
      </Group>
    </div>
  )
}

type DateProps = {
  date: string
}

function DateDisplay({ date }: DateProps) {
  return <div className="text-gray-700">{dateToStr(date)}</div>
}

type KindProps = {
  kind: EventKind
  resetKind: () => void
}

function Kind({ kind, resetKind }: KindProps) {
  return (
    <div className="flex space-x-2 items-center">
      <div className="text-gray-700">{kindToStr(kind)}</div>
      <button onClick={(event) => resetKind()}>
        <PencilIcon className="text-gray-500 h-4 w-4" />
      </button>
    </div>
  )
}

type GenderProps = {
  gender: EventGender
  resetGender: () => void
}

function Gender({ gender, resetGender }: GenderProps) {
  return (
    <div className="flex space-x-2 items-center">
      <div className="text-gray-700">{genderToStr(gender)}</div>
      <button onClick={(event) => resetGender()}>
        <PencilIcon className="text-gray-500 h-4 w-4" />
      </button>
    </div>
  )
}

type AgeProps = {
  age: EventAge
  resetAge: () => void
}

function Age({ age, resetAge }: AgeProps) {
  return (
    <div className="flex space-x-2 items-center">
      <div className="text-gray-700">{ageToStr(age)}</div>
      <button onClick={(event) => resetAge()}>
        <PencilIcon className="text-gray-500 h-4 w-4" />
      </button>
    </div>
  )
}

type StepProps = {
  state: NewEventType
  dispatch: Dispatch<Action>
}

function StepKind({ state, dispatch }: StepProps) {
  const kind = state.kind
  const setKind = (k: EventKind) => dispatch({ type: "kind", payload: k })
  return <KindGroup kind={kind} setKind={setKind} />
}

function StepGender({ state, dispatch }: StepProps) {
  // Because if I'm in StepGender this is because
  // state.kind and state.date are not null
  // Typescript seems not able to catch it, so... cast !
  const kind = state.kind as EventKind
  const date = state.date as string
  const gender = state.gender
  const setGender = (g: EventGender) => dispatch({ type: "gender", payload: g })
  const resetKind = () => dispatch({ type: "kind", payload: null })
  return (
    <div className="flex flex-col">
      <DateDisplay date={date} />
      <Kind kind={kind} resetKind={resetKind} />
      <GenderGroup gender={gender} setGender={setGender} />
    </div>
  )
}

function StepAge({ state, dispatch }: StepProps) {
  // Because if I'm in StepAge this is because
  // state.kind, state.date and state.gender are not null
  // Typescript seems not able to catch it, so... cast !
  const kind = state.kind as EventKind
  const date = state.date as string
  const gender = state.gender as EventGender
  const age = state.age
  const setAge = (a: EventAge) => dispatch({ type: "age", payload: a })
  const resetKind = () => dispatch({ type: "kind", payload: null })
  const resetGender = () => dispatch({ type: "gender", payload: null })
  return (
    <div className="flex flex-col">
      <DateDisplay date={date} />
      <Kind kind={kind} resetKind={resetKind} />
      <Gender gender={gender} resetGender={resetGender} />
      <AgeGroup age={age} setAge={setAge} />
    </div>
  )
}

type StepCityProps = {
  state: NewEventType
  setCity: (c: string) => void
  dispatch: Dispatch<Action>
}

function StepCity({ state, setCity, dispatch }: StepCityProps) {
  // Because if I'm in StepCity this is because
  // state.kind, state.date, state.gender, state.age and state.city are not null
  // Typescript seems not able to catch it, so... cast !
  const kind = state.kind as EventKind
  const date = state.date as string
  const gender = state.gender as EventGender
  const age = state.age as EventAge
  const city = state.city as string
  const resetKind = () => dispatch({ type: "kind", payload: null })
  const resetGender = () => dispatch({ type: "gender", payload: null })
  const resetAge = () => dispatch({ type: "age", payload: null })
  return (
    <div className="flex flex-col">
      <DateDisplay date={date} />
      <Kind kind={kind} resetKind={resetKind} />
      <Gender gender={gender} resetGender={resetGender} />
      <Age age={age} resetAge={resetAge} />
      <CityGroup city={city} setCity={setCity} />
    </div>
  )
}

type Action =
  | { type: "kind"; payload: EventKind | null }
  | { type: "gender"; payload: EventGender | null }
  | { type: "age"; payload: EventAge | null }
  | { type: "city"; payload: string | null }
  | { type: "reset" }

function newEventReducer(state: NewEventType, action: Action): NewEventType {
  switch (action.type) {
    case "kind":
      return { ...state, kind: action.payload, date: new Date().toISOString() }
    case "gender":
      return { ...state, gender: action.payload }
    case "age":
      return { ...state, age: action.payload }
    case "city":
      return { ...state, city: action.payload }
    case "reset":
      return {
        kind: null,
        gender: null,
        age: null,
        city: null,
        date: null,
      }
    default:
      throw new Error()
  }
}

export default function NewEventForm() {
  const [state, dispatch] = useReducer(newEventReducer, {
    kind: null,
    gender: null,
    age: null,
    city: null,
    date: null,
  })

  const storeDispatch = useAppDispatch()
  const setCity = (c: string) => {
    // I could have dispatch type "city" here
    // but there is no point because the next state update will happen only
    // after the next tick and will be merged with type "reset"
    storeDispatch(addEvent({ ...state, city: c }))
    dispatch({ type: "reset" })
  }

  let step
  if (state.kind === null) {
    step = <StepKind state={state} dispatch={dispatch} />
  } else if (state.gender === null) {
    step = <StepGender state={state} dispatch={dispatch} />
  } else if (state.age === null) {
    step = <StepAge state={state} dispatch={dispatch} />
  } else if (state.city === null) {
    step = <StepCity state={state} dispatch={dispatch} setCity={setCity} />
  }

  return (
    <div className="w-80">
      <div className="uppercase tracking-wider text-xs font-bold text-sky-900">
        Ajouter une nouvelle visite
      </div>
      <div className="mt-4">{step}</div>
    </div>
  )
}
