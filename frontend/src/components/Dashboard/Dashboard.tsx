import { Flex, Radio, RadioChangeEvent, Skeleton } from 'antd'
import dayjs from 'dayjs'
import { useState } from 'react'
import { useGetAnomaliesByUserQuery } from '../../api/anomaliesApi'
import { AnomalyByArea } from '../Chart/AnomalyByArea'
import { AnomalyByDate } from '../Chart/AnomalyByDate'
import { AnomalybyWeapon } from '../Chart/AnomalybyWeapon'
import { OverallInformation } from './OverallInformation'
import { MaxParticipantByArea } from '../Chart/MaxParticipantByArea'

const Dashboard = () => {
  const date = '2024-09-29'
  const [timeRange, setTimeRange] = useState('month')
  const getUser = localStorage.getItem('user')
  const user = getUser ? JSON.parse(getUser) : null

  // const { data: anomalies } = useGetAnomaliesQuery()
  const { isLoading, error, data: anomalies } = useGetAnomaliesByUserQuery(user)

  const options = [
    { label: 'Today', value: 'today' },
    { label: 'This week', value: 'week' },
    { label: 'This month', value: 'month' },
  ]

  if (error) return <div>Error: {JSON.stringify(error)}</div>

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

  return (
    <>
      <div className="pb-4">
        <p className="text-lg pb-2">Overview</p>
        <OverallInformation data={detailData || []} loading={isLoading} />
      </div>
      <div className="flex justify-between pb-2">
        <p className="text-lg">Detail Information</p>
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
        {isLoading ? <Skeleton /> : <AnomalyByDate data={detailData || []} />}
        {isLoading ? <Skeleton /> : <AnomalybyWeapon data={detailData || []} />}
        {isLoading ? <Skeleton /> : <AnomalyByArea data={detailData || []} />}
        {isLoading ? (
          <Skeleton />
        ) : (
          <div className="col-span-3">
            <MaxParticipantByArea data={detailData || []} />
          </div>
        )}
      </div>
    </>
  )
}

export default Dashboard
