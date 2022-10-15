import React, { useContext, useEffect, useRef } from 'react'
import { Button } from 'react-daisyui'
import { useNavigate } from 'react-router-dom'

import ChatContext from 'src/containers/ChatProvider/ChatContext'
import { Message } from 'src/types/models'

import SendMessage from './SendMessage/SendMessage'

type Props = {
  messages: Message[]
  onCloseConnection: () => void
  onSendMessage: (message: string) => void
}

export default function Chat({ messages, onCloseConnection, onSendMessage }: Props) {
  const messageRef = useRef<HTMLDivElement>(null)
  const { connection, users } = useContext(ChatContext)

  const navigate = useNavigate()

  useEffect(() => {
    if (!connection) navigate('/')
  }, [connection, navigate])

  useEffect(() => {
    if (!messageRef.current) return

    const { scrollHeight, clientHeight } = messageRef.current

    messageRef.current.scrollTo({ left: 0, top: scrollHeight - clientHeight, behavior: 'smooth' })
  }, [messages])

  const renderMessage = (message: Message, index: number) => (
    <div className="text-right pr-small" role="gridcell" tabIndex={0} key={index}>
      <div className="text-sm">{message.userName}</div>
      <p className="inline-flex mb-[0] mt-x-small mx-auto py-small px-regular text-base text-cg7 rounded-lg bg-primary">
        {message.message}
      </p>
    </div>
  )

  return (
    <div className="w-full">
      <div className="mb-large flex justify-end">
        <Button onClick={onCloseConnection}>Leave Room</Button>
      </div>

      <div>
        <h2>Connected users</h2>
        {users.map((user, index) => (
          <div key={index}>{user}</div>
        ))}
      </div>

      <div
        className="h-[420px] overflow-y-auto flex flex-col gap-regular rounded-lg mb-large p-regular bg-cg6"
        ref={messageRef}
      >
        {messages.map(renderMessage)}
      </div>

      <SendMessage onSubmit={onSendMessage} />
    </div>
  )
}
