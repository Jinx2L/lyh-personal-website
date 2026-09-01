import { render, waitFor } from '@testing-library/react'
import App from './App'

describe('page structure', () => {
  it('contains unique expected section anchors', async () => {
    const { container } = render(<App />)
    await waitFor(() => expect(container.querySelector('.route-loading')).not.toBeInTheDocument())
    ;['top','about','experience','works','expertise','contact'].forEach((id) => {
      expect(container.querySelectorAll(`#${id}`)).toHaveLength(1)
    })
    expect(container.querySelectorAll('main')).toHaveLength(1)
  })
})
