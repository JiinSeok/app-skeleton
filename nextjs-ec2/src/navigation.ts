'use client'

import { usePathname, useRouter } from 'next/navigation'
import Link from 'next/link'

// Simple redirect function to replace next-intl's redirect
const redirect = (path: string) => {
  window.location.href = path
}

export { Link, redirect, usePathname, useRouter }
