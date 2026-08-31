type SectionLabelProps = {
  index: string
  title: string
  className?: string
}

export function SectionLabel({ index, title, className = '' }: SectionLabelProps) {
  return (
    <div className={`section-label ${className}`}>
      <span>{index}</span>
      <span>{title}</span>
    </div>
  )
}
