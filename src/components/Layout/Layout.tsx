import { ReactNode } from 'react'

type Props = {
  children: ReactNode
}

export default function Layout({ children }: Props) {
  return (
    <div className="w-full min-h-screen">
      <div className="flex w-full items-center justify-center py-large">
        <h1 className="text-4xl font-bold">Chatter</h1>
      </div>

      <hr className="border-cg5" />
      <div className="flex items-center justify-center max-w-x8-large mx-auto px-medium mt-x2-large">
        {children}
      </div>
    </div>
  )
}
