import { HubConnectionBuilder, LogLevel, HubConnection } from '@microsoft/signalr'
import { useState } from 'react'

import 'bootstrap/dist/css/bootstrap.min.css'

import './App.css'
import Lobby from './components/Lobby'
import { Message } from './types/dtos'
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
    }
  }

  async function handleSendMessage(message: string) {
    if (!connection) return

    try {
      await connection.invoke('SendMessage', message)
    } catch (error) {
      console.log(error)
    }
  }

  async function handleCloseConnection() {
    if (!connection) return

    try {
      await connection.stop()
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="mx-auto">
      <h1 className="font-bold">Hello world!</h1>
      <hr className="line" />
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
  )
}

export default App
