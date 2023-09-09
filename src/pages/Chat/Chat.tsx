import React, { useEffect, useMemo, useRef } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'

import { getLocalisedDate } from 'src/libs/utils/date'
import { Route } from 'src/constants/routes'
import { MessageModel } from 'src/libs/chat-room/types/models'

import SendMessage from './SendMessage'
import useChat from './useChat'
import AdminAction from './AdminAction'
import classNames from 'classnames'

export default function Chat() {
  const messageRef = useRef<HTMLDivElement>(null)

  const navigate = useNavigate()
  const [searchParams] = useSearchParams()

  const [userName, roomName] = useMemo(() => {
    const userName = searchParams.get('userName')
    const roomName = searchParams.get('roomName')

    if (!userName || !roomName) return [null, null]

    return [String(userName), String(roomName)]
  }, [searchParams])

  const { messages, users, disconnectFromRoom, sendMessage } = useChat(userName, roomName)

  useEffect(() => {
    if (!userName || !roomName) {
      alert('Connection was not found!')
      navigate(Route.Home)
    }
  }, [userName, roomName, navigate])

  useEffect(() => {
    if (!messageRef.current) return

    messageRef.current.scrollTo({
      top: messageRef.current.scrollHeight - messageRef.current.clientHeight,
      behavior: 'smooth',
      left: 0,
    })
  }, [messages])

  const renderMessage = (message: MessageModel, index: number) => {
    const isOwnMessage = message.userName === userName
    const isSystemMessage = message.userName === 'ChatBot'
    const isOtherUserMessage = !isOwnMessage && !isSystemMessage

    return (
      <div
        className={classNames('pr-small', {
          'text-right': isOwnMessage,
          'text-left': isOtherUserMessage,
          'text-center': isSystemMessage,
        })}
        role="gridcell"
        tabIndex={0}
        key={index}
      >
        {!isSystemMessage && <p className="text-sm">{message.userName}</p>}
        <p
          className={classNames(
            'inline-block mb-[0] mt-x-small mx-auto py-small px-regular text-base rounded-lg wrap-words z-large tooltip',
            {
              'text-cg2 text-xs tooltip-right': isSystemMessage,
              'bg-primary text-cg7 tooltip-left': isOwnMessage,
              'bg-base-300 text-cg1 tooltip-right': isOtherUserMessage,
            },
          )}
          data-tip={getLocalisedDate(message.createdAt)}
        >
          {message.content}
        </p>
      </div>
    )
  }

  function leaveRoom() {
    disconnectFromRoom()
    navigate(Route.Home)
  }

  return (
    <section className="w-full">
      <div className="mb-large flex justify-end items-center gap-large">
        <h2 className="text-2xl font-bold mr-auto">
          Room: <span className="text-accent">{roomName}</span>
        </h2>
        <AdminAction roomName={roomName} onBeforeDeleteRoom={leaveRoom} />
        <button className="btn btn-primary" onClick={leaveRoom}>
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
            className="h-[420px] overflow-y-auto flex flex-col gap-regular rounded-lg mb-large p-regular bg-base-200"
            ref={messageRef}
          >
            {messages.map(renderMessage)}
          </div>
          <SendMessage onSubmit={sendMessage} />
        </div>
      </div>
    </section>
  )
}
