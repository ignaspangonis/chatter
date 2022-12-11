import React, { useContext, useEffect, useRef } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { Button } from 'react-daisyui'

import { Route } from 'src/constants/routes'
import ChatContext from 'src/containers/ChatProvider/ChatContext'
import { MessageModel } from 'src/types/models'

import SendMessage from './SendMessage'

type Props = {
  messages: MessageModel[]
  onLeaveRoom: () => void
  onSendMessage: (message: string) => void
}

export default function Chat({ messages, onLeaveRoom, onSendMessage }: Props) {
  const messageRef = useRef<HTMLDivElement>(null)
  const { connection, roomName, users } = useContext(ChatContext)

  const [searchParams, setSearchParams] = useSearchParams()
  const isAdmin = searchParams.get('admin') === 'true'

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

  const renderMessage = (message: MessageModel, index: number) => (
    <div className="text-right pr-small" role="gridcell" tabIndex={0} key={index}>
      <div className="text-sm">{message.userName}</div>
      <p className="inline-flex mb-[0] mt-x-small mx-auto py-small px-regular text-base text-cg7 rounded-lg bg-primary">
        {message.content}
      </p>
    </div>
  )

  const renderAdminAction = () => {
    const handleDeleteRoom = () => {
      // TODO: implement delete room
    }
    const handleMakeAdmin = () => setSearchParams({ admin: 'true' })

    if (isAdmin)
      return (
        <Button onClick={handleDeleteRoom} color="error">
          Delete Room
        </Button>
      )

    return <Button onClick={handleMakeAdmin}>Make me admin</Button>
  }

  return (
    <section className="w-full">
      <div className="mb-large flex justify-end items-center gap-large">
        <h2 className="text-2xl font-bold mr-auto">Room: {roomName}</h2>
        <Button onClick={onLeaveRoom}>Leave Room</Button>
        {renderAdminAction()}
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
