import React, { ChangeEvent, FormEvent, useState } from 'react'
import { Button, Form, Input, InputGroup } from 'react-daisyui'

import { Weather } from 'src/components'

type Props = {
  onJoin: (userName: string, roomName: string) => void
}

export default function Lobby({ onJoin }: Props) {
  const [userName, setUserName] = useState('')
  const [roomName, setRoomName] = useState('')

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

  return (
    <div className="flex flex-col gap-large">
      <Weather />
      <Form
        className="flex flex-col justify-center items-center w-full gap-medium"
        onSubmit={handleSubmit}
      >
        <InputGroup className="input-group">
          <span className="label">Username</span>
          <Input
            type="text"
            className="w-full"
            value={userName}
            placeholder="Enter username"
            onChange={handleUserNameChange}
          />
        </InputGroup>
        <InputGroup className="input-group mx-auto w-full">
          <span className="label">Room</span>
          <Input
            type="text"
            className="w-full"
            value={roomName}
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
