import { HubConnectionBuilder, LogLevel } from '@microsoft/signalr'
import { Route, Routes, useNavigate } from 'react-router-dom'
import { useContext, useState } from 'react'

import './App.css'
import Lobby from './components/Lobby'
import { Message } from './types/models'
import Chat from './components/Chat'
import { ChatHubMethod } from './constants/connection'
import ChatContext from './containers/ChatProvider/ChatContext'

function App() {
  const [messages, setMessages] = useState<Message[]>([])
  const navigate = useNavigate()

  const { setConnection } = useContext(ChatContext)

  async function handleRoomJoin(userName: string, roomName: string) {
    try {
      const newConnection = new HubConnectionBuilder()
        .withUrl('https://localhost:7276/chat')
        .configureLogging(LogLevel.Information)
        .build()

      newConnection.on(ChatHubMethod.ReceiveMessage, (userName, message) => {
        setMessages(messages => [...messages, { userName, message }])
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

      console.log(newConnection)

      navigate('/chat')
    } catch (error) {
      console.log(error)
      alert('Failed to join room')
    }
  }

  return (
    <div className="app">
      <div className="flex w-full items-center justify-center py-large">
        <h1 className="text-4xl font-bold">Chatter</h1>
      </div>

      <hr className="border-cg5" />
      <div className="flex items-center justify-center max-w-x8-large mx-auto px-medium mt-x2-large">
        <Routes>
          <Route path="/" element={<Lobby onJoin={handleRoomJoin} />} />
          <Route path="chat" element={<Chat messages={messages} />} />
        </Routes>
      </div>
    </div>
  )
}

export default App
