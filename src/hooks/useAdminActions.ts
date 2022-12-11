import { useSearchParams } from 'react-router-dom'
import { useContext, useState } from 'react'

import ChatContext from 'src/containers/ChatProvider/ChatContext'
import { UiState } from 'src/types/ui'
import { deleteMessageRoom } from 'src/data/api'

const useAdminActions = (handleLeaveRoom: () => void) => {
  const { roomName } = useContext(ChatContext)
  const [uiState, setUiState] = useState<UiState>('idle')

  const [searchParams, setSearchParams] = useSearchParams()
  const isAdmin = searchParams.get('admin') === 'true'

  const handleDeleteRoom = async () => {
    if (!roomName) return

    setUiState('loading')

    const response = await deleteMessageRoom(roomName)

    if ('error' in response) {
      setUiState('error')
      alert(`Failed to delete room: ${response.error}`)
      return
    }

    setUiState('idle')

    alert('Room deleted successfully')
    handleLeaveRoom()
  }

  const handleMakeAdmin = () => setSearchParams({ admin: 'true' })

  return {
    uiState,
    handleDeleteRoom,
    handleMakeAdmin,
    isAdmin,
  }
}

export default useAdminActions
