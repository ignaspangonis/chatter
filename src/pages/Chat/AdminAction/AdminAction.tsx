import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'

import { deleteChatRoom } from 'src/libs/chat-room/api'
import { UiState } from 'src/types/ui'

const ADMIN_URL_PARAM = 'admin'
const ADMIN_URL_PARAM_VALUE = 'true'

type Props = {
  roomName: string | null
  onBeforeDeleteRoom: () => void
}

export default function AdminAction({ roomName, onBeforeDeleteRoom }: Props) {
  const [uiState, setUiState] = useState<UiState>('idle')
  const [searchParams, setSearchParams] = useSearchParams()

  const isAdmin = searchParams.get(ADMIN_URL_PARAM) === ADMIN_URL_PARAM_VALUE

  const deleteRoom = async (roomName: string) => {
    setUiState('loading')

    const response = await deleteChatRoom(roomName)

    if ('error' in response) {
      setUiState('error')
      alert(`Failed to delete room (status: ${response.status}). Please try again later.`)

      return
    }

    alert('Room deleted successfully!')
    setUiState('idle')
  }

  const handleMakeMeAdminClick = () => {
    setSearchParams(searchParams => {
      searchParams.set(ADMIN_URL_PARAM, ADMIN_URL_PARAM_VALUE)

      return searchParams
    })
  }

  const handleDeleteRoom = async () => {
    if (!roomName) return

    onBeforeDeleteRoom()
    deleteRoom(roomName)
  }

  if (isAdmin)
    return (
      <button
        className={`btn btn-error ${uiState === 'loading' ? 'loading' : ''}`}
        onClick={handleDeleteRoom}
      >
        Delete room
      </button>
    )

  return (
    <button className="btn" onClick={handleMakeMeAdminClick}>
      Make me admin
    </button>
  )
}
