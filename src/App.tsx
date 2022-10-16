import { Route, Routes } from 'react-router-dom'

import Lobby from 'src/components/Lobby'
import Chat from 'src/components/Chat'
import useChat from 'src/hooks/useChat'
import { Route as Path } from 'src/constants/routes'

function App() {
  const { messages, handleJoinRoom, handleLeaveRoom, handleSendMessage } = useChat()

  return (
    <div className="w-full min-h-screen">
      <div className="flex w-full items-center justify-center py-large">
        <h1 className="text-4xl font-bold">Chatter</h1>
      </div>

      <hr className="border-cg5" />
      <div className="flex items-center justify-center max-w-x8-large mx-auto px-medium mt-x2-large">
        <Routes>
          <Route path={Path.Home} element={<Lobby onJoin={handleJoinRoom} />} />
          <Route
            path={Path.Chat}
            element={
              <Chat
                messages={messages}
                onLeaveRoom={handleLeaveRoom}
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
