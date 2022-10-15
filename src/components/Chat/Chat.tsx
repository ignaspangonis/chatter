import React, { useEffect, useRef } from 'react'
import { Button } from 'react-daisyui'

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

    // TODO: make this work
    messageRef.current.scrollTo({ left: 0, top: scrollHeight - clientHeight, behavior: 'smooth' })
  }, [messages])

  const renderMessage = (message: Message, index: number) => (
    <div className="user-message" role="gridcell" tabIndex={0} key={index}>
      <div className="text-sm">{message.userName}</div>
      <p className="inline-flex mb-[0] mt-x-small mx-auto py-small px-regular text-base text-cg7 rounded-lg bg-primary">
        {message.message}
      </p>
    </div>
  )

  return (
    <div ref={messageRef} className="w-full">
      <div className="mb-large flex justify-end">
        <Button onClick={onCloseConnection}>Leave Room</Button>
      </div>
      <div>
        <div className="flex flex-col gap-regular overflow-auto min-h-[400px] rounded-lg mb-large p-regular bg-cg6">
          {messages.map(renderMessage)}
        </div>
        <SendMessage onSubmit={onSendMessage} />
      </div>
    </div>
  )
}
