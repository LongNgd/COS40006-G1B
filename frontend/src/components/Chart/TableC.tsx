import { Button } from '../ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table'

import { anomalyData } from '../../assets/anomalydata'
import { useState } from 'react'
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '../ui/pagination'

export function TableC() {
  const rowPerPage = 10
  const [startIndex, setStartIndex] = useState(0)
  const [endIndex, setEndIndex] = useState(rowPerPage)

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>No</TableHead>
            <TableHead>Camera</TableHead>
            <TableHead>Area</TableHead>
            <TableHead>TimeStamp</TableHead>
            <TableHead>Duration</TableHead>
            <TableHead>Max Participant</TableHead>
            <TableHead>Warning Time (seconds)</TableHead>
            <TableHead>Evidence</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {anomalyData.slice(startIndex, endIndex).map((data, index) => (
            <TableRow key={index}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>{data.camera_id}</TableCell>
              <TableCell>{data.area}</TableCell>
              <TableCell>{data.date}</TableCell>
              <TableCell>{data.duration} seconds</TableCell>
              <TableCell>{data.max_attendance}</TableCell>
              <TableCell>{data.warning}</TableCell>
              <TableCell>
                <Button>view</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              className={
                startIndex === 0 ? 'pointer-events-none opacity-50' : undefined
              }
              href="#"
              size="default"
              onClick={() => {
                setStartIndex(startIndex - rowPerPage)
                setEndIndex(endIndex - rowPerPage)
              }}
            />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink size="default" href="#">
              1
            </PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
          <PaginationItem>
            <PaginationNext
              className={
                endIndex === anomalyData.length ? 'pointer-events-none opacity-50' : undefined
              }
              href="#"
              size="default"
              onClick={() => {
                setStartIndex(startIndex + rowPerPage)
                setEndIndex(endIndex + rowPerPage)
              }}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </>
  )
}
