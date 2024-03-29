"use client"
import React from 'react'
import Image from 'next/image';
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { Separator } from "@/components/ui/separator"
import NavItems from './NavItems';

const MobileNav = () => {
    return (
        <div className='md:hidden'>
            <Sheet>
                <SheetTrigger className="align-middle">
                    <Image src="/assets/icons/menu.svg" alt="menu" width={24} height={24} />
                </SheetTrigger>
                <SheetContent className="flex flex-col gap-6 bg-white md:hidden">
                    <Image src="/assets/images/logo.svg" alt="logo" width={128} height={38} />
                    <Separator />
                    <NavItems />
                </SheetContent>
            </Sheet>
        </div>
    )
}

export default MobileNav;