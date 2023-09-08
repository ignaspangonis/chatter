import { HubConnection, HubConnectionBuilder, LogLevel } from '@microsoft/signalr'
import { ChatHubMethod, CHAT_API_URL } from 'src/constants/connection'
import { transformMessage, transformMessages } from 'src/data/transformers/message'
import { ExtendedMessageDto } from 'src/types/dtos'

import { MessageModel } from 'src/types/models'

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
    return this.connection.invoke(ChatHubMethod.SendMessage, message)
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

    this.connection.on(ChatHubMethod.ReceiveMessageHistory, (newMessages: ExtendedMessageDto[]) =>
      onGetMessageHistory(transformMessages(newMessages)),
    )
    this.connection.on(ChatHubMethod.ReceiveMessage, (message: ExtendedMessageDto) =>
      onNewMessage(transformMessage(message)),
    )
    this.connection.on(ChatHubMethod.UsersInRoom, onGetUsers)
    this.connection.onclose(onClose)

    const startConnection = async () => {
      try {
        await this.connection.start()
        await this.connection.invoke(ChatHubMethod.JoinRoom, {
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
