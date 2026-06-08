import { z } from 'zod'

export const INDUSTRIES = [
  'Technology',
  'Healthcare',
  'Manufacturing',
  'Finance',
  'Retail',
  'Education',
  'Media',
  'Construction',
  'Transportation',
  'Agriculture',
  'Energy',
  'Legal',
  'Other',
] as const

export const COMPANY_SIZES = ['1-10', '11-50', '51-200', '201-500', '500+'] as const

export const SPECIALISATIONS = [
  'IT',
  'Healthcare',
  'Professional',
  'Engineering',
  'Digital',
  'Government',
  'Financial',
  'Pharma',
  'Scientific',
  'Other',
] as const

export const STAFFING_TYPES = [
  'Direct Hire',
  'Contract Staffing',
  'Contract-to-Hire',
  'Part Time',
  'Temporary',
  'Executive Search',
] as const

export const OPENINGS = ['1–5', '5–20', '20–50', '50+'] as const

export const CONTACT_METHODS = ['Email', 'Phone', 'Either'] as const

const nameRegex = /^[a-zA-Z\s'-]+$/
const phoneRegex = /^[+]?[(]?[0-9]{1,4}[)]?[-\s./0-9]{6,15}$/

export const step1Schema = z.object({
  companyName: z
    .string()
    .min(2, 'Company name must be at least 2 characters')
    .max(100, 'Company name cannot exceed 100 characters'),
  industry: z.string().min(1, 'Please select an industry'),
  companySize: z.string().min(1, 'Please select company size'),
  companyWebsite: z
    .string()
    .optional()
    .refine(
      (val) => !val || /^https?:\/\/.+\..+/.test(val),
      'Please enter a valid URL starting with https://'
    ),
})

export const step2Schema = z.object({
  firstName: z
    .string()
    .min(2, 'First name must be at least 2 characters')
    .max(50, 'First name cannot exceed 50 characters')
    .regex(nameRegex, 'First name can only contain letters'),
  lastName: z
    .string()
    .min(2, 'Last name must be at least 2 characters')
    .max(50, 'Last name cannot exceed 50 characters')
    .regex(nameRegex, 'Last name can only contain letters'),
  jobTitle: z
    .string()
    .min(2, 'Job title must be at least 2 characters')
    .max(100, 'Job title cannot exceed 100 characters'),
  email: z
    .string()
    .min(1, 'Email is required')
    .email('Please enter a valid work email address'),
  phone: z
    .string()
    .min(7, 'Please enter a valid phone number')
    .max(20, 'Phone number cannot exceed 20 characters')
    .regex(phoneRegex, 'Please enter a valid phone number'),
  contactMethod: z.string().min(1, 'Please select a preferred contact method'),
})

export const step3Schema = z.object({
  specialisation: z.string().min(1, 'Please select a specialisation'),
  staffingType: z.string().min(1, 'Please select a staffing type'),
  numberOfOpenings: z.string().min(1, 'Please select the number of openings'),
  jobTitlesNeeded: z
    .string()
    .min(2, 'Job title must be at least 2 characters')
    .max(100, 'Job title cannot exceed 100 characters'),
  location: z
    .string()
    .min(2, 'Please enter the job location')
    .max(100, 'Location cannot exceed 100 characters'),
  targetStartDate: z.string().min(1, 'Please select a target start date'),
  jobDescription: z
    .string()
    .min(50, 'Please provide at least 50 characters describing the role')
    .max(2000, 'Job description cannot exceed 2000 characters'),
  additionalNotes: z.string().max(1000, 'Notes cannot exceed 1000 characters').optional(),
})

export const placeJobSchema = step1Schema
  .extend(step2Schema.shape)
  .extend(step3Schema.shape)

export type PlaceJobValues = z.infer<typeof placeJobSchema>

export const JOB_DESCRIPTION_MAX = 2000

export const STEP_FIELDS: Record<number, (keyof PlaceJobValues)[]> = {
  1: ['companyName', 'industry', 'companySize', 'companyWebsite'],
  2: ['firstName', 'lastName', 'jobTitle', 'email', 'phone', 'contactMethod'],
  3: [
    'specialisation',
    'staffingType',
    'numberOfOpenings',
    'jobTitlesNeeded',
    'location',
    'targetStartDate',
    'jobDescription',
    'additionalNotes',
  ],
}
