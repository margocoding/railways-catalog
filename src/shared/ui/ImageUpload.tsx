// src/shared/ui/ImageUpload.tsx
import { useRef, useState } from 'react'
import { FiImage, FiUpload, FiX } from 'react-icons/fi'
import { Button } from './Button'

interface ImageUploadProps {
  value: File | null
  onChange: (file: File | null) => void
  existingUrl?: string
  label?: string
  disabled?: boolean
}

export function ImageUpload({
  value,
  onChange,
  existingUrl,
  label = 'Изображение',
  disabled = false,
}: ImageUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [imgError, setImgError] = useState(false)

  const previewUrl = value ? URL.createObjectURL(value) : existingUrl

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setImgError(false)
      onChange(file)
    }
  }

  const handleRemove = () => {
    onChange(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-foreground">
        {label}
      </label>

      <div className="flex flex-col gap-3 sm:flex-row">
        <div className="relative flex h-32 w-32 shrink-0 items-center justify-center overflow-hidden rounded-xl border-2 border-dashed border-border bg-muted/30 transition-colors hover:border-primary/50">
          {previewUrl && !imgError ? (
            <>
              <img
                src={previewUrl}
                alt="Превью"
                className="h-full w-full object-cover"
                onError={() => setImgError(true)}
              />
              <button
                type="button"
                onClick={handleRemove}
                disabled={disabled}
                className="absolute right-1 top-1 flex h-6 w-6 items-center justify-center rounded-full bg-black/60 text-white transition-opacity hover:bg-red-500 disabled:cursor-not-allowed"
              >
                <FiX className="h-3 w-3" />
              </button>
            </>
          ) : (
            <div className="flex flex-col items-center gap-1 text-muted-foreground">
              <FiImage className="h-8 w-8" />
              <span className="text-xs">Превью</span>
            </div>
          )}
        </div>

        <div className="flex-1 space-y-2">
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            disabled={disabled}
            className="hidden"
          />

          <Button
            type="button"
            variant="secondary"
            size="sm"
            onClick={() => fileInputRef.current?.click()}
            disabled={disabled}
          >
            <FiUpload className="h-4 w-4" />
            Выбрать файл
          </Button>

          {value && (
            <p className="text-xs text-muted-foreground">
              Новый файл: {value.name} ({(value.size / 1024).toFixed(1)} KB)
            </p>
          )}

          {!value && existingUrl && (
            <p className="text-xs text-muted-foreground">
              Текущее изображение категории
            </p>
          )}

          <p className="text-xs text-muted-foreground">
            Поддерживаются форматы: JPG, PNG, WebP. Максимум 5 MB.
          </p>
        </div>
      </div>
    </div>
  )
}