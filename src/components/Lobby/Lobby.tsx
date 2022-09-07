import React, { ChangeEvent, FormEvent, useState } from 'react'
import { Button, Form } from 'react-bootstrap'

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
    <Form className="lobby" onSubmit={handleSubmit}>
      <Form.Group>
        <Form.Label>Username</Form.Label>
        <Form.Control type="text" placeholder="Enter username" onChange={handleUserNameChange} />

        <Form.Label>Room</Form.Label>
        <Form.Control type="text" placeholder="Enter room" onChange={handleRoomNameChange} />
      </Form.Group>
      <Button variant="success" type="submit" disabled={!userName || !roomName}>
        Join
      </Button>
    </Form>
  )
}
