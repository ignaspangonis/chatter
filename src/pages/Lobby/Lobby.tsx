import classNames from 'classnames'
import React, { ChangeEvent, FormEvent, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { Weather } from 'src/components'
import Alert from 'src/components/Alert'

type ValidateFormReturnType =
  | {
      isValid: true
    }
  | {
      isValid: false
      error: string
    }

const FORBIDDEN_USER_NAMES = ['admin', 'moderator', 'chatbot']

const validateForm = (userName: string, roomName: string): ValidateFormReturnType => {
  if (!userName) {
    return { isValid: false, error: 'Please enter your username!' }
  }

  if (!roomName) {
    return { isValid: false, error: 'Please enter room name!' }
  }

  if (FORBIDDEN_USER_NAMES.includes(userName.toLowerCase())) {
    return { isValid: false, error: 'This username is not allowed! Please choose a different one.' }
  }

  return { isValid: true }
}

export default function Lobby() {
  const [userName, setUserName] = useState('')
  const [roomName, setRoomName] = useState('')
  const [error, setError] = useState<string | null>(null)

  const isFormDisabled = !userName || !roomName

  const navigate = useNavigate()

  const handleUserNameChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
    setUserName(target.value || '')

    if (error) setError(null)
  }

  const handleRoomNameChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
    setRoomName(target.value || '')

    if (error) setError(null)
  }

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()

    const formStatus = validateForm(userName, roomName)

    if (!formStatus.isValid) {
      setError(formStatus.error)

      return
    }

    navigate(`/chat?userName=${userName}&roomName=${roomName}`)
  }

  return (
    <div className="flex flex-col gap-large w-[420px]">
      <Weather />
      {error && <Alert message={error} />}
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
          className={classNames('btn btn-primary', {
            'btn-disabled': isFormDisabled,
          })}
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
