export type MessageModel = {
  userName: string
  content: string
}

export type ExtendedMessageDto = {
  id: string
  author: string
  content: string
  created_at: string
  room_name: string
}
