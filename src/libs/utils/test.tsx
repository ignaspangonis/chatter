import { ReactNode } from 'react'
import { MemoryRouter, MemoryRouterProps } from 'react-router-dom'

import ChatContext, { ChatContextType } from 'src/containers/ChatProvider/ChatContext'

export const withMockedConsoleError =
  <Func extends Function>(fn: Func) =>
  async () => {
    const mock = jest.spyOn(console, 'error').mockImplementation(() => {})

    const result = await fn()

    mock.mockRestore()

    return result
  }

export const withChat = (children: ReactNode, value?: Partial<ChatContextType>) => {
  const defaultContextValue = {
    connection: null,
    setConnection: () => {},
    roomName: null,
    setRoomName: () => {},
    users: [],
    setUsers: () => {},
  }

  const contextValue = {
    ...defaultContextValue,
    ...value,
  }

  return <ChatContext.Provider value={contextValue}>{children}</ChatContext.Provider>
}

export type WithRouterOptions = Partial<Omit<MemoryRouterProps, 'children'>>

export const withRouter = (children: ReactNode, options?: WithRouterOptions) => (
  <MemoryRouter {...options}>{children}</MemoryRouter>
)
