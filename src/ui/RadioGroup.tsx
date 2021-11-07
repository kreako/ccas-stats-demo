import { RadioGroup } from "@headlessui/react"
import { CheckIcon } from "@heroicons/react/solid"

type GroupOptionProps = {
  bg: string
  label: string
  value: string
}

export function GroupOption({ bg, label, value }: GroupOptionProps) {
  return (
    <div
      className={`py-2 px-4 ${bg} rounded-md shadow-md font-bold cursor-pointer`}
    >
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

type GroupProps = {
  onChange: (value: any) => void
  label: string
  value: null | string
  children: React.ReactNode
}

export function Group({ value, onChange, label, children }: GroupProps) {
  return (
    <RadioGroup value={value} onChange={onChange}>
      <RadioGroup.Label className="sr-only">{label}</RadioGroup.Label>
      {children}
    </RadioGroup>
  )
}
