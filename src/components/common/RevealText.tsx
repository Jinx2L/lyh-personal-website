import { Children, isValidElement, type PropsWithChildren, type ReactNode } from 'react'

type RevealTextProps = PropsWithChildren<{
  className?: string
  as?: 'div' | 'p' | 'span' | 'h2'
}>

export function RevealText({ children, className = '', as: Tag = 'div' }: RevealTextProps) {
  if (Tag === 'h2') {
    const lines: ReactNode[][] = [[]]
    Children.forEach(children, child => {
      if (isValidElement(child) && child.type === 'br') lines.push([])
      else lines[lines.length - 1].push(child)
    })
    return <h2 className={className}>{lines.map((line, index) =>
      <span className="motion-line-mask" key={index}><span className="motion-line">{line}</span></span>)}</h2>
  }
  return <Tag className={className}>{children}</Tag>
}
