import { createLazyFileRoute } from '@tanstack/react-router'
import About from '../../components/Pages/About'

export const Route = createLazyFileRoute('/_authenticated/about')({
  component: About,
})
