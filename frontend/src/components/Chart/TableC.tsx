import { Button, Modal, Table } from 'antd'
import { useState } from 'react'
import { Anomaly } from '../../assets/anomalydata'
import Evidence from './Evidence'
import { useGetAnomaliesQuery } from '../../redux/anomaliesApi'
import { ColumnsType } from 'antd/es/table'

export function TableC() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const { data: anomalies, error, isLoading } = useGetAnomaliesQuery()

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error: {JSON.stringify(error)}</div>

  console.log(anomalies?.data)

  const columns: ColumnsType<Anomaly> = [
    {
      title: 'No',
      dataIndex: 'index',
      key: 'index',
    },
    {
      title: 'Camera',
      dataIndex: 'camera_name',
      key: 'camera_name',
      filters: [
        ...new Set(anomalies?.data.map((anomaly) => anomaly.camera_name)),
      ].map((camera_name) => ({ text: camera_name, value: camera_name })),
      onFilter: (value, record) => {
        return record.camera_name.startsWith(value.toString())
      },
    },
    {
      title: 'Area',
      dataIndex: 'area',
      key: 'area',
      filters: [
        ...new Set(anomalies?.data.map((anomaly) => anomaly.area)),
      ].map((area) => ({ text: area, value: area })),
      onFilter: (value, record) => {
        return record.area.includes(value.toString())
      },
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
    },
    {
      title: 'Time',
      dataIndex: 'time',
      key: 'time',
    },
    {
      title: 'Duration',
      dataIndex: 'duration',
      key: 'duration',
      render: (duration: number) => <span>{duration} seconds</span>,
    },
    {
      title: 'Warning',
      dataIndex: 'warning',
      key: 'warning',
      filters: [
        { text: 'no weapon', value: 0 },
        { text: 'have weapon', value: 1 },
      ],
      render: (warning) => <span>{warning ? 'have weapon' : 'no weapon'}</span>,
      onFilter: (value, record) => {
        return record.warning === value
      },
    },
    {
      title: 'Evidence',
      dataIndex: '',
      key: 'x',
      render: () => (
        <>
          <Button onClick={() => setIsModalOpen(true)}>View</Button>
          <Modal
            width={1000}
            title="Show Evidence Video"
            open={isModalOpen}
            onOk={() => setIsModalOpen(false)}
            onCancel={() => setIsModalOpen(false)}
          >
            <Evidence />
          </Modal>
        </>
      ),
    },
  ]

  return (
    <Table
      dataSource={anomalies?.data}
      columns={columns}
      showSorterTooltip={{ target: 'sorter-icon' }}
      pagination={{ showSizeChanger: false }}
    />
  )
}
