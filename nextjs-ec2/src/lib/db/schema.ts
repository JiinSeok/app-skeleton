import { pgTable, serial, text, timestamp, uniqueIndex } from 'drizzle-orm/pg-core'

// 최소 예시 스키마. 실제 도메인에 맞게 교체한다.
// `pnpm db:push`가 이 스키마를 대상 DB에 반영한다(deploy.sh의 migrate 단계).
export const users = pgTable(
  'users',
  {
    id: serial('id').primaryKey(),
    email: text('email').notNull(),
    name: text('name'),
    passwordHash: text('password_hash'),
    createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  },
  (table) => ({
    emailIdx: uniqueIndex('users_email_idx').on(table.email),
  }),
)
