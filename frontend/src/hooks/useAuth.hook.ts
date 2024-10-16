import { UserRes } from "../type/user.type"

export const useAuth = () => {
  const signIn = (data: UserRes) => {
    localStorage.setItem('isAuthenticated', 'true')
    localStorage.setItem('user', JSON.stringify(data))
  }

  const signOut = () => {
    localStorage.removeItem('isAuthenticated')
  }

  const isLogged = () => localStorage.getItem('isAuthenticated') === 'true'

  return { signIn, signOut, isLogged }
}

export type AuthContext = ReturnType<typeof useAuth>
