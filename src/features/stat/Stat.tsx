import { ResponsiveCalendar } from "@nivo/calendar"
import { ResponsivePie } from "@nivo/pie"
import {
  amber,
  blue,
  blueGray,
  cyan,
  pink,
  purple,
  sky,
} from "tailwindcss/colors"
import { useAppSelector } from "../../app/hooks"
import {
  selectEventCountPerDate,
  selectEventGenderPerDate,
  selectEventKindPerDate,
} from "../event/eventSlice"

type StatsProps = {
  label: string
  from: string
  to: string
}

function EventCalendar({ label, from, to }: StatsProps) {
  const data = useAppSelector((state) =>
    selectEventCountPerDate(state, from, to)
  )
  return (
    <div className="flex flex-col space-y-1 items-center">
      <div className="flex-grow w-full h-48 lg:h-64 xl:h-96">
        <ResponsiveCalendar
          data={data}
          from={from}
          to={to}
          colors={[sky[200], sky[400], sky[600], sky[800]]}
        />
      </div>
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

function KindPie({ label, from, to }: StatsProps) {
  const count = useAppSelector((state) =>
    selectEventKindPerDate(state, from, to)
  )
  const data = [
    {
      id: "Passage",
      value: count.passage,
    },
    {
      id: "Téléphone",
      value: count.phone,
    },
    {
      id: "Email",
      value: count.mail,
    },
  ]
  return (
    <div className="flex flex-col space-y-4 items-center">
      <div className="flex-grow w-full h-64 lg:h-64 xl:h-96">
        <ResponsivePie
          data={data}
          colors={[amber[300], cyan[300], purple[300]]}
          innerRadius={0.3}
          padAngle={0.7}
          cornerRadius={0.3}
          arcLabelsTextColor={{ from: "color", modifiers: [["darker", 3]] }}
          enableArcLinkLabels={false}
        />
      </div>
      <div className="flex flex-col items-center">
        <div className="flex space-x-4 items-center">
          <div className="flex space-x-2 items-center">
            <div className="h-4 w-8 bg-amber-300"></div>
            <div className="text-sm text-blueGray-700">Passage</div>
          </div>
          <div className="flex space-x-2 items-center">
            <div className="h-4 w-8 bg-cyan-300"></div>
            <div className="text-sm text-blueGray-700">Téléphone</div>
          </div>
          <div className="flex space-x-2 items-center">
            <div className="h-4 w-8 bg-purple-300"></div>
            <div className="text-sm text-blueGray-700">Email</div>
          </div>
        </div>
      </div>
      <div className="text-blueGray-700">Répartition par type de visites</div>
    </div>
  )
}

function GenderPie({ label, from, to }: StatsProps) {
  const count = useAppSelector((state) =>
    selectEventGenderPerDate(state, from, to)
  )
  const data = [
    {
      id: "Femme",
      value: count.female,
    },
    {
      id: "Homme",
      value: count.male,
    },
    {
      id: "Autre",
      value: count.other,
    },
  ]
  return (
    <div className="flex flex-col space-y-4 items-center">
      <div className="flex-grow w-full h-64 lg:h-64 xl:h-96">
        <ResponsivePie
          data={data}
          colors={[pink[300], sky[300], blueGray[300]]}
          borderColor={{ from: "color", modifiers: [["darker", 0.2]] }}
          innerRadius={0.3}
          padAngle={0.7}
          cornerRadius={0.3}
          arcLinkLabelsColor={{ from: "color" }}
          arcLinkLabelsSkipAngle={10}
          arcLinkLabelsTextColor={{ from: "color", modifiers: [["darker", 3]] }}
          arcLinkLabelsThickness={2}
          arcLabelsTextColor={{ from: "color", modifiers: [["darker", 3]] }}
        />
      </div>
      <div className="flex flex-col items-center">
        <div className="text-sm text-blueGray-700">{label}</div>
        <div className="text-xs text-blueGray-700">Répartition par genre</div>
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
      <div className="mt-4 grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 flex-grow-0 gap-x-8 gap-y-16 px-1">
        <div className="col-span-1 lg:col-span-2 xl:col-span-3">
          <EventCalendar
            label="Visites 2021"
            from="2021-01-01"
            to="2021-12-31"
          />
        </div>
        <KindPie label="Visites 2021" from="2021-01-01" to="2021-12-31" />
        <GenderPie label="Visites 2021" from="2021-01-01" to="2021-12-31" />
      </div>
    </div>
  )
}
