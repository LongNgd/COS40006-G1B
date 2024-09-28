import { createLazyFileRoute } from '@tanstack/react-router'
import Profile from '../../components/Pages/Profile'

export const Route = createLazyFileRoute('/_authenticated/profile')({
  component: Profile,
})
