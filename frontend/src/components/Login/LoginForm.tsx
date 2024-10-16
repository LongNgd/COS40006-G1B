/* eslint-disable @typescript-eslint/no-explicit-any */
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigate } from '@tanstack/react-router'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { message } from 'antd'
import { useAuth } from '../../hooks/useAuth.hook'
import { useLoginMutation } from '../../api/authApi'
import { Button } from '../ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../ui/card'
import { Checkbox } from '../ui/checkbox'
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
import { loginSchema } from './login.validation'

const LoginForm = () => {
  const [login, { isLoading }] = useLoginMutation()
  const navigate = useNavigate()
  const { signIn } = useAuth()

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const onSubmit = async (values: z.infer<typeof loginSchema>) => {
    try {
      const loginRes = await login(values)
      if (loginRes.error) {
        const error = loginRes.error as any
        message.error(error.data.message as string)
        return
      }
      const userInfo = (loginRes.data as any).user_info; // Use type assertion
      signIn(userInfo)
      navigate({ to: '/dashboard' })
      message.success('Welcome!')
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Card className="w-[500px]">
      <CardHeader>
        <CardTitle
          suffix={<img src="../src/assets/logo.png" alt="logo" width={100} />}
        >
          School Vision
        </CardTitle>
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
                    <Input
                      placeholder="a@gmail.com"
                      {...field}
                      disabled={isLoading}
                    />
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
                    <PasswordInput
                      placeholder="********"
                      {...field}
                      disabled={isLoading}
                    />
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
            <Button type="submit" disabled={isLoading}>
              Login
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}

export default LoginForm
