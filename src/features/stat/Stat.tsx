import { ResponsiveCalendar } from "@nivo/calendar"
import { ResponsivePie } from "@nivo/pie"
import { amber, blueGray, cyan, pink, purple, sky } from "tailwindcss/colors"
import { useAppSelector } from "../../app/hooks"
import {
  selectEventCountPerDate,
  selectEventGenderPerDate,
  selectEventKindPerDate,
} from "../event/eventSlice"

type StatsProps = {
  from: string
  to: string
}

function EventCalendar({ from, to }: StatsProps) {
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
        <div className="text-blueGray-700">Nombres de visites par jour</div>
        <div className="text-xs text-blueGray-700">
          du plus fréquenté (en foncé) au moins fréquenté (en clair)
        </div>
      </div>
    </div>
  )
}

type PieValue = {
  id: string
  value: number
}

type PieProps = {
  data: Array<PieValue>
  colors: Array<string>
  legend: React.ReactNode
  title: string
}

function Pie({ data, colors, legend, title }: PieProps) {
  return (
    <div className="flex flex-col space-y-4 items-center">
      <div className="flex-grow w-full h-64 lg:h-64 xl:h-96">
        <ResponsivePie
          data={data}
          colors={colors}
          innerRadius={0.3}
          padAngle={0.7}
          cornerRadius={0.3}
          arcLabelsTextColor={{ from: "color", modifiers: [["darker", 3]] }}
          enableArcLinkLabels={false}
        />
      </div>
      <div className="flex flex-col items-center">
        <div className="flex space-x-4 items-center">{legend}</div>
      </div>
      <div className="text-blueGray-700">{title}</div>
    </div>
  )
}

function KindPie({ from, to }: StatsProps) {
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
    <Pie
      data={data}
      colors={[amber[300], cyan[300], purple[300]]}
      title="Répartition par type de visites"
      legend={
        <>
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
        </>
      }
    />
  )
}

function GenderPie({ from, to }: StatsProps) {
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
    <Pie
      data={data}
      colors={[pink[300], sky[300], blueGray[300]]}
      title="Répartition par genre"
      legend={
        <>
          <div className="flex space-x-2 items-center">
            <div className="h-4 w-8 bg-pink-300"></div>
            <div className="text-sm text-blueGray-700">Femme</div>
          </div>
          <div className="flex space-x-2 items-center">
            <div className="h-4 w-8 bg-sky-300"></div>
            <div className="text-sm text-blueGray-700">Homme</div>
          </div>
          <div className="flex space-x-2 items-center">
            <div className="h-4 w-8 bg-blueGray-300"></div>
            <div className="text-sm text-blueGray-700">Autre</div>
          </div>
        </>
      }
    />
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
          <EventCalendar from="2021-01-01" to="2021-12-31" />
        </div>
        <KindPie from="2021-01-01" to="2021-12-31" />
        <GenderPie from="2021-01-01" to="2021-12-31" />
      </div>
    </div>
  )
}
