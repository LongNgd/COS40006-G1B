import { DatePicker, DatePickerProps, Select } from 'antd'
import { useGetAnomaliesQuery } from '../../api/anomaliesApi'
import { TableC } from '../Chart/TableC'

const onChange: DatePickerProps['onChange'] = (date, dateString) => {
  console.log(date, dateString)
}
const handleChange = (value: string) => {
  console.log(`selected ${value}`)
}
const Report = () => {
  const { data: anomalies, error, isLoading } = useGetAnomaliesQuery()
  // console.log(anomalies?.data)

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error: {JSON.stringify(error)}</div>

  return (
    <div className="px-4">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5 p-4">
        <Select
          placeholder="Select a Camera"
          mode="multiple"
          onChange={handleChange}
          allowClear
          options={[
            ...new Set(anomalies?.data.map((anomaly) => anomaly.camera_name)),
          ].map((camera_name) => ({ label: camera_name, value: camera_name }))}
        />
        <Select
          placeholder="Select a Area"
          mode="multiple"
          onChange={handleChange}
          allowClear
          options={[
            ...new Set(anomalies?.data.map((anomaly) => anomaly.camera_area)),
          ].map((area) => ({ label: area, value: area }))}
        />
        <DatePicker onChange={onChange} />
        <Select
          placeholder="Select a time"
          onChange={handleChange}
          allowClear
          options={[
            { value: 'day', label: '6:00-18:00' },
            { value: 'night', label: '18:00-6:00' },
          ]}
        />
        <Select
          placeholder="Select warning"
          onChange={handleChange}
          allowClear
          options={[
            { value: '0', label: 'No Weapon' },
            { value: '1', label: 'Have Weapon' },
          ]}
        />
      </div>
      <TableC />
    </div>
  )
}

export default Report
