import { useEffect, useRef, useState } from 'react'
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
  const [error, setError] = useState('')

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newFiles = Array.from(e.target.files || [])
    setError('')
    if (newFiles.some((file) => !['image/jpeg', 'image/png', 'image/webp'].includes(file.type) || file.size > 5 * 1024 * 1024)) {
      setError('Выберите JPG, PNG или WebP размером не более 5 МБ.')
    } else if (value.length + newFiles.length > maxFiles) {
      setError(`Можно добавить ещё ${Math.max(0, maxFiles - value.length)} изображений. Всего у товара — не более 10.`)
    } else {
      onChange([...value, ...newFiles])
    }
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
        accept="image/jpeg,image/png,image/webp"
        multiple
        onChange={handleFileChange}
        disabled={disabled || value.length >= maxFiles}
        className="hidden"
      />

      <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 lg:grid-cols-5">
        {value.map((file, index) => (
            <div
              key={`${file.name}-${index}`}
              className="group relative aspect-square overflow-hidden rounded-lg border border-border"
            >
              <ImagePreview file={file} />
              <button
                type="button"
                aria-label={`Удалить новое изображение ${index + 1}`}
                onClick={() => handleRemove(index)}
                disabled={disabled}
                className="absolute right-1 top-1 flex h-7 w-7 items-center justify-center rounded-full bg-black/60 text-white transition-colors hover:bg-red-500 disabled:cursor-not-allowed"
              >
                <FiX className="h-3 w-3" />
              </button>
              <div className="absolute bottom-0 left-0 right-0 bg-black/60 px-1.5 py-1">
                <p className="truncate text-xs text-white">{file.name}</p>
              </div>
            </div>
          ))}

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
      {error && <p role="alert" className="mt-2 text-sm text-destructive">{error}</p>}
    </div>
  )
}

function ImagePreview({ file }: { file: File }) {
  const ref = useRef<HTMLImageElement>(null)
  useEffect(() => {
    const preview = URL.createObjectURL(file)
    if (ref.current) ref.current.src = preview
    return () => URL.revokeObjectURL(preview)
  }, [file])
  return <img ref={ref} alt={file.name} className="h-full w-full object-cover" />
}
