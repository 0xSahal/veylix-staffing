'use client'

import { useCallback, useState } from 'react'

import { Upload } from 'lucide-react'

import { cn } from '@/lib/utils'

const ACCEPT = '.pdf,.doc,.docx'
const MAX_MB = 5

type FileDropzoneProps = {
  onFile: (file: File | null) => void
  label?: string
}

export default function FileDropzone({
  onFile,
  label = 'Drag & drop your file here, or click to browse',
}: FileDropzoneProps): React.ReactNode {
  const [fileName, setFileName] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const validate = useCallback(
    (file: File): boolean => {
      const ext = file.name.toLowerCase()
      if (!['.pdf', '.doc', '.docx'].some((e) => ext.endsWith(e))) {
        setError('Please upload a PDF or Word document.')
        return false
      }
      if (file.size > MAX_MB * 1024 * 1024) {
        setError(`File must be under ${MAX_MB}MB.`)
        return false
      }
      setError(null)
      setFileName(file.name)
      onFile(file)
      return true
    },
    [onFile]
  )

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const file = e.target.files?.[0]
    if (file) validate(file)
  }

  const onDrop = (e: React.DragEvent): void => {
    e.preventDefault()
    const file = e.dataTransfer.files?.[0]
    if (file) validate(file)
  }

  return (
    <div>
      <label
        onDrop={onDrop}
        onDragOver={(e) => e.preventDefault()}
        className={cn(
          'flex cursor-pointer flex-col items-center justify-center rounded-card border-2 border-dashed border-vx-border bg-vx-off px-6 py-10 transition-colors hover:border-vx-blue hover:bg-vx-blue-lt/30'
        )}
      >
        <Upload size={28} className="text-vx-muted" />
        <span className="mt-3 text-center font-body text-sm text-vx-muted">{label}</span>
        {fileName && (
          <span className="mt-2 text-sm font-medium text-vx-blue">{fileName}</span>
        )}
        <input type="file" accept={ACCEPT} className="sr-only" onChange={handleChange} />
      </label>
      {error && <p className="mt-2 text-xs text-red-600">{error}</p>}
    </div>
  )
}
