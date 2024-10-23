import { Flex, Input, Modal } from 'antd'
import { LucideTriangleAlert } from 'lucide-react'
import { useState } from 'react'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { logIssueSchema } from './logissue.validation'
import { Button } from '../ui/button'
import { Textarea } from '../ui/textarea'

const ReportForm = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const form = useForm<z.infer<typeof logIssueSchema>>({
    resolver: zodResolver(logIssueSchema),
    defaultValues: {
      title: '',
      detail: '',
    },
  })

  const onSubmit = async (values: z.infer<typeof logIssueSchema>) => {
    try {
      console.log(values)
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <Flex gap={'middle'}>
      <div>View Evidence</div>
      <LucideTriangleAlert
        className="cursor-pointer"
        onClick={() => setIsModalOpen(true)}
      />
      <Modal
        centered
        title="Report Issue"
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
      >
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="What is your issue?" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="detail"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Detail</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Please describe your issue"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Submit</Button>
          </form>
        </Form>
      </Modal>
    </Flex>
  )
}

export default ReportForm
