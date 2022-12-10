import React, { useEffect, useState } from 'react'

import { WEATHER_API_URL } from 'src/constants/connection'
import { WeatherDto } from 'src/types/dtos'
import { UiState } from 'src/types/ui'

export default function Wheather() {
  const [weather, setWeather] = useState<WeatherDto>()
  const [uiState, setUiState] = useState<UiState>('loading')

  useEffect(() => {
    fetch(WEATHER_API_URL)
      .then(response => response.json())
      .then(data => {
        setWeather(data)
        setUiState('idle')
      })
      .catch(error => {
        console.error(error)
        setUiState('error')
      })
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

    return `It's TODO today - temperature is ${weather.temperature}°C`
  }

  return <div className="text-center">{renderWeatherText()}</div>
}
