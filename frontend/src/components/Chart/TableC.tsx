import { Modal, Table, Button } from 'antd'
import { Key, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAnomalies } from '../../redux/thunks'
import { AppDispatch, RootState } from '../../redux/store' // Adjust the import according to your store setup
import Evidence from './Evidence'
import { Anomaly } from '../../assets/anomalydata'

export function TableC() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const dispatch: AppDispatch = useDispatch();
  const { anomalies, loading, error } = useSelector(
    (state: RootState) => state.anomalies,
  )
  console.log(anomalies)

  useEffect(() => {
    dispatch(fetchAnomalies())
  }, [dispatch])

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {error}</div>

  const columns = [
    {
      title: 'No',
      dataIndex: 'anomaly_id',
      key: 'anomaly_id',
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
        { text: 'no weapon', value: false },
        { text: 'have weapon', value: true },
      ],
      render: (warning: boolean) => <span>{warning ? 'have weapon' : 'no weapon'}</span>,
      onFilter: (value: Key | boolean, record: Anomaly) => {
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
      dataSource={anomalies.data}
      columns={columns}
      showSorterTooltip={{ target: 'sorter-icon' }}
    />
  )
}
