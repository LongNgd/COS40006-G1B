import { createLazyFileRoute } from '@tanstack/react-router'
import IssuePage from '../../components/Issue/IssuePage'

export const Route = createLazyFileRoute('/_authenticated/issue')({
  component: IssuePage,
})
