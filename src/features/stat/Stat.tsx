import { ResponsiveCalendar } from "@nivo/calendar"
import { sky } from "tailwindcss/colors"
import { useAppSelector } from "../../app/hooks"
import { selectEventCountPerDate } from "../event/eventSlice"

type EventCalendarProps = {
  label: string
  from: string
  to: string
}

function EventCalendar({ label, from, to }: EventCalendarProps) {
  const data = useAppSelector((state) =>
    selectEventCountPerDate(state, from, to)
  )
  return (
    <div className="flex flex-col space-y-1 items-center h-48 lg:h-64 xl:h-96">
      <ResponsiveCalendar
        data={data}
        from={from}
        to={to}
        colors={[sky[200], sky[400], sky[600], sky[800]]}
      />
      <div className="flex flex-col items-center">
        <div className="text-sm text-blueGray-700">{label}</div>
        <div className="text-xs text-blueGray-700">
          Nombres de visites par jour
        </div>
        <div className="text-xs text-blueGray-700">
          du plus fréquenté (en foncé) au moins fréquenté (en clair)
        </div>
      </div>
    </div>
  )
}

export default function StatPage() {
  return (
    <div className="mt-8 w-full">
      <div className="uppercase tracking-wider text-xs font-bold text-sky-900 ml-2 md:ml-4 lg:ml-8 xl:ml-16">
        Calendrier
      </div>
      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 flex-grow-0 gap-8 px-1">
        <div className="col-span-1 md:col-span-2 lg:col-span-3 xl:col-span-4">
          <EventCalendar
            label="Visites 2021"
            from="2021-01-01"
            to="2021-12-31"
          />
        </div>
      </div>
    </div>
  )
}
