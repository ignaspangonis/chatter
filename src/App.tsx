import { Route, Routes } from 'react-router-dom'

import Lobby from 'src/pages/Lobby'
import Chat from 'src/pages/Chat'
import { Layout } from 'src/components'
import { Route as Path } from 'src/constants/routes'

function App() {
  return (
    <Layout>
      <Routes>
        <Route path={Path.Home} element={<Lobby />} />
        <Route path={Path.Chat} element={<Chat />} />
      </Routes>
    </Layout>
  )
}

export default App
