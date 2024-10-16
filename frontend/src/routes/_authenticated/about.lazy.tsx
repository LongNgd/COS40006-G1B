import { createLazyFileRoute } from '@tanstack/react-router'
import About from '../../components/About/About'

export const Route = createLazyFileRoute('/_authenticated/about')({
  component: About,
})
