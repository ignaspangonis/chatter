import React, { ChangeEvent, FormEvent, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { Weather } from 'src/components'

export default function Lobby() {
  const [userName, setUserName] = useState('')
  const [roomName, setRoomName] = useState('')

  const isFormDisabled = !userName || !roomName

  const navigate = useNavigate()

  const handleUserNameChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
    setUserName(target.value || '')
  }

  const handleRoomNameChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
    setRoomName(target.value || '')
  }

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()

    navigate(`/chat?userName=${userName}&roomName=${roomName}`)
  }

  return (
    <div className="flex flex-col gap-large">
      <Weather />
      <form
        className="form-control flex flex-col justify-center items-center w-full gap-medium"
        onSubmit={handleSubmit}
      >
        <label className="input-group">
          <span className="label">Username</span>
          <input
            type="text"
            className="input w-full focus:outline-offset-0 input-bordered"
            value={userName}
            placeholder="Enter username"
            onChange={handleUserNameChange}
          />
        </label>
        <label className="input-group">
          <span className="label">Room</span>
          <input
            type="text"
            className="input w-full focus:outline-offset-0 input-bordered"
            value={roomName}
            placeholder="Enter room"
            onChange={handleRoomNameChange}
          />
        </label>
        <button
          className={`btn btn-primary ${isFormDisabled ? 'btn-disabled' : ''}`}
          type="submit"
          disabled={isFormDisabled}
          color="primary"
        >
          Join
        </button>
      </form>
    </div>
  )
}
