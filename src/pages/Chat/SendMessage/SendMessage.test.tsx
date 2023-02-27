import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { ComponentProps } from 'react'

import SendMessage from './SendMessage'

describe('<SendMessage {...props} />', () => {
  let props: ComponentProps<typeof SendMessage>

  beforeEach(() => {
    props = {
      onSubmit: jest.fn(),
    }
  })

  it('renders correctly', () => {
    const { container } = render(<SendMessage {...props} />)

    expect(container).toMatchSnapshot()
  })

  it('displays user input', async () => {
    render(<SendMessage {...props} />)

    userEvent.type(screen.getByPlaceholderText('Aa'), 'Hello world!')

    expect(await screen.findByDisplayValue('Hello world!')).toBeInTheDocument()
  })

  it('calls callback on form submit', async () => {
    render(<SendMessage {...props} />)

    userEvent.type(screen.getByPlaceholderText('Aa'), 'Hello world!')
    userEvent.click(screen.getByText('Send'))

    await waitFor(() => expect(props.onSubmit).toHaveBeenCalledTimes(1))
    expect(props.onSubmit).toHaveBeenCalledWith('Hello world!')
  })
})
