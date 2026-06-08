import { Pencil } from 'lucide-react'

export type ReviewField = {
  label: string
  value: string
}

type ReviewGroupProps = {
  title: string
  onEdit: () => void
  fields: ReviewField[]
}

export default function ReviewGroup({
  title,
  onEdit,
  fields,
}: ReviewGroupProps): React.ReactNode {
  return (
    <div className="border-b border-vx-border py-6 last:border-0">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="font-display text-base font-bold text-vx-navy">{title}</h3>
        <button
          type="button"
          onClick={onEdit}
          className="flex items-center gap-1.5 text-xs font-semibold text-vx-blue transition-colors hover:text-vx-blue-dark"
        >
          <Pencil className="h-3 w-3" aria-hidden />
          Edit
        </button>
      </div>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {fields.map((field) => (
          <div key={field.label}>
            <p className="mb-0.5 text-xs font-semibold uppercase tracking-wide text-vx-muted">
              {field.label}
            </p>
            <p className="break-words font-body text-sm leading-relaxed text-vx-body">
              {field.value}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}
