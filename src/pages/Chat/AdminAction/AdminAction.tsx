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

    setUiState('idle')

    if ('error' in response) {
      return { success: false, status: response.status }
    }

    return { success: true }
  }

  const handleMakeMeAdminClick = () => {
    setSearchParams(searchParams => {
      searchParams.set(ADMIN_URL_PARAM, ADMIN_URL_PARAM_VALUE)

      return searchParams
    })
  }

  const handleDeleteRoomClick = async () => {
    if (!roomName) return

    onBeforeDeleteRoom()
    const response = await deleteRoom(roomName)

    if (response.success) {
      alert(`Room "${roomName}" has been deleted.`)
      return
    }

    alert(
      `Failed to delete room "${roomName}" (status: ${response.status}). Please try again later.`,
    )
  }

  if (isAdmin)
    return (
      <button
        className={`btn btn-error ${uiState === 'loading' ? 'loading' : ''}`}
        onClick={handleDeleteRoomClick}
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
