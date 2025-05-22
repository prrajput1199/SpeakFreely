'use client'

import React from 'react'
import { signOut, useSession } from "next-auth/react"
import { User } from 'next-auth';
import { Button } from './ui/button';
import Link from 'next/link';

const Navbar = () => {

    const { data: session } = useSession();

    const User = session?.user as User;

    return (
        <nav>
            <div>
                <a href="#">Speak Freely</a>
                {
                    session ?
                        (
                            <>
                                <span className='mr-4'> Welcome , {User.username || User.email}</span>
                                <Button onClick={() => signOut()}></Button>
                            </>
                        ) :
                        (
                            <Link href="/sign-in">
                                <Button className='w-full md:w-auto hover:cursor-pointer'>Log in</Button>
                            </Link>
                        )
                }
            </div>
        </nav>
    )
}

export default Navbar