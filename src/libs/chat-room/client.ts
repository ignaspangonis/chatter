import { HubConnection, HubConnectionBuilder, LogLevel } from '@microsoft/signalr'
import { ChatEvent, ChatMethod, CHAT_API_URL } from 'src/libs/chat-room/constants'
import { transformMessage, transformMessages } from 'src/libs/chat-room/transformers'
import { ExtendedMessageDto } from 'src/libs/chat-room/types/dtos'

import { MessageModel } from 'src/libs/chat-room/types/models'

type SubscribeOptions = {
  roomName: string
  userName: string
  onGetUsers: (users: string[]) => void
  onNewMessage: (message: MessageModel) => void
  onGetMessageHistory: (messages: MessageModel[]) => void
  onClose: (error?: Error | undefined) => void
  onError: (error: unknown) => void
}

export class ChatClient {
  private connection: HubConnection

  constructor() {
    this.connection = new HubConnectionBuilder()
      .withUrl(CHAT_API_URL)
      .configureLogging(LogLevel.Information)
      .build()
  }

  public sendMessage(message: string) {
    return this.connection.invoke(ChatMethod.SendMessage, message)
  }

  public connect({
    roomName,
    userName,
    onGetUsers,
    onNewMessage,
    onGetMessageHistory,
    onClose,
    onError,
  }: SubscribeOptions) {
    if (this.connection.state !== 'Disconnected') return

    this.connection.on(ChatEvent.ReceiveMessageHistory, (newMessages: ExtendedMessageDto[]) =>
      onGetMessageHistory(transformMessages(newMessages)),
    )
    this.connection.on(ChatEvent.ReceiveMessage, (message: ExtendedMessageDto) =>
      onNewMessage(transformMessage(message)),
    )
    this.connection.on(ChatEvent.UsersInRoom, onGetUsers)
    this.connection.onclose(onClose)

    const startConnection = async () => {
      try {
        await this.connection.start()
        await this.connection.invoke(ChatMethod.JoinRoom, {
          UserName: userName,
          RoomName: roomName,
        })
      } catch (error: unknown) {
        onError(error)
      }
    }

    startConnection()
  }

  public disconnect = () => {
    if (!(this.connection.state === 'Connected')) return Promise.resolve()

    return this.connection.stop()
  }
}
