import { ReactNode } from 'react'
import { MemoryRouter, MemoryRouterProps } from 'react-router-dom'

export const withMockedConsoleError =
  <Func extends Function>(fn: Func) =>
  async () => {
    const mock = jest.spyOn(console, 'error').mockImplementation(() => {})

    const result = await fn()

    mock.mockRestore()

    return result
  }

export type WithRouterOptions = Partial<Omit<MemoryRouterProps, 'children'>>

export const withRouter = (children: ReactNode, options?: WithRouterOptions) => (
  <MemoryRouter {...options}>{children}</MemoryRouter>
)
