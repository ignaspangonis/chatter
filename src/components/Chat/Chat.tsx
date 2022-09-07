import React from 'react'
import { Button } from 'react-bootstrap'

import { Message } from 'src/types/dtos'

import SendMessage from './SendMessage/SendMessage'

type Props = {
  messages: Message[]
  onSendMessage: (message: string) => void
  onCloseConnection: () => void
}

export default function Chat({ messages, onSendMessage, onCloseConnection }: Props) {
  return (
    <div>
      <div className="leave-room">
        <Button variant="danger" onClick={onCloseConnection}>
          Leave Room
        </Button>
      </div>
      <div className="chat">
        <div className="message-container">
          {messages.map((message, index) => (
            <div key={index} className="user-message">
              <div className="from-user">{message.userName}</div>
              <div className="message bg-primary">{message.message}</div>
            </div>
          ))}
        </div>
        <SendMessage onSubmit={onSendMessage} />
      </div>
    </div>
  )
}
