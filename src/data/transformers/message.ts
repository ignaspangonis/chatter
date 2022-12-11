import { ExtendedMessageDto, MessageModel } from 'src/types/models'

export const transformMessages = (messages: ExtendedMessageDto[]): MessageModel[] =>
  messages.map(dto => ({
    userName: dto.author,
    content: dto.content,
  }))
