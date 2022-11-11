import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import { Button, Form, Input, InputGroup } from 'react-daisyui'

import { WEATHER_API_URL } from 'src/constants/connection'
import { WeatherDto } from 'src/types/dtos'
import { UiState } from 'src/types/ui'

type Props = {
  onJoin: (userName: string, roomName: string) => void
}

export default function Lobby({ onJoin }: Props) {
  const [userName, setUserName] = useState('')
  const [roomName, setRoomName] = useState('')
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

  const handleUserNameChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
    setUserName(target.value || '')
  }

  const handleRoomNameChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
    setRoomName(target.value || '')
  }

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()

    if (!userName || !roomName) return

    onJoin(userName, roomName)
  }

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

  return (
    <div className="flex flex-col gap-large">
      <div className="text-center">{renderWeatherText()}</div>
      <Form
        className="flex flex-col justify-center items-center w-full gap-medium"
        onSubmit={handleSubmit}
      >
        <InputGroup className="input-group">
          <span className="label">Username</span>
          <Input
            type="text"
            className="w-full"
            placeholder="Enter username"
            onChange={handleUserNameChange}
          />
        </InputGroup>
        <InputGroup className="input-group mx-auto w-full">
          <span className="label">Room</span>
          <Input
            type="text"
            className="w-full"
            placeholder="Enter room"
            onChange={handleRoomNameChange}
          />
        </InputGroup>
        <Button type="submit" disabled={!userName || !roomName} color="primary">
          Join
        </Button>
      </Form>
    </div>
  )
}
