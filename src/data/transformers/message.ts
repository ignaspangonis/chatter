import { ExtendedMessageDto } from 'src/types/dtos'
import { MessageModel } from 'src/types/models'

export const transformMessages = (messages: ExtendedMessageDto[]): MessageModel[] =>
  messages.map(dto => ({
    userName: dto.author,
    content: dto.content,
  }))
