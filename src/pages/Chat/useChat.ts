import { useCallback, useContext, useEffect, useState } from 'react'

import { MessageModel } from 'src/libs/chat-room/types/models'
import { ChatContext } from 'src/containers/ChatProvider/ChatContext'

const handleError = (userMessage: string, error: unknown) => {
  alert(userMessage)

  if (error instanceof Error) {
    console.error(`${userMessage}. Error: ${error.message}. Stacktrace: ${error.stack}`)
  }
}

const useChat = (userName: string | null, roomName: string | null) => {
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
      handleError('Failed to disconnect from the room, please try again later', error)
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
      onError: error => handleError('Failed to connect, please try again later', error),
    })

    return () => {
      chatClient.disconnect().catch(error => console.error('Failed to disconnect', error))
    }
  }, [roomName, userName, chatClient, handleConnectionClosed])

  const sendMessage = useCallback(
    async (message: string) => {
      if (!chatClient) return

      try {
        await chatClient.sendMessage(message)
      } catch (error) {
        handleError('Failed to send message', error)
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
