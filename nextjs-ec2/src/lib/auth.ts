import { eq } from 'drizzle-orm'
import NextAuth from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import { db } from '@/lib/db'
import { users } from '@/lib/db/schema'

// Auth.js v5 최소 배선. AUTH_SECRET/AUTH_URL/AUTH_TRUST_HOST는 env 계약(env.ts) 참고.
// 실제 비밀번호 검증(bcrypt 등)은 도메인에 맞게 채운다.
export const { handlers, auth, signIn, signOut } = NextAuth({
  trustHost: true,
  providers: [
    Credentials({
      credentials: { email: {}, password: {} },
      async authorize(credentials) {
        const email = credentials?.email
        if (typeof email !== 'string') return null

        const [user] = await db.select().from(users).where(eq(users.email, email)).limit(1)
        if (!user) return null

        // TODO: bcrypt.compare(credentials.password, user.passwordHash)
        return { id: String(user.id), email: user.email, name: user.name ?? undefined }
      },
    }),
  ],
})
