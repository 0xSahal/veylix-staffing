import { useCallback, useEffect, useId, useMemo, useRef, useState } from 'react'
import { set, unset, useClient, type StringInputProps } from 'sanity'

const API_VERSION = '2026-06-09'
const ADD_NEW_VALUE = '__add_new__'

export const PREDEFINED_CATEGORIES = [
  'Industry Insights',
  'Hiring Tips',
  'Career Advice',
  'Workforce Trends',
  'Company News',
] as const

function mergeCategories(predefined: readonly string[], used: string[]): string[] {
  const seen = new Set<string>()
  const merged: string[] = []

  for (const category of [...predefined, ...used]) {
    const trimmed = category.trim()
    if (!trimmed || seen.has(trimmed)) continue
    seen.add(trimmed)
    merged.push(trimmed)
  }

  return merged
}

export function CategoryInput(props: StringInputProps) {
  const { value, onChange, readOnly } = props
  const client = useClient({ apiVersion: API_VERSION })
  const listId = useId()
  const customInputRef = useRef<HTMLInputElement>(null)
  const [usedCategories, setUsedCategories] = useState<string[]>([])
  const [loading, setLoading] = useState(true)
  const [mode, setMode] = useState<'list' | 'custom'>('list')
  const [draft, setDraft] = useState('')

  useEffect(() => {
    let cancelled = false

    client
      .fetch<string[]>(
        `array::unique(*[_type == "post" && defined(category) && category != ""].category) | order(@ asc)`
      )
      .then((categories) => {
        if (!cancelled) {
          setUsedCategories(categories ?? [])
          setLoading(false)
        }
      })
      .catch(() => {
        if (!cancelled) setLoading(false)
      })

    return () => {
      cancelled = true
    }
  }, [client])

  const options = useMemo(
    () => mergeCategories(PREDEFINED_CATEGORIES, usedCategories),
    [usedCategories]
  )

  const valueInList = Boolean(value && options.includes(value))

  useEffect(() => {
    if (!value) {
      setMode('list')
      setDraft('')
      return
    }

    if (valueInList) {
      setMode('list')
      setDraft('')
      return
    }

    setMode('custom')
    setDraft(value)
  }, [value, valueInList])

  const commitValue = useCallback(
    (next: string | undefined) => {
      const trimmed = next?.trim()

      if (trimmed) {
        if (trimmed === value) return
        onChange(set(trimmed))
        return
      }

      if (value !== undefined) {
        onChange(unset())
      }
    },
    [onChange, value]
  )

  const selectValue = mode === 'custom' ? ADD_NEW_VALUE : (value ?? '')

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
      <select
        value={selectValue}
        disabled={readOnly || loading}
        onChange={(event) => {
          const selected = event.target.value

          if (selected === ADD_NEW_VALUE) {
            setMode('custom')
            setDraft(typeof value === 'string' && !valueInList ? value : '')
            customInputRef.current?.focus()
            return
          }

          setMode('list')
          setDraft('')

          if (!selected) {
            commitValue(undefined)
            return
          }

          commitValue(selected)
        }}
      >
        <option value="">Select a category</option>
        {options.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
        <option value={ADD_NEW_VALUE}>Add new category…</option>
      </select>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem' }}>
        <label htmlFor={`${listId}-custom`} style={{ fontSize: '0.8125rem', opacity: 0.8 }}>
          {mode === 'custom'
            ? 'Enter a new category'
            : 'Or type a custom category (suggestions appear as you type)'}
        </label>
        <input
          ref={customInputRef}
          id={`${listId}-custom`}
          list={listId}
          type="text"
          value={mode === 'custom' ? draft : valueInList ? '' : (value ?? '')}
          disabled={readOnly}
          placeholder="e.g. Leadership"
          onFocus={() => {
            if (mode !== 'custom') {
              setMode('custom')
              setDraft(valueInList ? '' : (value ?? ''))
            }
          }}
          onChange={(event) => {
            setMode('custom')
            setDraft(event.target.value)
          }}
          onBlur={() => {
            commitValue(draft)
          }}
          onKeyDown={(event) => {
            if (event.key === 'Enter') {
              event.preventDefault()
              commitValue(draft)
              customInputRef.current?.blur()
            }
          }}
        />
        <datalist id={listId}>
          {options.map((category) => (
            <option key={category} value={category} />
          ))}
        </datalist>
      </div>
    </div>
  )
}
