"use client"
import Link from '@/node_modules/next/link';
import { usePathname } from '@/node_modules/next/navigation';
import React from 'react'
import { headerLinks } from './../../constants/index';

const NavItems = () => {
  const pathname = usePathname();
  return (
    <ul className='md:flex-between flex w-full flex-col item-start gap-5 md:flex-row'>
      {headerLinks.map((link)=>{
        const isActive = pathname ===link.route;
        return (
          <li key={link.route} className={`${isActive && 'text-primary-500'} `}>
            <Link href={link.route}>{link.label}</Link>
          </li>
        )
      })}
    </ul>
  )
}

export default NavItems;