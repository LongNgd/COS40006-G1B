import React from 'react'
import { Card, CardDescription, CardHeader, CardTitle } from '../ui/card'
import { Calendar } from '../ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Button } from '../ui/button'
import { CalendarIcon } from 'lucide-react'
import { format } from 'date-fns'
import { cn } from '../../lib/utils'

const OverallInformation = () => {
  const [date, setDate] = React.useState<Date | undefined>(new Date())

  return (
    <div className="flex gap-4">
      <Card>
        <CardHeader>
          <CardTitle>1234</CardTitle>
          <CardDescription>Total Anomaly</CardDescription>
        </CardHeader>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>3.4</CardTitle>
          <CardDescription>Average of Paticipant</CardDescription>
        </CardHeader>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>34</CardTitle>
          <CardDescription>Anomaly with weapon</CardDescription>
        </CardHeader>
      </Card>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={'outline'}
            className={cn(
              'w-[280px] justify-start text-left font-normal',
              !date && 'text-muted-foreground',
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date ? format(date, 'PPP') : <span>Pick a date</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            initialFocus
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}

export default OverallInformation
