import React, { FormEvent, useState } from 'react'
import { Button, Form, InputGroup } from 'react-bootstrap'

type Props = {
  onSubmit: (message: string) => void
}

export default function SendMessage({ onSubmit }: Props) {
  const [message, setMessage] = useState('')

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()

    if (!message) return

    onSubmit(message)
  }

  const handleMessageInput = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(target.value)
  }

  return (
    <Form className="SendMessage" onSubmit={handleSubmit}>
      <InputGroup>
        <Form.Control placeholder="Aa" onChange={handleMessageInput} />

        <Button variant="primary" type="submit" disabled={!message}>
          Send
        </Button>
      </InputGroup>
    </Form>
  )
}
