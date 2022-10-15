import { HubConnection } from '@microsoft/signalr'
import { createContext } from 'react'

export type ChatContextType = {
  connection: HubConnection | null
  setConnection: (connection: HubConnection | null) => void
}

const ChatContext = createContext<ChatContextType>({
  connection: null,
  setConnection: () => {},
})

export default ChatContext
