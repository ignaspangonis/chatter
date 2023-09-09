import { ROOT_API_URL } from '../../constants/api'

export enum ChatMethod {
  JoinRoom = 'JoinRoom',
  SendMessage = 'SendMessage',
}

export enum ChatEvent {
  ReceiveMessage = 'ReceiveMessage',
  UsersInRoom = 'UsersInRoom',
  ReceiveMessageHistory = 'ReceiveMessageHistory',
}

export const CHAT_API_URL = `${ROOT_API_URL}/chat`
