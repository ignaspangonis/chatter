import { createContext } from 'react'
import { ChatClient } from 'src/libs/chat-room/client'

type ChatContextType = {
  chatClient: ChatClient | null
}

export const initialContext: ChatContextType = {
  chatClient: null,
}

export const ChatContext = createContext<ChatContextType>(initialContext)
