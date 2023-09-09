import React, { useEffect, useState } from 'react'

import { getCurrentWeather } from 'src/data/api'
import { WeatherDto } from 'src/libs/chat-room/types/dtos'
import { UiState } from 'src/types/ui'

export default function Wheather() {
  const [weather, setWeather] = useState<WeatherDto>()
  const [uiState, setUiState] = useState<UiState>('loading')

  useEffect(() => {
    async function fetchWeather() {
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

    if (uiState === 'error') {
      return 'Failed to fetch the weather. Try again later.'
    }

    if (!weather) {
      return 'Sorry, weather is not available'
    }

    return `It's ${weather.summary} today - temperature is ${weather.temperature}°C`
  }

  return <div className="text-center">{renderWeatherText()}</div>
}
