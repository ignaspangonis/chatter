type ValidateFormReturnType =
  | {
      isValid: true
    }
  | {
      isValid: false
      error: string
    }

const FORBIDDEN_USER_NAMES = ['admin', 'moderator', 'chatbot']

export const validateForm = (userName: string, roomName: string): ValidateFormReturnType => {
  if (!userName) {
    return { isValid: false, error: 'Please enter your username!' }
  }

  if (!roomName) {
    return { isValid: false, error: 'Please enter room name!' }
  }

  if (FORBIDDEN_USER_NAMES.includes(userName.toLowerCase())) {
    return { isValid: false, error: 'This username is not allowed! Please choose a different one.' }
  }

  return { isValid: true }
}
