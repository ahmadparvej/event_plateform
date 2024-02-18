import Link from '@/node_modules/next/link'
import Image from '@/node_modules/next/image'
import React from 'react'

const Footer = () => {
  return (
    <footer className='border-t '>
      <div className="flex-center wrapper flex-between flex fledx-col gap-4 p-5 text-center sm:flex-row">
        <Link href="/">
          <Image src="/assets/images/logo.svg" alt="logo" width={128} height={38} />
        </Link>
        <p> 2024 Evently. All Right reserved.</p>
      </div>
    </footer>
  )
}

export default Footer