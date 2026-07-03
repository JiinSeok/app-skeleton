import { NextResponse } from 'next/server'

// 배포 스크립트(deploy/ec2/deploy.sh)가 이 엔드포인트의 200을 헬스체크로 기다린다.
// DB 연결까지 확인하고 싶으면 db import 후 `SELECT 1`을 여기서 실행하도록 확장.
export const dynamic = 'force-dynamic'

export function GET() {
  return NextResponse.json({ status: 'ok' }, { status: 200 })
}
