import { Route, Routes } from 'react-router-dom'

import Lobby from 'src/pages/Lobby'
import Chat from 'src/pages/Chat'
import useChat from 'src/hooks/useChat'
import { Layout } from 'src/components'
import { Route as Path } from 'src/constants/routes'

function App() {
  const { messages, handleJoinRoom, handleLeaveRoom, handleSendMessage } = useChat()

  return (
    <Layout>
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
    </Layout>
  )
}

export default App
