import '@testing-library/jest-dom'

HTMLElement.prototype.scrollBy = () => {}
HTMLElement.prototype.scrollIntoView = () => {}
HTMLElement.prototype.scrollTo = () => {}

jest.spyOn(window, 'scrollTo').mockImplementation(() => {})
jest.spyOn(window, 'alert').mockImplementation(() => {})
