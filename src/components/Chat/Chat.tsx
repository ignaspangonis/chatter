import React, { useEffect, useRef } from 'react'
import { Button } from 'react-bootstrap'

import { Message } from 'src/types/dtos'

import SendMessage from './SendMessage/SendMessage'

type Props = {
  messages: Message[]
  onSendMessage: (message: string) => void
  onCloseConnection: () => void
}

export default function Chat({ messages, onSendMessage, onCloseConnection }: Props) {
  const messageRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!messageRef.current) return

    const { scrollHeight, clientHeight } = messageRef.current

    messageRef.current.scrollTo({
      top: scrollHeight - clientHeight,
      behavior: 'smooth',
    })
  }, [messages])

  return (
    <div ref={messageRef}>
      <div className="leave-room">
        <Button variant="danger" onClick={onCloseConnection}>
          Leave Room
        </Button>
      </div>
      <div className="chat">
        <div className="message-container">
          {messages.map(message => (
            <div className="user-message">
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
