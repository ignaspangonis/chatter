import { PropsWithChildren, useState } from 'react'

import { ChatClient } from 'src/libs/chat-room/client'

import { ChatContext } from './ChatContext'

export default function ChatProvider({ children }: PropsWithChildren<{}>) {
  // Providing `ChatClient` through context makes it easier to mock the `ChatClient` in component tests.
  const [chatClient] = useState(() => new ChatClient())

  return <ChatContext.Provider value={{ chatClient }}>{children}</ChatContext.Provider>
}
