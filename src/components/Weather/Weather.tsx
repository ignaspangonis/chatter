import React, { useEffect, useState } from 'react'

import { getCurrentWeather } from 'src/data/api'
import { WeatherDto } from 'src/libs/chat-room/types'
import { UiState } from 'src/types/ui'

export default function Wheather() {
  const [weather, setWeather] = useState<WeatherDto>()
  const [uiState, setUiState] = useState<UiState>('idle')

  useEffect(() => {
    async function fetchWeather() {
      setUiState('loading')

      const weather = await getCurrentWeather()

      if ('error' in weather) {
        setUiState('error')
        return
      }

      setWeather(weather)
      setUiState('idle')
    }

    fetchWeather()
  }, [])

  const renderWeatherText = () => {
    if (uiState === 'loading') {
      return 'Loading weather...'
    }

    if (uiState === 'error' || !weather) {
      return 'Failed to fetch the weather. Please try again later.'
    }

    return `It's ${weather.summary} today - temperature is ${weather.temperature}°C.`
  }

  return <div className="text-center">{renderWeatherText()}</div>
}
