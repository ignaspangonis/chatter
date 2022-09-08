import React, { FormEvent, useState } from 'react'

type Props = {
  onSubmit: (message: string) => void
}

export default function SendMessage({ onSubmit }: Props) {
  const [message, setMessage] = useState('')

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()

    if (!message) return

    onSubmit(message)
    setMessage('')
  }

  const handleMessageInput = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(target.value)
  }

  return (
    <form className="SendMessage" onSubmit={handleSubmit}>
      <div className="flex flex-row gap-regular grow">
        <input
          className="input input-bordered mx-auto flex-grow"
          value={message}
          placeholder="Aa"
          onChange={handleMessageInput}
        />

        <div className="">
          <button className="btn" type="submit" disabled={!message}>
            Send
          </button>
        </div>
      </div>
    </form>
  )
}
