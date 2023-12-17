export type WeatherDto = {
  temperature: number
  time: string
  summary: string
}

export type ExtendedMessageDto = {
  id: {
    creationTime: string
    increment: number
    machine: number
    pid: number
    timestamp: number
  }
  author: string
  content: string
  createdAt: string
  roomName: string
}

export type MessageModel = {
  id: string
  userName: string
  content: string
  createdAt: string
  roomName: string
}
