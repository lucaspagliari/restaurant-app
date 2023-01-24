import { useDarkMode } from './useDarkMode'
import { describe, it, expect, vi } from 'vitest'

const document = global.document
const body = global.document.body
const classList = global.document.body.classList

const mockToggle = vi.fn()
const mockContains = vi.fn()

global.document = {
  ...document,
  body: {
    ...body,
    classList: {
      ...classList,
      toggle: mockToggle,
      contains: mockContains,
    },
  },
}
describe('useModal', () => {
  it('should start on light mode', async () => {
    const composable = useDarkMode()
    await composable.toggle()

    expect(mockToggle).toHaveBeenCalledOnce()
    expect(mockToggle).toHaveBeenCalledWith('dark')

    expect(mockContains).toHaveBeenCalledOnce()
    expect(mockContains).toHaveBeenCalledWith('dark')
  })
})
