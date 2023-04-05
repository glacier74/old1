require('dotenv').config({
  path: require('path').resolve(__dirname, '..', '.env.production')
})

const ioredis = require('ioredis')
const redis = new ioredis()

const NEXT_AIRTABLE_BASE_ID = process.env.NEXT_AIRTABLE_BASE_ID
const NEXT_AIRTABLE_COLLECTION_ID = process.env.NEXT_AIRTABLE_COLLECTION_ID

async function save(key, value) {
  await redis.set(key, JSON.stringify(value))
}

async function main() {
  await save(
    `airtable:${NEXT_AIRTABLE_BASE_ID}:${NEXT_AIRTABLE_COLLECTION_ID}`,
    require('./collection.json')
  )
  await redis.disconnect()
}

main()
