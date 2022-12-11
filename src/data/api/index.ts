import { ROOT_URL } from 'src/constants/api'
import { WeatherDto } from 'src/types/dtos'
import api from 'src/libs/api-client'

export const getCurrentWeather = () => api.get<WeatherDto>(`${ROOT_URL}/weather`)
