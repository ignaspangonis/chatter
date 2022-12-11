import React, { useContext, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from 'react-daisyui'

import ChatContext from 'src/containers/ChatProvider/ChatContext'
import useAdminActions from 'src/hooks/useAdminActions'

import { getLocalisedDate } from 'src/libs/utils/date'
import { Route } from 'src/constants/routes'
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
  const {
    uiState: deleteRoomUiState,
    handleDeleteRoom,
    handleMakeAdmin,
    isAdmin,
  } = useAdminActions(onLeaveRoom)

  const navigate = useNavigate()

  console.log(messages)

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
      <p
        className="inline-block text-left mb-[0] mt-x-small mx-auto py-small px-regular text-base text-cg7 rounded-lg bg-primary tooltip tooltip-left wrap-words"
        data-tip={getLocalisedDate(message.createdAt)}
      >
        {message.content}
      </p>
    </div>
  )

  const renderAdminAction = () => {
    if (isAdmin)
      return (
        <button
          className={`btn btn-error ${deleteRoomUiState === 'loading' ? 'loading' : ''}`}
          onClick={handleDeleteRoom}
        >
          Delete room
        </button>
      )

    return <Button onClick={handleMakeAdmin}>Make me admin</Button>
  }

  return (
    <section className="w-full">
      <div className="mb-large flex justify-end items-center gap-large">
        <h2 className="text-2xl font-bold mr-auto">
          Room: <span className="text-accent">{roomName}</span>
        </h2>
        {renderAdminAction()}
        <button className="btn btn-primary" onClick={onLeaveRoom}>
          Leave Room
        </button>
      </div>

      <div className="flex gap-large justify-between">
        <div className="mr-medium">
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
