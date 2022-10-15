import { Route, Routes } from 'react-router-dom'

import Lobby from './components/Lobby'

import Chat from './components/Chat'
import useChat from './hooks/useChat'

function App() {
  const { messages, handleRoomJoin, handleCloseConnection, handleSendMessage } = useChat()

  return (
    <div className="w-full min-h-screen">
      <div className="flex w-full items-center justify-center py-large">
        <h1 className="text-4xl font-bold">Chatter</h1>
      </div>

      <hr className="border-cg5" />
      <div className="flex items-center justify-center max-w-x8-large mx-auto px-medium mt-x2-large">
        <Routes>
          <Route path="/" element={<Lobby onJoin={handleRoomJoin} />} />
          <Route
            path="chat"
            element={
              <Chat
                messages={messages}
                onCloseConnection={handleCloseConnection}
                onSendMessage={handleSendMessage}
              />
            }
          />
        </Routes>
      </div>
    </div>
  )
}

export default App
