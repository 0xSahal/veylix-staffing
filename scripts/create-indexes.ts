import clientPromise from '../src/lib/mongodb'

async function createIndexes(): Promise<void> {
  const client = await clientPromise
  const db = client.db('veylix')

  await db
    .collection('contact_submissions')
    .createIndexes([{ key: { email: 1 } }, { key: { createdAt: -1 } }])

  await db
    .collection('job_orders')
    .createIndexes([
      { key: { orderId: 1 }, unique: true },
      { key: { contactEmail: 1 } },
      { key: { createdAt: -1 } },
      { key: { industry: 1 } },
    ])

  await db
    .collection('candidate_applications')
    .createIndexes([
      { key: { email: 1 } },
      { key: { createdAt: -1 } },
      { key: { specialization: 1 } },
      { key: { totalExperience: 1 } },
    ])

  await db
    .collection('newsletter_subscribers')
    .createIndexes([{ key: { email: 1 }, unique: true }, { key: { subscribedAt: -1 } }])

  console.log('All indexes created successfully.')
  process.exit(0)
}

createIndexes().catch((err: unknown) => {
  console.error('Index creation failed:', err)
  process.exit(1)
})
