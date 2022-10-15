import { HubConnection } from '@microsoft/signalr'
import { createContext } from 'react'

export type ChatContextType = {
  connection: HubConnection | null
  setConnection: (connection: HubConnection | null) => void
  users: string[]
  setUsers: (users: string[]) => void
}

const ChatContext = createContext<ChatContextType>({
  connection: null,
  setConnection: () => {},
  users: [],
  setUsers: () => {},
})

export default ChatContext
