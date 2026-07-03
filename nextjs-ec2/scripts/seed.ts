import { eq } from 'drizzle-orm'
import { db } from '@/lib/db'
import { users } from '@/lib/db/schema'

// deploy.sh가 INITIAL_ADMIN_* 시크릿이 있을 때 `pnpm db:seed`로 호출한다.
// 여기서는 초기 관리자 계정을 멱등적으로 생성한다(이미 있으면 스킵).
async function seed() {
  const email = process.env.INITIAL_ADMIN_EMAIL
  const password = process.env.INITIAL_ADMIN_PASSWORD
  const name = process.env.INITIAL_ADMIN_NAME ?? 'Admin'

  if (!email || !password) {
    console.log('[seed] INITIAL_ADMIN_EMAIL/PASSWORD 없음 — 스킵')
    return
  }

  const [existing] = await db.select().from(users).where(eq(users.email, email)).limit(1)
  if (existing) {
    console.log(`[seed] ${email} 이미 존재 — 스킵`)
    return
  }

  // TODO: bcrypt.hash(password, 10)로 교체
  await db.insert(users).values({ email, name, passwordHash: password })
  console.log(`[seed] 관리자 생성: ${email}`)
}

seed()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error('[seed] 실패', err)
    process.exit(1)
  })
