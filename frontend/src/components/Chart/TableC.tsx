import { Modal, Table, Button } from 'antd'
import { Anomaly, anomalyData } from '../../assets/anomalydata'
import { Key, useState } from 'react'
import Evidence from './Evidence'

export function TableC() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const columns = [
    {
      title: 'No',
      dataIndex: 'key',
      key: 'key',
    },
    {
      title: 'Camera',
      dataIndex: 'camera_id',
      key: 'camera_id',
      filters: Array.from({ length: 10 }, (_, i) => ({
        text: `Floor ${i + 1}`,
        value: `CAM0${i + 1}`,
      })),
      onFilter: (value: Key | boolean, record: Anomaly) => {
        return record.camera_id.startsWith(value.toString())
      },
    },
    {
      title: 'Area',
      dataIndex: 'area',
      key: 'area',
      filters: [
        { text: 'Classroom', value: 'classroom' },
        { text: 'Gymnasium', value: 'gymnasium' },
        { text: 'Cafeteria', value: 'cafeteria' },
        { text: 'Playground', value: 'playground' },
        { text: 'Library', value: 'library' },
      ],
      onFilter: (value: Key | boolean, record: Anomaly) => {
        return record.area.includes(value.toString())
      },
    },
    {
      title: 'TimeStamp',
      dataIndex: 'date',
      key: 'date',
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
        { text: 'no weapon', value: 'no' },
        { text: 'have weapon', value: 'have' },
      ],
      onFilter: (value: Key | boolean, record: Anomaly) => {
        return record.warning.startsWith(value.toString())
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
      dataSource={anomalyData}
      columns={columns}
      showSorterTooltip={{ target: 'sorter-icon' }}
    />
  )
}
