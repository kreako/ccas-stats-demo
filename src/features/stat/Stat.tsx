import { ResponsiveCalendar } from "@nivo/calendar"
import { ResponsivePie } from "@nivo/pie"
import {
  amber,
  blue,
  blueGray,
  cyan,
  green,
  lime,
  pink,
  purple,
  rose,
  sky,
} from "tailwindcss/colors"
import { useAppSelector } from "../../app/hooks"
import { selectAllPostCode, selectCityEntities } from "../city/citySlice"
import {
  selectEventAgePerDate,
  selectEventCountPerDate,
  selectEventDateSlice,
  selectEventGenderPerDate,
  selectEventKindPerDate,
} from "../event/eventSlice"
import { ageToStr } from "../event/util"

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
      <div className="flex flex-col items-center">{legend}</div>
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
        <div className="flex space-x-4 items-center">
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
        </div>
      }
    />
  )
}

function AgePie({ from, to }: StatsProps) {
  const count = useAppSelector((state) =>
    selectEventAgePerDate(state, from, to)
  )
  const data = [
    {
      id: ageToStr("0-14"),
      value: count["0-14"],
    },
    {
      id: ageToStr("15-24"),
      value: count["15-24"],
    },
    {
      id: ageToStr("25-34"),
      value: count["25-34"],
    },
    {
      id: ageToStr("35-44"),
      value: count["35-44"],
    },
    {
      id: ageToStr("45-54"),
      value: count["45-54"],
    },
    {
      id: ageToStr("55-64"),
      value: count["55-64"],
    },
    {
      id: ageToStr("65-74"),
      value: count["65-74"],
    },
    {
      id: ageToStr("75-+"),
      value: count["75-+"],
    },
  ]
  return (
    <Pie
      data={data}
      colors={[
        blueGray[300],
        lime[300],
        amber[300],
        green[300],
        cyan[300],
        blue[300],
        purple[300],
        rose[300],
      ]}
      title="Répartition par âge"
      legend={
        <>
          <div className="flex space-x-4 items-center">
            <div className="flex space-x-2 items-center">
              <div className="h-4 w-8 bg-blueGray-300"></div>
              <div className="text-sm text-blueGray-700">
                {ageToStr("0-14")}
              </div>
            </div>
            <div className="flex space-x-2 items-center">
              <div className="h-4 w-8 bg-lime-300"></div>
              <div className="text-sm text-blueGray-700">
                {ageToStr("15-24")}
              </div>
            </div>
            <div className="flex space-x-2 items-center">
              <div className="h-4 w-8 bg-amber-300"></div>
              <div className="text-sm text-blueGray-700">
                {ageToStr("25-34")}
              </div>
            </div>
          </div>
          <div className="flex space-x-4 items-center">
            <div className="flex space-x-2 items-center">
              <div className="h-4 w-8 bg-green-300"></div>
              <div className="text-sm text-blueGray-700">
                {ageToStr("35-44")}
              </div>
            </div>
            <div className="flex space-x-2 items-center">
              <div className="h-4 w-8 bg-cyan-300"></div>
              <div className="text-sm text-blueGray-700">
                {ageToStr("45-54")}
              </div>
            </div>
            <div className="flex space-x-2 items-center">
              <div className="h-4 w-8 bg-blue-300"></div>
              <div className="text-sm text-blueGray-700">
                {ageToStr("55-64")}
              </div>
            </div>
          </div>
          <div className="flex space-x-4 items-center">
            <div className="flex space-x-2 items-center">
              <div className="h-4 w-8 bg-purple-300"></div>
              <div className="text-sm text-blueGray-700">
                {ageToStr("65-74")}
              </div>
            </div>
            <div className="flex space-x-2 items-center">
              <div className="h-4 w-8 bg-rose-300"></div>
              <div className="text-sm text-blueGray-700">
                {ageToStr("75-+")}
              </div>
            </div>
          </div>
        </>
      }
    />
  )
}

