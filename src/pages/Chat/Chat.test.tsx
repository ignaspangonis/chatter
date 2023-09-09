import { act, render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import * as api from 'src/libs/chat-room/api'
import { ChatClientMock, withChat, withRouter, WithRouterOptions } from 'src/libs/utils/test'

import Chat from './Chat'

describe('<Chat />', () => {
  let routerOptions: WithRouterOptions
  let chatClient: ChatClientMock

  const deleteChatRoom = jest.spyOn(api, 'deleteChatRoom')

  const renderHelper = (component: JSX.Element) =>
    render(withChat(withRouter(component, routerOptions), chatClient))

  beforeEach(() => {
    deleteChatRoom.mockReturnValue(new Promise(() => {}))

    chatClient = new ChatClientMock()
    routerOptions = { initialEntries: ['?userName=John&roomName=1'] }
  })

  it('renders a new message', async () => {
    renderHelper(<Chat />)

    await waitFor(() => expect(chatClient.connect).toHaveBeenCalledTimes(1))
    expect(screen.queryByText('Hello world!')).not.toBeInTheDocument()

    const { onNewMessage } = chatClient.connect.mock.calls[0][0]

    // TODO: act should not be needed here
    act(() => {
      onNewMessage({
        id: 'adfa',
        userName: 'John',
        content: 'Hello world!',
        createdAt: '2023-09-09',
        roomName: '1',
      })
    })

    expect(await screen.findByText('Hello world!')).toBeInTheDocument()
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
