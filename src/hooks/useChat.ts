import { HubConnectionBuilder, LogLevel } from '@microsoft/signalr'
import { useNavigate } from 'react-router-dom'
import { useContext, useState } from 'react'

import { Message } from 'src/types/models'
import { ChatHubMethod } from 'src/constants/connection'
import ChatContext from 'src/containers/ChatProvider/ChatContext'
import { Route } from '../constants/routes'

const CHAT_API_URL = 'https://localhost:7276/chat'

const useChat = () => {
  const [messages, setMessages] = useState<Message[]>([])
  const { connection, setConnection, setRoomName, setUsers } = useContext(ChatContext)

  const navigate = useNavigate()

  async function handleSendMessage(message: string) {
    if (!connection) return

    try {
      await connection.invoke(ChatHubMethod.SendMessage, message)
    } catch (error) {
      console.log(error)
      alert('Failed to send message')
    }
  }

  async function handleLeaveRoom() {
    if (!connection) return

    try {
      await connection.stop()

      setConnection(null)
      setUsers([])
      setRoomName(null)
      navigate(Route.Home)
    } catch (error) {
      console.log(error)
      alert('Failed to leave room')
    }
  }

  async function handleJoinRoom(userName: string, roomName: string) {
    try {
      const newConnection = new HubConnectionBuilder()
        .withUrl(CHAT_API_URL)
        .configureLogging(LogLevel.Information)
        .build()

      newConnection.on(ChatHubMethod.ReceiveMessage, (userName, message) => {
        setMessages(messages => [...messages, { userName, message }])
      })

      newConnection.on(ChatHubMethod.UsersInRoom, (usersDto: string[]) => {
        setUsers(usersDto)
      })

      newConnection.onclose(event => {
        setConnection(null)
        setMessages([])
      })

      await newConnection.start()
      await newConnection.invoke(ChatHubMethod.JoinRoom, {
        UserName: userName,
        RoomName: roomName,
      })

      setConnection(newConnection)
      setRoomName(roomName)

      navigate(Route.Chat)
    } catch (error) {
      console.log(error)
      alert('Failed to join room')
    }
  }

  return {
    messages,
    handleJoinRoom,
    handleLeaveRoom,
    handleSendMessage,
  }
}

export default useChat
