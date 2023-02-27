export const withMockedConsoleError =
  <Func extends Function>(fn: Func) =>
  async () => {
    const mock = jest.spyOn(console, 'error').mockImplementation(() => {})

    const result = await fn()

    mock.mockRestore()

    return result
  }
