import { execSync } from 'node:child_process'

import { config } from 'dotenv'

config({ path: '.env', override: true })
config({ path: '.env.test', override: true })

beforeAll(async () => {
  execSync('npx prisma migrate reset --force --skip-seed')
})

beforeEach(async () => {
  execSync('npx prisma migrate reset --force --skip-seed')
})