function PostCodePie({ from, to }: StatsProps) {
  const events = useAppSelector((state) =>
    selectEventDateSlice(state, from, to)
  )
  const postCodes = useAppSelector(selectAllPostCode)
  const count = postCodes.reduce(
    (storage: { [postCode: string]: number }, pc: string) => {
      storage[pc] = 0
      return storage
    },
    {}
  )
  count["inconnu"] = 0
  const cities = useAppSelector(selectCityEntities)
  for (const event of events) {
    const city = cities[event.city]
    if (city) {
      if (city.postCode) {
        count[city.postCode] += 1
      } else {
        count["inconnu"] += 1
      }
    }
  }
  // TODO I know that I have 3 PC and unknown as this is static for now
  const data = [
    {
      id: "12140",
      value: count["12140"],
    },
    {
      id: "12130",
      value: count["12130"],
    },
    {
      id: "12150",
      value: count["12150"],
    },
    {
      id: "inconnu",
      value: count["inconnu"],
    },
  ]

  const colors = [amber[300], cyan[300], purple[300], rose[300]]

  return (
    <Pie
      data={data}
      colors={colors}
      title="Répartition par code postal"
      legend={
        <div className="flex space-x-4 items-center">
          <div className="flex space-x-2 items-center">
            <div className="h-4 w-8 bg-amber-300"></div>
            <div className="text-sm text-blueGray-700">12140</div>
          </div>
          <div className="flex space-x-2 items-center">
            <div className="h-4 w-8 bg-cyan-300"></div>
            <div className="text-sm text-blueGray-700">12130</div>
          </div>
          <div className="flex space-x-2 items-center">
            <div className="h-4 w-8 bg-purple-300"></div>
            <div className="text-sm text-blueGray-700">12150</div>
          </div>
          <div className="flex space-x-2 items-center">
            <div className="h-4 w-8 bg-rose-300"></div>
            <div className="text-sm text-blueGray-700">inconnu</div>
          </div>
        </div>
      }
    />
  )
}

function CityTop5Pie({ from, to }: StatsProps) {
  const events = useAppSelector((state) =>
    selectEventDateSlice(state, from, to)
  )
  const postCodes = useAppSelector(selectAllPostCode)
  const cities = useAppSelector(selectCityEntities)
  const count = Object.keys(cities).reduce(
    (storage: { [id: string]: number }, id: string) => {
      storage[id] = 0
      return storage
    },
    {}
  )
  for (const event of events) {
    const city = cities[event.city]
    if (city) {
      count[city.id] += 1
    }
  }
  const l = Object.entries(count)
  l.sort((a, b) => b[1] - a[1]) // Sort in desc order
  const top5 = l.slice(0, 5)
  const data: Array<PieValue> = []
  for (const [id, value] of top5) {
    const city = cities[id]
    if (city) {
      // Normally not necessary but typescript...
      data.push({ id: city.name, value: value })
    }
  }

  const colors = [
    amber[300],
    cyan[300],
    purple[300],
    rose[300],
    blueGray[300],
  ].slice(0, data.length)

  return (
    <Pie
      data={data}
      colors={colors}
      title="Répartition par ville (top 5)"
      legend={
        <>
          <div className="flex space-x-4 items-center">
            {data.length > 0 && (
              <div className="flex space-x-2 items-center">
                <div className="h-4 w-8 bg-amber-300"></div>
                <div className="text-sm text-blueGray-700">{data[0].id}</div>
              </div>
            )}
            {data.length > 1 && (
              <div className="flex space-x-2 items-center">
                <div className="h-4 w-8 bg-cyan-300"></div>
                <div className="text-sm text-blueGray-700">{data[1].id}</div>
              </div>
            )}
          </div>
          <div className="flex space-x-4 items-center">
            {data.length > 2 && (
              <div className="flex space-x-2 items-center">
                <div className="h-4 w-8 bg-purple-300"></div>
                <div className="text-sm text-blueGray-700">{data[2].id}</div>
              </div>
            )}
            {data.length > 3 && (
              <div className="flex space-x-2 items-center">
                <div className="h-4 w-8 bg-rose-300"></div>
                <div className="text-sm text-blueGray-700">{data[3].id}</div>
              </div>
            )}
          </div>
          <div className="flex space-x-4 items-center">
            {data.length > 4 && (
              <div className="flex space-x-2 items-center">
                <div className="h-4 w-8 bg-blueGray-300"></div>
                <div className="text-sm text-blueGray-700">{data[4].id}</div>
              </div>
            )}
          </div>
        </>
      }
    />
  )
}

export default function StatPage() {
  return (
    <div className="my-8 w-full">
      <div className="uppercase tracking-wider text-xs font-bold text-sky-900 ml-2 md:ml-4 lg:ml-8 xl:ml-16">
        Calendrier
      </div>
      <div className="mt-4 grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 flex-grow-0 gap-x-8 gap-y-16 px-1">
        <div className="col-span-1 lg:col-span-2 xl:col-span-3">
          <EventCalendar from="2021-01-01" to="2021-12-31" />
        </div>
        <KindPie from="2021-01-01" to="2021-12-31" />
        <GenderPie from="2021-01-01" to="2021-12-31" />
        <AgePie from="2021-01-01" to="2021-12-31" />
        <PostCodePie from="2021-01-01" to="2021-12-31" />
        <CityTop5Pie from="2021-01-01" to="2021-12-31" />
      </div>
    </div>
  )
}
