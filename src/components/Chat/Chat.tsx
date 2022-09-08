import React, { useEffect, useRef } from 'react'

import { Message } from 'src/types/models'

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
      <div className="mb-regular flex justify-end">
        <button className="btn btn-accent" onClick={onCloseConnection}>
          Leave Room
        </button>
      </div>
      <div className="chat">
        <div className="message-container">
          {messages.map(message => (
            <div className="user-message">
              <div className="text-sm">{message.userName}</div>
              <div className="inline-flex mb-[0] mt-small mx-auto p-small text-base text-cg7 rounded-md bg-primary">
                {message.message}
              </div>
            </div>
          ))}
        </div>
        <SendMessage onSubmit={onSendMessage} />
      </div>
    </div>
  )
}
