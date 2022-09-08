import { HubConnectionBuilder, LogLevel, HubConnection } from '@microsoft/signalr'
import { useState } from 'react'

import './App.css'
import Lobby from './components/Lobby'
import { Message } from './types/models'
import Chat from './components/Chat'

function App() {
  const [connection, setConnection] = useState<HubConnection | null>(null)
  const [messages, setMessages] = useState<Message[]>([])

  async function handleRoomJoin(userName: string, roomName: string) {
    try {
      const newConnection = new HubConnectionBuilder()
        .withUrl('https://localhost:7276/chat')
        .configureLogging(LogLevel.Information)
        .build()

      newConnection.on('ReceiveMessage', (userName, message) => {
        setMessages(messages => [...messages, { userName, message }])
      })

      newConnection.onclose(event => {
        setConnection(null)
        setMessages([])
      })

      await newConnection.start()
      await newConnection.invoke('JoinRoom', { user: userName, room: roomName })
      setConnection(newConnection)
    } catch (error) {
      console.log(error)
      alert('Failed to join room')
    }
  }

  async function handleSendMessage(message: string) {
    if (!connection) return

    try {
      await connection.invoke('SendMessage', message)
    } catch (error) {
      console.log(error)
      alert('Failed to send message')
    }
  }

  async function handleCloseConnection() {
    if (!connection) return

    try {
      await connection.stop()
    } catch (error) {
      console.log(error)
      alert('Failed to leave room')
    }
  }

  return (
    <div className="app">
      <div className="flex w-full items-center justify-center py-large">
        <h1 className="text-4xl font-bold">Chatter</h1>
      </div>

      <hr />
      <div className="flex items-center justify-center max-w-x8-large mx-auto px-medium mt-x2-large">
        {connection ? (
          <Chat
            messages={messages}
            onSendMessage={handleSendMessage}
            onCloseConnection={handleCloseConnection}
          />
        ) : (
          <Lobby onJoin={handleRoomJoin} />
        )}
      </div>
    </div>
  )
}

export default App
