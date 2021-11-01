import { parseISO } from "date-fns"
import { EventAge, EventGender, EventKind, EventType } from "./eventSlice"

export const dateToStr = (date: string) => {
  const dt = parseISO(date)
  const year = dt.getFullYear().toString()
  const month = (dt.getMonth() + 1).toString().padStart(2, "0")
  const day = dt.getDate().toString().padStart(2, "0")
  const hour = dt.getHours().toString().padStart(2, "0")
  const minutes = dt.getMinutes().toString().padStart(2, "0")
  return `${year}-${month}-${day} ${hour}:${minutes}`
}

export const kindToStr = (kind: EventKind) => {
  switch (kind) {
    case "passage":
      return "Passage"
    case "phone":
      return "Téléphone"
    case "mail":
      return "Email"
  }
}

export const genderToStr = (gender: EventGender) => {
  switch (gender) {
    case "male":
      return "Homme"
    case "female":
      return "Femme"
    case "x":
      return "Autre"
  }
}

export const ageToStr = (age: EventAge) => {
  switch (age) {
    case "0-14":
      return "0 à 14 ans"
    case "15-24":
      return "15 à 24 ans"
    case "25-34":
      return "25 à 34 ans"
    case "35-44":
      return "35 à 44 ans"
    case "45-54":
      return "45 à 54 ans"
    case "55-64":
      return "55 à 64 ans"
    case "65-74":
      return "65 à 74 ans"
    case "75-+":
      return "75 ans et plus"
  }
}
