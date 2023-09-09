import { ROOT_API_URL } from 'src/constants/api'
import api from 'src/libs/api-client'

type DeleteChatRoomResponse = {
  message: 'Room deleted'
}

export const deleteChatRoom = (roomName: string) =>
  api.delete<DeleteChatRoomResponse>(`${ROOT_API_URL}/message-room/${roomName}`)
