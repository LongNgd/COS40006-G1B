import { createFileRoute, redirect } from '@tanstack/react-router'

import LoginForm from '../components/Login/LoginForm'

export const Route = createFileRoute('/login')({
  beforeLoad({ context }) {
    const { isLogged } = context.auth
    if (isLogged()) {
      throw redirect({
        to: '/',
      })
    }
  },
  component: Login,
})

function Login() {
  return (
    <div className="min-h-screen grid place-items-center ">
      <LoginForm />
    </div>
  )
}
