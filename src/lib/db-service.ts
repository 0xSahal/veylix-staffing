import type {
  CandidateApplication,
  ContactSubmission,
  JobOrder,
  NewsletterSubscriber,
} from '@/lib/db-types'
import { getDb } from '@/lib/mongodb'

type InsertContactData = Omit<ContactSubmission, '_id' | 'createdAt' | 'updatedAt'>
type InsertJobOrderData = Omit<JobOrder, '_id' | 'createdAt' | 'updatedAt'>
type InsertApplicationData = Omit<CandidateApplication, '_id' | 'createdAt' | 'updatedAt'>
type InsertNewsletterData = Omit<
  NewsletterSubscriber,
  '_id' | 'createdAt' | 'updatedAt' | 'subscribedAt'
>

export async function saveContactSubmission(data: InsertContactData): Promise<string> {
  try {
    const db = await getDb()
    const now = new Date()
    const doc: Omit<ContactSubmission, '_id'> = {
      ...data,
      createdAt: now,
      updatedAt: now,
    }
    const result = await db.collection('contact_submissions').insertOne(doc)
    return result.insertedId.toString()
  } catch (error) {
    throw new Error(
      `Failed to save contact submission: ${error instanceof Error ? error.message : String(error)}`
    )
  }
}

export async function saveJobOrder(data: InsertJobOrderData): Promise<string> {
  try {
    const db = await getDb()
    const now = new Date()
    const doc: Omit<JobOrder, '_id'> = {
      ...data,
      createdAt: now,
      updatedAt: now,
    }
    const result = await db.collection('job_orders').insertOne(doc)
    return result.insertedId.toString()
  } catch (error) {
    throw new Error(
      `Failed to save job order: ${error instanceof Error ? error.message : String(error)}`
    )
  }
}

export async function saveCandidateApplication(
  data: InsertApplicationData
): Promise<string> {
  try {
    const db = await getDb()
    const now = new Date()
    const doc: Omit<CandidateApplication, '_id'> = {
      ...data,
      createdAt: now,
      updatedAt: now,
    }
    const result = await db.collection('candidate_applications').insertOne(doc)
    return result.insertedId.toString()
  } catch (error) {
    throw new Error(
      `Failed to save candidate application: ${error instanceof Error ? error.message : String(error)}`
    )
  }
}

export async function saveNewsletterSubscriber(
  data: InsertNewsletterData
): Promise<string> {
  try {
    const db = await getDb()
    const existing = await db
      .collection('newsletter_subscribers')
      .findOne({ email: data.email })
    if (existing?._id) {
      return existing._id.toString()
    }
    const now = new Date()
    const doc: Omit<NewsletterSubscriber, '_id'> = {
      ...data,
      subscribedAt: now,
      createdAt: now,
      updatedAt: now,
    }
    const result = await db.collection('newsletter_subscribers').insertOne(doc)
    return result.insertedId.toString()
  } catch (error) {
    throw new Error(
      `Failed to save newsletter subscriber: ${error instanceof Error ? error.message : String(error)}`
    )
  }
}
