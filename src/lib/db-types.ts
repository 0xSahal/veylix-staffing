import type { ObjectId } from 'mongodb'

export interface ContactSubmission {
  _id?: ObjectId
  fullName: string
  email: string
  phone?: string
  subject: string
  message: string
  createdAt: Date
  updatedAt: Date
}

export interface JobOrder {
  _id?: ObjectId
  orderId: string
  companyName: string
  industry: string
  companySize: string
  companyWebsite?: string
  contactName: string
  contactEmail: string
  contactPhone: string
  contactTitle: string
  contactMethod: string
  jobTitle: string
  engagementType: string
  specialisation: string
  numberOfOpenings: string
  location: string
  salaryRange?: string
  jobDescription?: string
  startDate?: string
  additionalNotes?: string
  createdAt: Date
  updatedAt: Date
}

export interface CandidateApplication {
  _id?: ObjectId
  firstName: string
  lastName: string
  email: string
  phone: string
  city: string
  state: string
  linkedinUrl?: string
  currentJobTitle: string
  totalExperience: string
  desiredWorkStatus: string[]
  desiredLocation?: string
  expectedSalary?: string
  skills?: string
  specialization: string
  coverNote?: string
  resumeFileName?: string
  resumeFileSize?: number
  createdAt: Date
  updatedAt: Date
}

export interface NewsletterSubscriber {
  _id?: ObjectId
  email: string
  subscribedAt: Date
  createdAt: Date
  updatedAt: Date
}
