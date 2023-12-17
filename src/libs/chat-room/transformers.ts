import { ExtendedMessageDto } from './types'
import { MessageModel } from './types'

export const transformMessage = (dto: ExtendedMessageDto): MessageModel => ({
  id: String(dto.id.timestamp),
  userName: dto.author,
  content: dto.content,
  createdAt: dto.createdAt,
  roomName: dto.roomName,
})

export const transformMessages = (messages: ExtendedMessageDto[]): MessageModel[] =>
  messages.map(transformMessage)
