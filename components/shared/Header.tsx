import Image from '@/node_modules/next/image'
import Link from '@/node_modules/next/link'
import { SignedOut, UserButton, SignedIn } from "@clerk/nextjs"
import React from 'react'
import { Button } from '@/components/ui/button';
import NavItems from './NavItems';
import MobileNav from './MobileNav';

const Header = () => {
  return (
    <header className='w-full border-b'>
      <div className='wrapper flex item-center justify-between'>
        <Link href='/' className='w-36'>
          <Image src='/assets/images/logo.svg' width={128} height={38} alt="Evently logo"/>
        </Link>
        <SignedIn>
          <nav className='md:flex-between hidden w-full max-w-xs'>
            <NavItems/>
          </nav>
        </SignedIn>
        <div className='flex w-32 justify-end gap-3'>
          <SignedIn>
            <UserButton afterSignOutUrl="/" />
            <MobileNav/>
          </SignedIn>
          <SignedOut>
            <Button asChild className="rounded-full" size="lg">
              <Link href="/sign-in">Login</Link>
            </Button>
          </SignedOut>
        </div>
      </div>
    </header>
  )
}

export default Header