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

export const withChat = (children: ReactNode) => {
  jest.mock('@microsoft/signalr', () => {
    const on = jest.fn()
    const invoke = jest.fn()
    const start = jest.fn()
    const stop = jest.fn()

    return {
      HubConnectionBuilder: jest.fn(() => ({
        withUrl: jest.fn(() => ({
          withAutomaticReconnect: jest.fn(() => ({
            configureLogging: jest.fn(() => ({
              build: jest.fn(() => ({
                on,
                invoke,
                start,
                stop,
              })),
            })),
          })),
        })),
      })),
    }
  })
}
