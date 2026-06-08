'use client'

import { useState, type KeyboardEvent } from 'react'

import { X } from 'lucide-react'

import { inputClassName } from '@/components/forms/FormField'
import { cn } from '@/lib/utils'

type TagInputProps = {
  tags: string[]
  onChange: (tags: string[]) => void
  placeholder?: string
}

export default function TagInput({
  tags,
  onChange,
  placeholder = 'Type a skill and press Enter',
}: TagInputProps): React.ReactNode {
  const [input, setInput] = useState('')

  const addTag = (value: string): void => {
    const trimmed = value.trim()
    if (trimmed && !tags.includes(trimmed)) {
      onChange([...tags, trimmed])
    }
    setInput('')
  }

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === 'Enter') {
      e.preventDefault()
      addTag(input)
    } else if (e.key === 'Backspace' && !input && tags.length > 0) {
      onChange(tags.slice(0, -1))
    }
  }

  return (
    <div className="space-y-2">
      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => (
          <span
            key={tag}
            className="inline-flex items-center gap-1 rounded-full bg-vx-blue-lt px-3 py-1 text-sm text-vx-blue"
          >
            {tag}
            <button
              type="button"
              onClick={() => onChange(tags.filter((t) => t !== tag))}
              className="rounded-full hover:bg-vx-blue/10"
              aria-label={`Remove ${tag}`}
            >
              <X size={14} />
            </button>
          </span>
        ))}
      </div>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={onKeyDown}
        onBlur={() => input && addTag(input)}
        placeholder={placeholder}
        className={cn(inputClassName)}
      />
    </div>
  )
}
