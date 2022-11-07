export enum ChatHubMethod {
  JoinRoom = 'JoinRoom',
  ReceiveMessage = 'ReceiveMessage',
  SendMessage = 'SendMessage',
  UsersInRoom = 'UsersInRoom',
}

const ROOT_URL = 'https://localhost:7276'

export const CHAT_API_URL = `${ROOT_URL}/chat`
export const WEATHER_API_URL = `${ROOT_URL}/weather`
