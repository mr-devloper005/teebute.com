'use client'

import Link from 'next/link'
import { LogOut, Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { useAuth } from '@/lib/auth-context'

type NavbarAuthControlsProps = {
  sellHref?: string
}

export function NavbarAuthControls({ sellHref = '/create/classified' }: NavbarAuthControlsProps) {
  const { user, logout } = useAuth()

  return (
    <>
      <Link
        href={sellHref}
        className="hidden items-center gap-1 rounded-full border-[3px] border-transparent bg-white px-2.5 py-1.5 text-sm font-extrabold text-[#002f34] [background:linear-gradient(white,white)_padding-box,linear-gradient(100deg,#ffd000,#3a77ff,#23e5db)_border-box] sm:inline-flex sm:px-3"
      >
        <Plus className="h-4 w-4" />
        SELL
      </Link>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="h-9 rounded-full text-[#002f34] hover:bg-[#f2f4f5]">
            <Avatar className="h-8 w-8 border border-[#e0e0e0]">
              <AvatarImage src={user?.avatar} alt={user?.name} />
              <AvatarFallback className="bg-[#3a77ff] text-white">{user?.name?.charAt(0)}</AvatarFallback>
            </Avatar>
            <span className="sr-only">Account</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          <div className="flex items-center gap-3 p-3">
            <Avatar className="h-9 w-9 border border-[#e0e0e0]">
              <AvatarImage src={user?.avatar} alt={user?.name} />
              <AvatarFallback className="bg-[#3a77ff] text-white text-sm">{user?.name?.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="min-w-0 flex flex-col">
              <span className="truncate text-sm font-medium">{user?.name}</span>
              <span className="truncate text-xs text-[#406367]">{user?.email}</span>
            </div>
          </div>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={logout} className="cursor-pointer text-destructive focus:text-destructive">
            <LogOut className="mr-2 h-4 w-4" />
            Sign out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  )
}
