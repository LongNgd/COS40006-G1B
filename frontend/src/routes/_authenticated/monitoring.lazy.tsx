import { createLazyFileRoute } from '@tanstack/react-router'
import Monitoring from '../../components/Pages/Monitoring'

export const Route = createLazyFileRoute('/_authenticated/monitoring')({
  component: Monitoring,
})