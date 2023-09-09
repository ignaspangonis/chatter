import { ReactNode } from 'react'
import { MemoryRouter, MemoryRouterProps, Router } from 'react-router-dom'
import { ChatContext } from 'src/containers/ChatProvider/ChatContext'
import { ChatClient, ConnectParams } from '../chat-room/client'

import { createBrowserHistory } from 'history'

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

// export type withRouterOptions = {
//   basename?: string
//   history?: Partial<History>
//   state?: Record<string, any>
// }

// export const withRouter = (children: ReactNode, options?: withRouterOptions) => {
//   const basename = options?.basename || '/'
//   let history = createBrowserHistory()
//   let state

//   if (options?.basename) {
//     state = options.state
//   }

//   if (options?.history) {
//     history = { ...history, ...options.history }
//   }

//   return (
//     <Router basename={basename} navigator={history} location={{ ...history.location, state }}>
//       {children}
//     </Router>
//   )
// }

export class ChatClientMock extends ChatClient {
  connect = jest.fn(
    ({
      userName,
      roomName,
      onNewMessage,
      onClose,
      onError,
      onGetMessageHistory,
      onGetUsers,
    }: ConnectParams) => {},
  )
  disconnect = jest.fn(() => Promise.resolve())
  sendMessage = jest.fn(() => Promise.resolve())
}

export const withChat = (children: ReactNode, chatClient: ChatClient) => {
  return <ChatContext.Provider value={{ chatClient }}>{children}</ChatContext.Provider>
}
