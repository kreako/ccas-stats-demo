import { HomeIcon, ChartBarIcon } from "@heroicons/react/solid"
import { Link } from "react-router-dom"

export default function NavBar() {
  return (
    <div className="flex bg-sky-900 space-x-12 pl-12 py-1 md:pl-24 md:py-2 lg:pl-48 lg:py-4">
      <Link to="/" className="text-white flex space-x-2 items-center">
        <HomeIcon className="h-6 w-6" />
        <div className="font-bold">Accueil</div>
      </Link>
      <Link to="/stats" className="text-white flex space-x-2 items-center">
        <ChartBarIcon className="h-6 w-6" />
        <div className="font-bold">Statistiques</div>
      </Link>
    </div>
  )
}
