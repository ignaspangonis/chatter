import React, { useEffect, useState } from 'react'

import { WEATHER_API_URL } from 'src/constants/connection'
import { WeatherDto } from 'src/types/dtos'
import { UiState } from 'src/types/ui'

export default function Wheather() {
  const [weather, setWeather] = useState<WeatherDto>()
  const [uiState, setUiState] = useState<UiState>('idle')

  useEffect(() => {
    setUiState('loading')

    fetch(WEATHER_API_URL)
      .then(response => response.json())
      .then(data => {
        setWeather(data[0])
        setUiState('idle')
      })
      .catch(error => {
        console.error(error)
        setUiState('error')
      })
  }, [])

  const renderWeatherText = () => {
    if (uiState === 'loading') {
      return 'Loading...'
    }

    if (uiState === 'error') {
      return 'Something went wrong...'
    }

    if (!weather) {
      return 'Weather not available'
    }

    return `It's ${weather.summary} today - temperature is ${weather.temperatureC}°C`
  }

  return <div className="text-center">{renderWeatherText()}</div>
}
