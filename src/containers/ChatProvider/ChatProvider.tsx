import { ReactNode, useMemo, useState } from 'react'

import { HubConnection } from '@microsoft/signalr'
import ChatContext from './ChatContext'

type Props = {
  children: ReactNode
}

const BrazeProvider = ({ children }: Props) => {
  const [connection, setConnection] = useState<HubConnection | null>(null)

  const contextValue = useMemo(() => ({ connection, setConnection }), [connection])

  return <ChatContext.Provider value={contextValue}>{children}</ChatContext.Provider>
}

export default BrazeProvider
