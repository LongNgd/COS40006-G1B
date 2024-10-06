import { DatePicker, Flex, Radio, RadioChangeEvent } from 'antd'
import dayjs from 'dayjs'
import { useState } from 'react'
import { AnomalyByArea } from '../Chart/AnomalyByArea'
import { AnomalyByDate } from '../Chart/AnomalyByDate'
import { AnomalybyWeapon } from '../Chart/AnomalybyWeapon'
import { MaxAnomalyByArea } from '../Chart/MaxAnomalyByArea'
import OverallInformation from '../Chart/OverallInformation'


const Dashboard = () => {
  const defaultDate = new Date()
  const [timeRange, setTimeRange] = useState('today')
  console.log(timeRange);
  
  const options = [
    { label: 'Today', value: 'today' },
    { label: 'This week', value: 'week' },
    { label: 'This month', value: 'month' },
  ]

  const filterData = (e: RadioChangeEvent) => {
    setTimeRange(e.target.value)
  }

  return (
    <div className="m-4">
      <div className="pb-4">
        <div className="flex justify-between pb-2 text-lg">
          Overview
          <DatePicker defaultValue={dayjs(defaultDate)} />
        </div>
        <OverallInformation />
      </div>
      <div className="flex justify-between pb-2 text-lg">
        Detail Information
        <Flex vertical gap="middle">
          <Radio.Group
            options={options}
            defaultValue="today"
            optionType="button"
            buttonStyle="solid"
            onChange={filterData}
          />
        </Flex>
      </div>
      <div className="grid grid-cols-3 gap-4">
        <AnomalyByDate/>
        <AnomalybyWeapon/>
        <AnomalyByArea/>
        <div className="col-span-3">
          <MaxAnomalyByArea/>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
