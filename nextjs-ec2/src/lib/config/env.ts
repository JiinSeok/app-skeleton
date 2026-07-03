import { z } from 'zod'

// 배포 시 compose.yml → deploy.sh가 주입하는 런타임 환경변수 계약.
// 빠뜨린 값이 있으면 부팅 시점에 바로 실패하게 한다(사일런트 실패 방지).
const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  DATABASE_URL: z.string().url(),
  AUTH_SECRET: z.string().min(1),
  AUTH_URL: z.string().url().optional(),
  AUTH_TRUST_HOST: z.string().optional(),
  AWS_REGION: z.string().default('ap-northeast-2'),
  S3_BUCKET: z.string().optional(),
})

export const env = envSchema.parse(process.env)
