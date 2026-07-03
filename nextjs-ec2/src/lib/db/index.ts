import { drizzle } from 'drizzle-orm/node-postgres'
import { Pool } from 'pg'
import * as schema from '@/lib/db/schema'

// compose.yml이 DATABASE_URL을 postgres://app...@postgres:5432/app 형태로 주입한다.
// Pool은 생성 시점에 연결하지 않고 첫 쿼리에서 연결하므로, build 중 모듈 평가는 안전하다.
// (env.ts의 즉시 검증을 피하려고 여기서는 process.env를 직접 읽는다.)
const pool = new Pool({ connectionString: process.env.DATABASE_URL })

export const db = drizzle(pool, { schema })
