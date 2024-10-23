import { DatePicker, Select } from 'antd'
import dayjs from 'dayjs'
import { useState } from 'react'
import { useGetAnomaliesByUserQuery } from '../../api/anomaliesApi'
import { Anomaly } from '../../type/anomaly.type'
import { TableC } from './TableC'

const Report = () => {
  const getUser = localStorage.getItem('user')
  const user = getUser ? JSON.parse(getUser) : null
  const { isLoading, error, data: anomalies } = useGetAnomaliesByUserQuery(user)
  const [selectedValues, setSelectedValues] = useState<{
    cameras: string[]
    areas: string[]
    time: string | null
    warning: string | null
    date: dayjs.ConfigType | null
  }>({
    cameras: [],
    areas: [],
    time: null,
    warning: null,
    date: null,
  })

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error: {JSON.stringify(error)}</div>

  const handleChange = (type: string, value: unknown) => {
    setSelectedValues({ ...selectedValues, [type]: value })
  }

  // Function to apply filters
  const applyFilters = (data: Anomaly[]) => {
    return data?.filter((anomaly) => {
      const { cameras, areas, date, time, warning } = selectedValues

      // Filter by cameras
      if (cameras.length > 0 && !cameras.includes(anomaly.camera_name)) {
        return false
      }
      if (areas.length > 0 && !areas.includes(anomaly.camera_area)) {
        return false
      }
      if (date && !dayjs(anomaly.date).isSame(dayjs(date), 'day')) {
        return false
      }
      if (time) {
        const anomalyHour = dayjs(anomaly.time, 'HH:mm:ss').hour()
        const isDay = anomalyHour >= 6 && anomalyHour < 18
        if (time === 'day' && !isDay) return false
        if (time === 'night' && isDay) return false
      }
      if (warning !== null && anomaly.warning !== parseInt(warning, 10)) {
        return false
      }

      return true
    })
  }

  const filteredAnomalies = applyFilters(anomalies?.data || [])

  return (
    <>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5 p-4">
        <Select
          placeholder="Select a Camera"
          mode="multiple"
          onChange={(value) => handleChange('cameras', value)}
          allowClear
          options={[
            ...new Set(anomalies?.data.map((anomaly) => anomaly.camera_name)),
          ].map((camera_name) => ({ label: camera_name, value: camera_name }))}
        />
        <Select
          placeholder="Select a Area"
          mode="multiple"
          onChange={(value) => handleChange('areas', value)}
          allowClear
          options={[
            ...new Set(anomalies?.data.map((anomaly) => anomaly.camera_area)),
          ].map((area) => ({ label: area, value: area }))}
        />
        <DatePicker onChange={(date) => handleChange('date', date)} />
        <Select
          placeholder="Select a time"
          onChange={(value) => handleChange('time', value)}
          allowClear
          options={[
            { value: 'day', label: '6:00-18:00' },
            { value: 'night', label: '18:00-6:00' },
          ]}
        />
        <Select
          placeholder="Select warning"
          onChange={(value) => handleChange('warning', value)}
          // allowClear
          options={[
            { value: '0', label: 'No Weapon' },
            { value: '1', label: 'Have Weapon' },
          ]}
        />
      </div>
      <TableC data={filteredAnomalies} />
    </>
  )
}

export default Report
