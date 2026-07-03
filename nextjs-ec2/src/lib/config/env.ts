import { z } from 'zod'

// 배포 시 compose.yml → deploy.sh가 주입하는 런타임 환경변수 계약.
const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  DATABASE_URL: z.string().url(),
  AUTH_SECRET: z.string().min(1),
  AUTH_URL: z.string().url().optional(),
  AUTH_TRUST_HOST: z.string().optional(),
  AWS_REGION: z.string().default('ap-northeast-2'),
  S3_BUCKET: z.string().optional(),
})

type Env = z.infer<typeof envSchema>

// import 시점(=next build의 page data 수집)에는 검증하지 않는다. 빌드에는 시크릿이 없고
// 런타임에만 존재하기 때문이다. 대신 처음 프로퍼티를 읽을 때 한 번 검증한다(런타임 fail-fast).
let cached: Env | undefined

function getEnv(): Env {
  if (!cached) cached = envSchema.parse(process.env)
  return cached
}

export const env = new Proxy({} as Env, {
  get(_target, prop: string) {
    return getEnv()[prop as keyof Env]
  },
})
