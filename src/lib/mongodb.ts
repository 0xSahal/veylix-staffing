// DEPLOYMENT CHECKLIST:
// 1. Add MONGODB_URI to Vercel → Settings → Environment Variables
// 2. Add MONGODB_URI to .env.local for local development
// 3. Run `npm run db:indexes` once after first deployment to create indexes
// 4. In MongoDB Atlas → Network Access, ensure 0.0.0.0/0 is whitelisted
//    (Vercel uses dynamic IPs so a blanket allow is required for the free tier)

import dns from 'node:dns'

import { MongoClient, type Db } from 'mongodb'

// Some home routers refuse SRV DNS queries that Node.js uses for mongodb+srv URIs.
// Public DNS servers resolve Atlas SRV records reliably during local development.
if (process.env.NODE_ENV === 'development') {
  dns.setServers(['8.8.8.8', '8.8.4.4', '1.1.1.1'])
}

const uri = process.env.MONGODB_URI

if (!uri) {
  throw new Error('Missing MONGODB_URI environment variable')
}

let client: MongoClient
let clientPromise: Promise<MongoClient>

declare global {
  var _mongoClientPromise: Promise<MongoClient> | undefined
}

if (process.env.NODE_ENV === 'development') {
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri)
    global._mongoClientPromise = client.connect()
  }
  clientPromise = global._mongoClientPromise
} else {
  client = new MongoClient(uri)
  clientPromise = client.connect()
}

export default clientPromise

export async function getDb(): Promise<Db> {
  const connectedClient = await clientPromise
  return connectedClient.db('veylix')
}
