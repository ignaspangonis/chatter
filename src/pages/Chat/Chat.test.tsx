import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
// import { ComponentProps } from 'react'

import * as api from 'src/data/api'
import { withRouter, WithRouterOptions } from 'src/libs/utils/test'

import Chat from './Chat'

describe('<Chat />', () => {
  // let props: ComponentProps<typeof Chat>
  let routerOptions: WithRouterOptions

  const deleteMessageRoom = jest.spyOn(api, 'deleteMessageRoom')

  const renderHelper = (component: JSX.Element) => render(withRouter(component, routerOptions))

  beforeEach(() => {
    deleteMessageRoom.mockReturnValue(new Promise(() => {}))

    // props = {
    //   messages: [
    //     {
    //       id: '1',
    //       userName: 'Mark',
    //       content: 'Nice',
    //       createdAt: '2021-08-01T00:00:00.000Z',
    //       roomName: 'Food',
    //     },
    //   ],
    //   onSendMessage: jest.fn(),
    //   onLeaveRoom: jest.fn(),
    // }
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
