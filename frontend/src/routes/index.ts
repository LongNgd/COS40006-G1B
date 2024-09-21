import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  beforeLoad: async ({ context }) => {
    const { isLogged } = context.auth
    if (!isLogged()) {
      throw redirect({
        to: '/login',
      })
    }
    throw redirect({
      to: '/dashboard',
    })
  },
})
