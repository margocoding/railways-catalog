import { type ChangeEvent, type InputHTMLAttributes, useCallback, useEffect, useState } from 'react'
import { cn } from '@/shared/lib/cn'

interface PhoneInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'value'> {
  value: string
  onChange: (value: string) => void
}

function formatPhone(value: string): string {
  const digits = value.replace(/\D/g, '')

  let normalized = digits
  if (normalized.startsWith('8')) {
    normalized = '7' + normalized.slice(1)
  }
  if (!normalized.startsWith('7')) {
    normalized = '7' + normalized
  }

  const rest = normalized.slice(1, 11)

  let result = '+7'
  if (rest.length > 0) result += ' (' + rest.slice(0, 3)
  if (rest.length >= 3) result += ') ' + rest.slice(3, 6)
  if (rest.length >= 6) result += '-' + rest.slice(6, 8)
  if (rest.length >= 8) result += '-' + rest.slice(8, 10)

  return result
}

export function PhoneInput({
  value,
  onChange,
  className,
  ...props
}: PhoneInputProps) {
  const [displayValue, setDisplayValue] = useState('')

  useEffect(() => {
    if (value) {
      setDisplayValue(formatPhone(value))
    } else {
      setDisplayValue('')
    }
  }, [value])

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const raw = e.target.value
      const formatted = formatPhone(raw)
      setDisplayValue(formatted)
      onChange(formatted)
    },
    [onChange],
  )

  const handleFocus = useCallback(() => {
    if (!displayValue) {
      setDisplayValue('+7 (')
    }
  }, [displayValue])

  const handleBlur = useCallback(() => {
    if (displayValue === '+7 (' || displayValue === '+7') {
      setDisplayValue('')
      onChange('')
    }
  }, [displayValue, onChange])

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Backspace' && displayValue.length <= 4) {
        e.preventDefault()
        setDisplayValue('')
        onChange('')
      }
    },
    [displayValue, onChange],
  )

  return (
    <input
      type="tel"
      inputMode="tel"
      value={displayValue}
      onChange={handleChange}
      onFocus={handleFocus}
      onBlur={handleBlur}
      onKeyDown={handleKeyDown}
      placeholder="+7 (___) ___-__-__"
      className={cn(
        'w-full rounded-lg border border-border bg-background px-3 py-2 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50',
        className,
      )}
      {...props}
    />
  )
}