import { act, render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import * as api from 'src/data/api'
import { MessageModel } from 'src/libs/chat-room/types'
import { ChatClientMock, withChat, withRouter, WithRouterOptions } from 'src/libs/utils/test'

import Chat from './Chat'

const buildMessageModel = (override?: Partial<MessageModel>): MessageModel => ({
  id: 'adfa',
  userName: 'John',
  content: 'Hello world!',
  createdAt: '2023-09-09T00:00:00.000Z',
  roomName: '1',
  ...override,
})

describe('<Chat />', () => {
  let routerOptions: WithRouterOptions
  let chatClient: ChatClientMock

  const deleteChatRoom = jest.spyOn(api, 'deleteChatRoom')

  const renderHelper = (component: JSX.Element) =>
    render(withChat(withRouter(component, routerOptions), chatClient))

  beforeEach(() => {
    deleteChatRoom.mockReturnValue(new Promise(() => {}))

    chatClient = new ChatClientMock()
    routerOptions = { initialEntries: ['?userName=John&roomName=best-room'] }
  })

  it('renders the room name', () => {
    renderHelper(<Chat />)

    expect(screen.getByText('best-room')).toBeInTheDocument()
  })

  it('renders messages with usernames', async () => {
    renderHelper(<Chat />)

    await waitFor(() => expect(chatClient.connect).toHaveBeenCalledTimes(1))
    expect(screen.queryByText('Hello world!')).not.toBeInTheDocument()

    const { onGetMessageHistory } = chatClient.connect.mock.calls[0][0]

    const messages = [
      buildMessageModel({ content: 'Hey world!', userName: 'Josh' }),
      buildMessageModel({ content: 'Hello!', userName: 'Mark' }),
    ]

    act(() => onGetMessageHistory(messages))

    expect(await screen.findByText('Hey world!')).toBeInTheDocument()
    expect(screen.getByText('Josh')).toBeInTheDocument()
    expect(screen.getByText('Hello!')).toBeInTheDocument()
    expect(screen.getByText('Mark')).toBeInTheDocument()
  })

  it('renders a new message with username', async () => {
    renderHelper(<Chat />)

    await waitFor(() => expect(chatClient.connect).toHaveBeenCalledTimes(1))
    expect(screen.queryByText('Hello world!')).not.toBeInTheDocument()
    expect(screen.queryByText('John')).not.toBeInTheDocument()

    const { onNewMessage } = chatClient.connect.mock.calls[0][0]
    const newMessage = buildMessageModel({ userName: 'John', content: 'Hello world!' })

    act(() => onNewMessage(newMessage))

    expect(await screen.findByText('Hello world!')).toBeInTheDocument()
    expect(screen.getByText('John')).toBeInTheDocument()
  })

  describe('when the user is admin', () => {
    beforeEach(() => {
      routerOptions = { initialEntries: ['?userName=John&roomName=1&admin=true'] }
    })

    it('calls api to delete room', async () => {
      renderHelper(<Chat />)

      userEvent.click(await screen.findByText('Delete room'))

      await waitFor(() => expect(deleteChatRoom).toHaveBeenCalledTimes(1))
    })
  })

  it('sends message', async () => {
    renderHelper(<Chat />)

    userEvent.type(screen.getByPlaceholderText('Aa'), 'Hello world!')
    userEvent.click(screen.getByText('Send'))

    await waitFor(() => expect(chatClient.sendMessage).toHaveBeenCalledTimes(1))
    expect(chatClient.sendMessage).toHaveBeenCalledWith('Hello world!')
  })

  it('displays user input', async () => {
    renderHelper(<Chat />)

    userEvent.type(screen.getByPlaceholderText('Aa'), 'Hello world!')

    expect(await screen.findByDisplayValue('Hello world!')).toBeInTheDocument()
  })
})
