import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { ComponentProps } from 'react'

import * as api from 'src/data/api'

import Lobby from './Lobby'

describe('<Lobby />', () => {
  let props: ComponentProps<typeof Lobby>

  const getCurrentWeather = jest.spyOn(api, 'getCurrentWeather')

  beforeEach(() => {
    getCurrentWeather.mockReturnValue(new Promise(() => {}))

    props = {
      onJoin: jest.fn(),
    }
  })

  it('renders weather loading state', () => {
    render(<Lobby {...props} />)

    expect(screen.getByText('Loading weather...')).toBeInTheDocument()
  })

  it('calls api to get weather', async () => {
    render(<Lobby {...props} />)

    await waitFor(() => expect(getCurrentWeather).toHaveBeenCalledTimes(1))
  })

  it('calls callback on form submit', async () => {
    render(<Lobby {...props} />)

    userEvent.type(screen.getByPlaceholderText('Enter username'), 'John')
    userEvent.type(screen.getByPlaceholderText('Enter room'), '1')
    userEvent.click(screen.getByText('Join'))

    await waitFor(() => expect(props.onJoin).toHaveBeenCalledTimes(1))
    expect(props.onJoin).toHaveBeenCalledWith('John', '1')
  })
})
