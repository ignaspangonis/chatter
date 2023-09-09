import { ReactNode } from 'react'
import { MemoryRouter, MemoryRouterProps } from 'react-router-dom'
import { ChatContext } from 'src/containers/ChatProvider/ChatContext'
import { ChatClient, ConnectParams } from '../chat-room/client'

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

export class ChatClientMock extends ChatClient {
  connect = jest.fn((params: ConnectParams) => {})
  disconnect = jest.fn(() => Promise.resolve())
  sendMessage = jest.fn(() => Promise.resolve())
}

export const withChat = (children: ReactNode, chatClient: ChatClient) => {
  return <ChatContext.Provider value={{ chatClient }}>{children}</ChatContext.Provider>
}
