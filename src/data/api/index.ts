import { ROOT_API_URL } from 'src/constants/api'
import { WeatherDto } from 'src/libs/chat-room/types/dtos'
import api from 'src/libs/api-client'

import * as response from './response'

export const getCurrentWeather = () => api.get<WeatherDto>(`${ROOT_API_URL}/weather`)
export const deleteMessageRoom = (roomName: string) =>
  api.delete<response.DeleteMessageRoomResponse>(`${ROOT_API_URL}/message-room/${roomName}`)
