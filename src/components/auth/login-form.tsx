'use client'

import { useState, FormEvent } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/lib/auth-context'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

type Props = {
  className?: string
  actionClass: string
  mutedClass: string
  linkClass?: string
}

export function LoginForm({ className, actionClass, mutedClass, linkClass = 'text-primary' }: Props) {
  const { login, isLoading } = useAuth()
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (!email.trim() || !password) return
    await login(email.trim(), password)
    router.push('/')
    router.refresh()
  }

  return (
    <form onSubmit={onSubmit} className={className}>
      <div className="grid gap-2">
        <Label htmlFor="login-email">Email</Label>
        <Input
          id="login-email"
          name="email"
          type="email"
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="h-12"
          placeholder="you@example.com"
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="login-password">Password</Label>
        <Input
          id="login-password"
          name="password"
          type="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="h-12"
          placeholder="••••••••"
        />
      </div>
      <Button
        type="submit"
        disabled={isLoading}
        className={`h-12 w-full rounded-md font-semibold text-base ${actionClass}`}
      >
        {isLoading ? 'Logging in…' : 'Login'}
      </Button>
      <p className={`text-center text-sm ${mutedClass}`}>
        We store your session on this device after a successful login.
      </p>
      <div className={`flex items-center justify-between text-sm ${mutedClass}`}>
        <Link href="/forgot-password" className={`hover:underline ${linkClass}`}>
          Forgot password?
        </Link>
        <Link href="/register" className={`font-semibold hover:underline ${linkClass}`}>
          Register
        </Link>
      </div>
    </form>
  )
}
