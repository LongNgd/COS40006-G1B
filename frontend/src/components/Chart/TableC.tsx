import { Button, Flex, Modal, Table } from 'antd'
import { useState } from 'react'
import { Anomaly } from '../../api/anomaly.type'
import { ColumnsType } from 'antd/es/table'
import ReactPlayer from 'react-player'

export const TableC = ({ data }: { data: Anomaly[] }) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedRecord, setSelectedRecord] = useState<Anomaly | null>(null)
  console.log(data)

  const columns: ColumnsType<Anomaly> = [
    {
      title: 'No',
      dataIndex: 'anomaly_id',
      key: 'anomaly_id',
    },
    {
      title: 'Camera',
      dataIndex: 'camera_name',
      key: 'camera_name',
      sorter: (a, b) => a.camera_name.localeCompare(b.camera_name),
    },
    {
      title: 'Area',
      dataIndex: 'camera_area',
      key: 'camera_area',
      sorter: (a, b) => a.camera_area.localeCompare(b.camera_area),
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
      render: (warning) => <span>{warning ? 'have weapon' : 'no weapon'}</span>,
    },
    {
      title: 'Evidence',
      dataIndex: 'evidence_path',
      key: 'evidence_path',
      render: (_, record) => (
        <>
          <Button
            onClick={() => {
              setIsModalOpen(true)
              setSelectedRecord(record)
            }}
          >
            View
          </Button>
          <Modal
            width={700}
            title="Show Evidence Video"
            open={isModalOpen}
            onOk={() => setIsModalOpen(false)}
            onCancel={() => setIsModalOpen(false)}
          >
            <Flex align="center" justify="center">
              {selectedRecord && (
                <ReactPlayer url={selectedRecord.evidence_path} controls />
              )}
            </Flex>
          </Modal>
        </>
      ),
    },
  ]

  return (
    <Table
      dataSource={data.map((anomaly) => ({
        ...anomaly,
        key: anomaly.anomaly_id,
      }))}
      columns={columns}
      showSorterTooltip={{ target: 'sorter-icon' }}
      pagination={{ showSizeChanger: false }}
    />
  )
}
