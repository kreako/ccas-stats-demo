import React from "react"

type CardProps = {
  children?: React.ReactNode
}

export default function Card({ children }: CardProps) {
  return <div className="shadow-md rounded-md p-2">{children}</div>
}
