import { Button } from "../ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";

const invoices = [
  {
    camera: "CAM01-1",
    area: "Floor 1",
    time: "20 seconds",
    maxattendance: "5",
    warningtime: "None",
    timestamp: "12:03:30 26 Jun 24",
  },
  {
    camera: "CAM02-1",
    area: "Floor 2",
    time: "20 seconds",
    maxattendance: "5",
    warningtime: "None",
    timestamp: "12:03:30 26 Jun 24",
  },
  {
    camera: "CAM02-2",
    area: "Floor 2",
    time: "20 seconds",
    maxattendance: "6",
    warningtime: "3",
    timestamp: "12:03:30 26 Jun 24",
  },
  {
    camera: "CAM03-1",
    area: "Floor 3",
    time: "20 seconds",
    maxattendance: "4",
    warningtime: "None",
    timestamp: "12:03:30 26 Jun 24",
  },
  {
    camera: "CAM04-2",
    area: "Floor 4",
    time: "20 seconds",
    maxattendance: "3",
    warningtime: "None",
    timestamp: "12:03:30 26 Jun 24",
  },
  {
    camera: "CAM04-1",
    area: "Floor 4",
    time: "20 seconds",
    maxattendance: "4",
    warningtime: "4",
    timestamp: "12:03:30 26 Jun 24",
  },
  {
    camera: "CAM01-2",
    area: "Floor 1",
    time: "20 seconds",
    maxattendance: "5",
    warningtime: "None",
    timestamp: "12:03:30 26 Jun 24",
  },
];

export function TableC() {
  return (
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
        {invoices.map((invoice, index) => (
          <TableRow key={index}>
            <TableCell>{index + 1}</TableCell>
            <TableCell>{invoice.camera}</TableCell>
            <TableCell>{invoice.area}</TableCell>
            <TableCell>{invoice.timestamp}</TableCell>
            <TableCell>{invoice.time}</TableCell>
            <TableCell>{invoice.maxattendance}</TableCell>
            <TableCell>{invoice.warningtime}</TableCell>
            <TableCell><Button>view</Button></TableCell>
          </TableRow>
        ))}
      </TableBody>
      {/* <TableFooter>
          <TableRow>
            <TableCell colSpan={3}>Total</TableCell>
            <TableCell className="text-right">$2,500.00</TableCell>
          </TableRow>
        </TableFooter> */}
    </Table>
  );
}
