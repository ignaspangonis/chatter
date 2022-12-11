import { ROOT_URL } from 'src/constants/api'
import { WeatherDto } from 'src/types/dtos'
import api from 'src/libs/api-client'

import * as response from './response'

export const getCurrentWeather = () => api.get<WeatherDto>(`${ROOT_URL}/weather`)
export const deleteMessageRoom = (roomName: string) =>
  api.delete<response.DeleteMessageRoomResponse>(`${ROOT_URL}/message-room/${roomName}`)
