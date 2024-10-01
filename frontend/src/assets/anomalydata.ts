import { ChartConfig } from '../components/ui/chart'

export interface Anomaly {
  index: number
  area: string
  camera_name: string
  date: string
  duration: number
  evidence_path: number
  participant: number
  time: string
  warning: number
}

export const chartConfig = {
  key: {
    label: 'ID',
    color: '#e11d48',
  },
  date: {
    label: 'Date',
    color: '#2563eb',
  },
  number_of_anomalies: {
    label: 'Num of Anomalies',
    color: '#dc2626',
  },
  camera_id: {
    label: 'Camera ID',
    color: '#facc15',
  },
  area: {
    label: 'Area',
    color: '#2563eb',
  },
  max_attendance: {
    label: 'Max Attendance',
    color: '#f97316',
  },
  warning: {
    label: 'Warning',
    color: '#facc15',
  },
  duration: {
    label: 'Duration',
    color: '#2563eb',
  },
} satisfies ChartConfig