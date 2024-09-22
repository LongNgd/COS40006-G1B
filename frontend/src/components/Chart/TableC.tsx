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
    camera: "INV001",
    area: "School",
    time: "20 seconds",
    maxattendance: "5",
    warningtime: "None",
    evidence: "None",
  },
  {
    camera: "INV002",
    area: "School",
    time: "20 seconds",
    maxattendance: "5",
    warningtime: "None",
    evidence: "None",
  },
  {
    camera: "INV003",
    area: "School",
    time: "20 seconds",
    maxattendance: "6",
    warningtime: "None",
    evidence: "None",
  },
  {
    camera: "INV004",
    area: "School",
    time: "20 seconds",
    maxattendance: "4",
    warningtime: "None",
    evidence: "None",
  },
  {
    camera: "INV005",
    area: "School",
    time: "20 seconds",
    maxattendance: "3",
    warningtime: "None",
    evidence: "None",
  },
  {
    camera: "INV006",
    area: "School",
    time: "20 seconds",
    maxattendance: "4",
    warningtime: "None",
    evidence: "None",
  },
  {
    camera: "INV007",
    area: "School",
    time: "20 seconds",
    maxattendance: "5",
    warningtime: "None",
    evidence: "None",
  },
];

export function TableC() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Camera</TableHead>
          <TableHead>Area</TableHead>
          <TableHead>Time of Abnormality</TableHead>
          <TableHead>Maximum Attendance</TableHead>
          <TableHead>Warning Time (seconds)</TableHead>
          <TableHead>Evidence</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {invoices.map((invoice) => (
          <TableRow key={invoice.camera}>
            <TableCell>{invoice.camera}</TableCell>
            <TableCell>{invoice.area}</TableCell>
            <TableCell>{invoice.time}</TableCell>
            <TableCell>{invoice.maxattendance}</TableCell>
            <TableCell>{invoice.warningtime}</TableCell>
            <TableCell>{invoice.evidence}</TableCell>
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
