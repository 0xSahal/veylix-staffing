import { createClient } from 'next-sanity'

import { apiVersion, dataset, projectId } from '@/sanity/env'

export const sanityClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: process.env.NODE_ENV === 'production',
  token: process.env.SANITY_API_TOKEN,
  // Without this, authenticated requests can return both draft and published
  // documents for the same post (duplicate cards on the site).
  perspective: 'published',
})
