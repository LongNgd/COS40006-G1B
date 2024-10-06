import {
  DatePicker,
  DatePickerProps,
  Flex,
  Radio,
  RadioChangeEvent,
} from 'antd'
import dayjs from 'dayjs'
import { useState } from 'react'
import { AnomalyByArea } from '../Chart/AnomalyByArea'
import { AnomalyByDate } from '../Chart/AnomalyByDate'
import { AnomalybyWeapon } from '../Chart/AnomalybyWeapon'
import { MaxParticipantByArea } from '../Chart/MaxParticipantByArea'
import { OverallInformation } from '../Chart/OverallInformation'
import { useGetAnomaliesQuery } from '../../api/anomaliesApi'

const Dashboard = () => {
  const [date, setDate] = useState('2024-09-29')
  const [timeRange, setTimeRange] = useState('month')

  const { data: anomalies } = useGetAnomaliesQuery()

  const options = [
    { label: 'Today', value: 'today' },
    { label: 'This week', value: 'week' },
    { label: 'This month', value: 'month' },
  ]

  const overallFilter: DatePickerProps['onChange'] = (dateString) => {
    const formattedDate = dayjs(dateString).format('YYYY-MM-DD')
    setDate(formattedDate)
  }

  const overallData = anomalies?.data.filter((anomaly) =>
    dayjs(anomaly.date).isSame(date, 'day'),
  )

  const detailFilter = (e: RadioChangeEvent) => {
    setTimeRange(e.target.value)
  }
  const detailData = anomalies?.data.filter((item) => {
    const selectedDate = dayjs(item.date)
    let daysToSubtract = 0
    if (timeRange === 'month') {
      daysToSubtract = 30
    } else if (timeRange === 'week') {
      daysToSubtract = 7
    }
    const comparisonDate = dayjs(date).subtract(daysToSubtract, 'day')
    return (
      selectedDate.isSame(comparisonDate) ||
      selectedDate.isAfter(comparisonDate)
    )
  })
  // console.log(detailData)

  return (
    <div className="m-4">
      <div className="pb-4">
        <div className="flex justify-between pb-2 text-lg">
          Overview
          <DatePicker
            defaultValue={dayjs(date)}
            allowClear={false}
            onChange={overallFilter}
          />
        </div>
        <OverallInformation data={overallData || []} />
      </div>
      <div className="flex justify-between pb-2 text-lg">
        Detail Information
        <Flex vertical gap="middle">
          <Radio.Group
            options={options}
            defaultValue="month"
            optionType="button"
            buttonStyle="solid"
            onChange={detailFilter}
          />
        </Flex>
      </div>
      <div className="grid grid-cols-3 gap-4">
        <AnomalyByDate data={detailData || []} />
        <AnomalybyWeapon data={detailData || []} />
        <AnomalyByArea data={detailData || []} />
        <div className="col-span-3">
          <MaxParticipantByArea data={detailData || []} />
        </div>
      </div>
    </div>
  )
}

export default Dashboard
