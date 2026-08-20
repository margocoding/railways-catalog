import {
  useEffect,
  useRef,
  useState,
} from 'react'

import { cn } from '@/shared/lib/cn'


type Size = 'sm' | 'md' | 'lg'


interface Option {
  value: string
  label: string
}


export interface SelectProps {
  size?: Size
  options: Option[]
  value?: string
  onChange?: (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => void
  className?: string
  disabled?: boolean
}


const sizes: Record<Size, string> = {
  sm: 'h-9 px-3 text-sm',
  md: 'h-11 px-4 text-sm',
  lg: 'h-14 px-5 text-base',
}


export function Select({
  size = 'md',
  options,
  value,
  onChange,
  className,
  disabled = false,
}: SelectProps) {

  const [open, setOpen] = useState(false)

  const ref = useRef<HTMLDivElement>(null)


  useEffect(() => {
    const handler = (event: MouseEvent) => {
      if (
        ref.current &&
        !ref.current.contains(event.target as Node)
      ) {
        setOpen(false)
      }
    }


    document.addEventListener(
      'mousedown',
      handler,
    )

    return () =>
      document.removeEventListener(
        'mousedown',
        handler,
      )

  }, [])


  const selected =
    options.find(
      option => option.value === value,
    ) ?? options[0]


  const changeValue = (nextValue: string) => {

    const event = {
      target: {
        value: nextValue,
      },
    } as React.ChangeEvent<HTMLSelectElement>


    onChange?.(event)

    setOpen(false)
  }


  return (
    <div
      ref={ref}
      className="relative"
    >

      <button
        type="button"
        onClick={() => !disabled && setOpen(!open)}
        className={cn(
          `
          flex
          w-full
          items-center
          justify-between
          rounded-xl
          border
          border-border
          bg-card
          text-foreground
          shadow-sm
          transition-all
          hover:border-primary/40
          focus:outline-none
          focus:ring-2
          focus:ring-primary/30
          `,
          sizes[size],
          className,
          disabled && 'cursor-not-allowed opacity-50',
        )}
      >

        <span className="truncate">
          {selected?.label}
        </span>


        <svg
          className={cn(
            'h-4 w-4 transition-transform text-muted-foreground',
            open && 'rotate-180',
          )}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="m6 9 6 6 6-6"
          />
        </svg>

      </button>


      {open && (
        <div
          className="
          absolute
          z-50
          mt-2
          max-h-60
          w-full
          overflow-auto
          rounded-xl
          border
          border-border
          bg-card
          p-1
          shadow-xl
          animate-in
          fade-in
          zoom-in-95
          "
        >

          {options.map(option => (

            <button
              key={option.value}
              type="button"
              onClick={() =>
                changeValue(option.value)
              }
              className={cn(
                `
                flex
                w-full
                items-center
                rounded-lg
                px-3
                py-2.5
                text-left
                text-sm
                transition-colors
                hover:bg-muted
                `,
                option.value === value &&
                `
                bg-primary/10
                text-primary
                font-semibold
                `,
              )}
            >

              {option.label}

            </button>

          ))}

        </div>
      )}


      {/* скрытый select для совместимости */}
      <select
        className="hidden"
        value={value}
        onChange={onChange}
      >
        {options.map(option => (
          <option
            key={option.value}
            value={option.value}
          >
            {option.label}
          </option>
        ))}
      </select>

    </div>
  )
}