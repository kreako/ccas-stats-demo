import { Dispatch, SetStateAction, useReducer, useState } from "react"
import { RadioGroup } from "@headlessui/react"
import { PencilIcon } from "@heroicons/react/solid"
import { EventKind, EventGender, EventAge, EventType } from "./eventSlice"
import { ageToStr, dateToStr, genderToStr, kindToStr } from "./util"

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

type GroupOptionProps = {
  bg: string
  label: string
  value: string
}

function GroupOption({ bg, label, value }: GroupOptionProps) {
  return (
    <div
      className={`py-2 px-4 ${bg} rounded-md shadow-md font-bold cursor-pointer`}
    >
      <RadioGroup.Option value={value}>
        {({ checked }) => (
          <div className="flex flex-row w-64">
            <div className="flex-grow">{label}</div>
            {checked && (
              <div className="flex-shrink-0">
                <CheckIcon className="w-6 h-6" />
              </div>
            )}
          </div>
        )}
      </RadioGroup.Option>
    </div>
  )
}

type KindGroupProps = {
  kind: EventKind | null
  setKind: (k: EventKind) => void
}

function KindGroup({ kind, setKind }: KindGroupProps) {
  return (
    <div className="flex justify-center py-6 space-x-2">
      <RadioGroup value={kind} onChange={setKind}>
        <RadioGroup.Label className="sr-only">
          Le type d'évènement
        </RadioGroup.Label>
        <div className="flex flex-col space-y-4">
          <GroupOption bg="bg-amber-200" label="Passage" value="passage" />
          <GroupOption bg="bg-cyan-200" label="Téléphone" value="phone" />
          <GroupOption bg="bg-purple-200" label="Email" value="mail" />
        </div>
      </RadioGroup>
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
      <RadioGroup value={gender} onChange={setGender}>
        <RadioGroup.Label className="sr-only">
          Le genre du visiteur
        </RadioGroup.Label>
        <div className="flex flex-col space-y-4">
          <GroupOption bg="bg-blue-200" label="Homme" value="male" />
          <GroupOption bg="bg-pink-200" label="Femme" value="female" />
          <GroupOption bg="bg-blueGray-200" label="Autre" value="x" />
        </div>
      </RadioGroup>
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
      <RadioGroup value={age} onChange={setAge}>
        <RadioGroup.Label className="sr-only">
          L'age du visiteur
        </RadioGroup.Label>
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
      </RadioGroup>
    </div>
  )
}

type CityGroupProps = {
  city: string | null
  setCity: (c: string) => void
}

function CityGroup({ city, setCity }: CityGroupProps) {
  return (
    <div className="flex justify-center py-6 space-x-2">
      <RadioGroup value={city} onChange={setCity}>
        <RadioGroup.Label className="sr-only">
          La ville du visiteur
        </RadioGroup.Label>
        <div className="flex flex-col space-y-4">
          <GroupOption bg="bg-blue-200" label="Todo" value="todo" />
        </div>
      </RadioGroup>
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
  state: NewEventState
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

function StepCity({ state, dispatch }: StepProps) {
  // Because if I'm in StepCity this is because
  // state.kind, state.date, state.gender, state.age and state.city are not null
  // Typescript seems not able to catch it, so... cast !
  const kind = state.kind as EventKind
  const date = state.date as string
  const gender = state.gender as EventGender
  const age = state.age as EventAge
  const city = state.city as string
  const setCity = (c: string) => dispatch({ type: "city", payload: c })
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

type NewEventState = {
  kind: EventKind | null
  gender: EventGender | null
  age: EventAge | null
  city: null | string
  date: string | null
}

type Action =
  | { type: "kind"; payload: EventKind | null }
  | { type: "gender"; payload: EventGender | null }
  | { type: "age"; payload: EventAge | null }
  | { type: "city"; payload: string | null }

function newEventReducer(state: NewEventState, action: Action): NewEventState {
  switch (action.type) {
    case "kind":
      return { ...state, kind: action.payload, date: new Date().toISOString() }
    case "gender":
      return { ...state, gender: action.payload }
    case "age":
      return { ...state, age: action.payload }
    case "city":
      return { ...state, city: action.payload }
    default:
      throw new Error()
  }
}

export default function NewEventForm() {
  let [kind, setKind] = useState<EventKind | null>(null)
  let [gender, setGender] = useState<EventGender | null>(null)
  const [state, dispatch] = useReducer(newEventReducer, {
    kind: null,
    gender: null,
    age: null,
    city: null,
    date: null,
  })

  let step
  if (state.kind === null) {
    step = <StepKind state={state} dispatch={dispatch} />
  } else if (state.gender === null) {
    step = <StepGender state={state} dispatch={dispatch} />
  } else if (state.age === null) {
    step = <StepAge state={state} dispatch={dispatch} />
  } else if (state.city === null) {
    step = <StepCity state={state} dispatch={dispatch} />
  }

  return (
    <div className="w-96">
      <div className="uppercase tracking-wider text-xs font-bold">
        Ajouter un nouvel évènement
      </div>
      <div className="mt-4">{step}</div>
    </div>
  )
}
