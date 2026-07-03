import { drizzle } from 'drizzle-orm/node-postgres'
import { Pool } from 'pg'
import { env } from '@/lib/config/env'
import * as schema from '@/lib/db/schema'

// compose.yml이 DATABASE_URL을 postgres://dingcog... 형태로 주입한다.
const pool = new Pool({ connectionString: env.DATABASE_URL })

export const db = drizzle(pool, { schema })
