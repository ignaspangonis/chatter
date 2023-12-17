import { ROOT_API_URL } from 'src/constants/api'
import { WeatherDto } from 'src/libs/chat-room/types'
import api from 'src/libs/api-client'

export const getCurrentWeather = () => api.get<WeatherDto>(`${ROOT_API_URL}/weather`)

type DeleteChatRoomResponse = {
  message: string
}

export const deleteChatRoom = (roomName: string) =>
  api.delete<DeleteChatRoomResponse>(`${ROOT_API_URL}/message-room/${roomName}`)
