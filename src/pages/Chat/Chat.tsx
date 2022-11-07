import React, { useContext, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from 'react-daisyui'

import { Route } from 'src/constants/routes'
import ChatContext from 'src/containers/ChatProvider/ChatContext'
import { Message } from 'src/types/models'

import SendMessage from './SendMessage'

type Props = {
  messages: Message[]
  onLeaveRoom: () => void
  onSendMessage: (message: string) => void
}

export default function Chat({ messages, onLeaveRoom, onSendMessage }: Props) {
  const messageRef = useRef<HTMLDivElement>(null)
  const { connection, roomName, users } = useContext(ChatContext)

  const navigate = useNavigate()

  useEffect(() => {
    if (!connection) {
      alert('Connection was not found!')
      navigate(Route.Home)
    }
  }, [connection, navigate])

  useEffect(() => {
    if (!messageRef.current) return

    messageRef.current.scrollTo({
      top: messageRef.current.scrollHeight - messageRef.current.clientHeight,
      behavior: 'smooth',
      left: 0,
    })
  }, [messages])

  const renderMessage = (message: Message, index: number) => (
    <div className="text-right pr-small" role="gridcell" tabIndex={0} key={index}>
      <div className="text-sm">{message.userName}</div>
      <p className="inline-flex mb-[0] mt-x-small mx-auto py-small px-regular text-base text-cg7 rounded-lg bg-primary">
        {message.content}
      </p>
    </div>
  )

  return (
    <section className="w-full">
      <div className="mb-large flex justify-between">
        <h2 className="text-2xl font-bold">Room: {roomName}</h2>
        <Button onClick={onLeaveRoom}>Leave Room</Button>
      </div>

      <div className="flex gap-large justify-between">
        <div>
          <h3 className="text-lg font-bold">Connected users</h3>
          {users.map((user, index) => (
            <div key={index}>{user}</div>
          ))}
        </div>

        <div className="flex-1">
          <div
            className="h-[420px] overflow-y-auto flex flex-col gap-regular rounded-lg mb-large p-regular bg-cg6"
            ref={messageRef}
          >
            {messages.map(renderMessage)}
          </div>
          <SendMessage onSubmit={onSendMessage} />
        </div>
      </div>
    </section>
  )
}
