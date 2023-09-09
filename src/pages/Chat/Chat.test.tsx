import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import * as api from 'src/libs/chat-room/api'
import { withRouter, WithRouterOptions } from 'src/libs/utils/test'

import Chat from './Chat'

describe('<Chat />', () => {
  let routerOptions: WithRouterOptions

  const deleteMessageRoom = jest.spyOn(api, 'deleteChatRoom')

  const renderHelper = (component: JSX.Element) => render(withRouter(component, routerOptions))

  beforeEach(() => {
    deleteMessageRoom.mockReturnValue(new Promise(() => {}))
  })

  it('renders correctly', () => {
    const { container } = renderHelper(<Chat />)

    expect(container).toMatchSnapshot()
  })

  describe('when the user is admin', () => {
    beforeEach(() => {
      routerOptions = { initialEntries: ['?admin=true'] }
    })

    it('calls api to delete room', async () => {
      renderHelper(<Chat />)

      userEvent.click(await screen.findByText('Delete room'))

      await waitFor(() => expect(deleteMessageRoom).toHaveBeenCalledTimes(1))
    })
  })

  // it('calls callback on send message', async () => {
  //   renderHelper(<Chat />)

  //   userEvent.type(screen.getByPlaceholderText('Aa'), 'Hello world!')
  //   userEvent.click(screen.getByText('Send'))

  //   await waitFor(() => expect(props.onSendMessage).toHaveBeenCalledTimes(1))
  //   expect(props.onSendMessage).toHaveBeenCalledWith('Hello world!')
  // })

  it('displays user input', async () => {
    renderHelper(<Chat />)

    userEvent.type(screen.getByPlaceholderText('Aa'), 'Hello world!')

    expect(await screen.findByDisplayValue('Hello world!')).toBeInTheDocument()
  })
})
