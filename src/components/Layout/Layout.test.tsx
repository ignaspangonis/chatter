import { render } from '@testing-library/react'

import Layout from './Layout'

describe('<Layout />', () => {
  it('renders correctly', () => {
    const { container } = render(
      <Layout>
        <p>Content</p>
      </Layout>,
    )

    expect(container).toMatchSnapshot()
  })
})
