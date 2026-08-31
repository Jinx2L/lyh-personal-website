import { render } from '@testing-library/react'
import App from './App'

describe('page structure', () => {
  it('contains unique expected section anchors', () => {
    const { container } = render(<App />)
    ;['top','about','experience','works','expertise','contact'].forEach((id) => {
      expect(container.querySelectorAll(`#${id}`)).toHaveLength(1)
    })
    expect(container.querySelectorAll('main')).toHaveLength(1)
  })
})
