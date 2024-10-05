export interface Anomaly {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any,
  row_index: number
  area: string
  camera_name: string
  date: string
  duration: number
  evidence_path: number
  participant: number
  time: string
  warning: number
}