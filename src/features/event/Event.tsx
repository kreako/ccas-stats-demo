import { useAppSelector } from "../../app/hooks"
import { selectAllEvents, EventType } from "./eventSlice"
import { formatDistanceToNow, parseISO } from "date-fns"
import { fr } from "date-fns/locale"
import { UserIcon, PhoneIcon, MailIcon } from "@heroicons/react/solid"
import Card from "../../ui/Card"
import CenterAlign from "../../ui/CenterAlign"
import { useState } from "react"
import { RadioGroup } from "@headlessui/react"

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

type KindGroupOptionProps = {
  bg: string
  label: string
  value: string
}

function KindGroupOption({ bg, label, value }: KindGroupOptionProps) {
  return (
    <div className={`py-2 px-4 ${bg} rounded-md shadow-md font-bold`}>
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

function KindGroup() {
  let [group, setGroup] = useState(undefined)

  return (
    <div className="flex justify-center py-6 space-x-2">
      <RadioGroup value={group} onChange={setGroup}>
        <RadioGroup.Label className="sr-only">
          Le type d'évènement
        </RadioGroup.Label>
        <div className="flex flex-col space-y-4">
          <KindGroupOption bg="bg-amber-200" label="Passage" value="passage" />
          <KindGroupOption bg="bg-cyan-200" label="Téléphone" value="phone" />
          <KindGroupOption bg="bg-purple-200" label="Email" value="mail" />
        </div>
      </RadioGroup>
    </div>
  )
}

function NewEventForm() {
  return (
    <div className="w-96">
      <div className="uppercase tracking-wider text-xs font-bold">
        Ajouter un nouvel évènement
      </div>
      <div>
        <KindGroup />
      </div>
    </div>
  )
}

type EventProps = {
  event: EventType
}

function TimeAgo({ event }: EventProps) {
  const timeAgo = formatDistanceToNow(parseISO(event.date), { locale: fr })
  return (
    <div className="uppercase tracking-wider text-xs text-blueGray-700">
      Il y a {timeAgo}
    </div>
  )
}

function IconKind({ event }: EventProps) {
  const className = "w-8 h-8"
  switch (event.kind) {
    case "passage":
      return <UserIcon className={`${className} text-amber-300`} />
    case "phone":
      return <PhoneIcon className={`${className} text-cyan-300`} />
    case "mail":
      return <MailIcon className={`${className} text-purple-300`} />
  }
}

function Kind({ event }: EventProps) {
  const className = "font-bold"
  switch (event.kind) {
    case "passage":
      return <div className={className}>Passage</div>
    case "phone":
      return <div className={className}>Téléphone</div>
    case "mail":
      return <div className={className}>Email</div>
  }
}

function Age({ event }: EventProps) {
  switch (event.age) {
    case "0-14":
      return <div>0 à 14 ans</div>
    case "15-24":
      return <div>15 à 24 ans</div>
    case "25-34":
      return <div>25 à 34 ans</div>
    case "35-44":
      return <div>35 à 44 ans</div>
    case "45-54":
      return <div>45 à 54 ans</div>
    case "55-64":
      return <div>55 à 64 ans</div>
    case "65-74":
      return <div>65 à 74 ans</div>
    case "75-+":
      return <div>75 ans et plus</div>
  }
}

function Gender({ event }: EventProps) {
  switch (event.gender) {
    case "male":
      return <div>Homme</div>
    case "female":
      return <div>Femme</div>
    case "x":
      return <div>Autre</div>
  }
}

function City({ event }: EventProps) {
  return <div>{event.city}</div>
}

function LabelSeparator() {
  return <div> / </div>
}

function Event({ event }: EventProps) {
  return (
    <Card>
      <div className="flex space-x-4">
        <div className="flex justify-center items-center p-4">
          <IconKind event={event} />
        </div>
        <div className="flex flex-col flex-grow">
          <div className="flex justify-end flex-grow mr-4">
            <TimeAgo event={event} />
          </div>
          <Kind event={event} />
          <div className="flex space-x-2 flex-wrap">
            <Gender event={event} />
            <LabelSeparator />
            <Age event={event} />
            <LabelSeparator />
            <City event={event} />
          </div>
        </div>
      </div>
    </Card>
  )
}

function EventList() {
  const events = useAppSelector(selectAllEvents)
  return (
    <>
      {events.map((e) => (
        <div key={e.id} className="w-96">
          <Event event={e} />
        </div>
      ))}
    </>
  )
}

export default function EventPage() {
  return (
    <>
      <CenterAlign>
        <NewEventForm />
      </CenterAlign>
      <div className="my-24"></div>
      <CenterAlign>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 flex-grow-0 gap-8">
          <EventList />
        </div>
      </CenterAlign>
    </>
  )
}
