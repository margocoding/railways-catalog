import { useRef } from 'react'
import { FiImage, FiPlus, FiX } from 'react-icons/fi'

interface MultipleImageUploadProps {
  value: File[]
  onChange: (files: File[]) => void
  label?: string
  disabled?: boolean
  maxFiles?: number
}

export function MultipleImageUpload({
  value,
  onChange,
  label = 'Изображения',
  disabled = false,
  maxFiles = 10,
}: MultipleImageUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newFiles = Array.from(e.target.files || [])
    const combined = [...value, ...newFiles].slice(0, maxFiles)
    onChange(combined)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const handleRemove = (index: number) => {
    onChange(value.filter((_, i) => i !== index))
  }

  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-foreground">
        {label}
      </label>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        multiple
        onChange={handleFileChange}
        disabled={disabled || value.length >= maxFiles}
        className="hidden"
      />

      <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 lg:grid-cols-5">
        {value.map((file, index) => {
          const previewUrl = URL.createObjectURL(file)

          return (
            <div
              key={`${file.name}-${index}`}
              className="group relative aspect-square overflow-hidden rounded-lg border border-border"
            >
              <img
                src={previewUrl}
                alt={file.name}
                className="h-full w-full object-cover"
              />
              <button
                type="button"
                onClick={() => handleRemove(index)}
                disabled={disabled}
                className="absolute right-1 top-1 flex h-6 w-6 items-center justify-center rounded-full bg-black/60 text-white opacity-0 transition-opacity hover:bg-red-500 group-hover:opacity-100 disabled:cursor-not-allowed"
              >
                <FiX className="h-3 w-3" />
              </button>
              <div className="absolute bottom-0 left-0 right-0 bg-black/60 px-1.5 py-1">
                <p className="truncate text-xs text-white">{file.name}</p>
              </div>
            </div>
          )
        })}

        {value.length < maxFiles && (
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            disabled={disabled}
            className="flex aspect-square flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed border-border bg-muted/30 text-muted-foreground transition-colors hover:border-primary/50 hover:text-primary disabled:cursor-not-allowed disabled:opacity-50"
          >
            <FiPlus className="h-8 w-8" />
            <span className="text-xs">Добавить</span>
          </button>
        )}

        {value.length === 0 && (
          <div className="col-span-full flex flex-col items-center gap-2 py-4 text-muted-foreground">
            <FiImage className="h-8 w-8" />
            <span className="text-xs">Нет изображений</span>
          </div>
        )}
      </div>

      <p className="mt-2 text-xs text-muted-foreground">
        {value.length} из {maxFiles} изображений. Поддерживаются JPG, PNG, WebP. Максимум 5 MB каждый.
      </p>
    </div>
  )
}