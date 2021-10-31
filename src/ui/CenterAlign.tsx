import React from "react"

type CenterAlignProps = {
  children?: React.ReactNode
}

export default function CenterAlign({ children }: CenterAlignProps) {
  return (
    <div className="flex">
      <div className="flex-grow"></div>
      <div className="flex-grow-0">{children}</div>
      <div className="flex-grow"></div>
    </div>
  )
}
