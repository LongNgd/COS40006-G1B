import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigate } from '@tanstack/react-router'
import { z } from 'zod'

import { loginSchema } from './login.validation'
import { useAuth } from '../../hooks/useAuth.hook'
import { LucideActivitySquare } from 'lucide-react'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../ui/card'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form'
import { Input } from '../ui/input'
import { PasswordInput } from '../ui/password-input'
import { Checkbox } from '../ui/checkbox'
import { Button } from '../ui/button'

const LoginForm = () => {
  const navigate = useNavigate()
  const { signIn } = useAuth()

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const onSubmit = (values: z.infer<typeof loginSchema>) => {
    signIn()
    navigate({ to: '/dashboard' })
    console.log(values)
  }

  return (
    <Card className="w-[500px]">
      <CardHeader>
        <CardTitle suffix={<LucideActivitySquare />}>Visualization Tool</CardTitle>
        <CardDescription>
          Please sign-in to your account and start the adventure
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="a@gmail.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <PasswordInput placeholder="********" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-between">
              <FormItem>
                <FormControl>
                  <Checkbox />
                </FormControl>
                <FormLabel>Remember me</FormLabel>
              </FormItem>
              <a href="" className="text-primary">
                Forgot password?
              </a>
            </div>
            <Button type="submit">Login</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}

export default LoginForm
