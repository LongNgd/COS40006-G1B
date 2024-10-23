import { z } from 'zod'

export const logIssueSchema = z
  .object({
    title: z
      .string()
      .min(1, 'Title is required')
      .max(50, 'Title must be less than 50 characters'),
    detail: z
      .string()
      .min(1, 'Detail is required')
      .max(100, 'Detail must be less than 100 characters'),
  })
  .required()
