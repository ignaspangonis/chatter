import React, { useContext, useEffect, useRef } from 'react'
import { Button } from 'react-daisyui'
import { useNavigate } from 'react-router-dom'

import { ChatHubMethod } from 'src/constants/connection'
import ChatContext from 'src/containers/ChatProvider/ChatContext'
import { Message } from 'src/types/models'

import SendMessage from './SendMessage/SendMessage'

type Props = {
  messages: Message[]
}

export default function Chat({ messages }: Props) {
  const messageRef = useRef<HTMLDivElement>(null)
  const navigate = useNavigate()

  const { connection } = useContext(ChatContext)

  useEffect(() => {
    if (!connection) navigate('/')
  }, [connection, navigate])

  async function handleSendMessage(message: string) {
    if (!connection) return

    try {
      await connection.invoke(ChatHubMethod.SendMessage, message)
    } catch (error) {
      console.log(error)
      alert('Failed to send message')
    }
  }

  async function handleCloseConnection() {
    if (!connection) return

    try {
      await connection.stop()

      navigate('/')
    } catch (error) {
      console.log(error)
      alert('Failed to leave room')
    }
  }

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
        <Button onClick={handleCloseConnection}>Leave Room</Button>
      </div>
      <div>
        <div className="flex flex-col gap-regular overflow-auto min-h-[400px] rounded-lg mb-large p-regular bg-cg6">
          {messages.map(renderMessage)}
        </div>
        <SendMessage onSubmit={handleSendMessage} />
      </div>
    </div>
  )
}
