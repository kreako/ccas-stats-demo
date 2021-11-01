import { useAppSelector } from "../../app/hooks"
import { selectAllEvents, EventType } from "./eventSlice"
import { formatDistanceToNow, parseISO } from "date-fns"
import { fr } from "date-fns/locale"
import { UserIcon, PhoneIcon, MailIcon } from "@heroicons/react/solid"
import Card from "../../ui/Card"
import CenterAlign from "../../ui/CenterAlign"
import { ageToStr, genderToStr, kindToStr } from "./util"

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
  return <div className="font-bold">{kindToStr(event.kind)}</div>
}

function Age({ event }: EventProps) {
  return <div>{ageToStr(event.age)}</div>
}

function Gender({ event }: EventProps) {
  return <div>{genderToStr(event.gender)}</div>
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
