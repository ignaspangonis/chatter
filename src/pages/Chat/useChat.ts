import { useCallback, useContext, useEffect, useState } from 'react'

import { MessageModel } from 'src/libs/chat-room/types'
import { ChatContext } from 'src/containers/ChatProvider/ChatContext'

type Props = {
  userName: string | null
  roomName: string | null
  onConnectionError: (error: unknown) => void
}

const useChat = ({ userName, roomName, onConnectionError }: Props) => {
  const [messages, setMessages] = useState<MessageModel[]>([])
  const [users, setUsers] = useState<string[]>([])
  const { chatClient } = useContext(ChatContext)

  const handleConnectionClosed = useCallback(() => {
    setUsers([])
    setMessages([])
  }, [])

  const disconnectFromRoom = useCallback(async () => {
    if (!chatClient) return

    try {
      await chatClient.disconnect()
    } catch (error) {
      alert('Failed to disconnect from the room, please try again later')
    }

    handleConnectionClosed()
  }, [handleConnectionClosed, chatClient])

  useEffect(() => {
    if (!userName || !roomName) return
    if (!chatClient) return

    chatClient.connect({
      roomName,
      userName,
      onGetUsers: setUsers,
      onNewMessage: message => setMessages(prevMessages => [...prevMessages, message]),
      onGetMessageHistory: messages => setMessages(messages),
      onClose: handleConnectionClosed,
      onError: onConnectionError,
    })

    return () => {
      chatClient.disconnect().catch(error => console.error('Failed to disconnect', error))
    }
  }, [roomName, userName, chatClient, handleConnectionClosed, onConnectionError])

  const sendMessage = useCallback(
    async (message: string) => {
      if (!chatClient) return

      try {
        await chatClient.sendMessage(message)
      } catch (error) {
        alert('Failed to send message')
      }
    },
    [chatClient],
  )

  return {
    users,
    messages,
    disconnectFromRoom,
    sendMessage,
  }
}

export default useChat
