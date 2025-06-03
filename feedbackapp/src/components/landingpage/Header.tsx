'use client'

import { Menu, MessageSquare, Moon, Sun, X } from 'lucide-react'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { Button } from '../ui/button'
import AnimatedSection from '../animatedsections/AnimatedSection'
import { useTheme } from 'next-themes';

const Header = () => {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => setMounted(true), []);

    if (!mounted) return null;

    function MobileNav() {
        const [isOpen, setIsOpen] = useState(false)

        useEffect(() => {
            if (isOpen) {
                document.body.style.overflowY = 'hidden';
            } else {
                document.body.style.overflowY = 'unset';
            }

            return () => {
                document.body.style.overflowY = 'unset';
            };
        }, [isOpen]);

        return (

            <div className="md:hidden">
                <Button variant="ghost" size="icon" onClick={() => setIsOpen(true)}>
                    <Menu className="h-6 w-6" />
                    <span className="sr-only">Open menu</span>
                </Button>

                {isOpen && (
                    <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm">
                        <div className="fixed h-screen z-50 right-0 w-full bg-background p-6 shadow-lg flex flex-col justify-between overflow-y-hidden">
                            <div>
                                <div className="flex items-center justify-between mb-8">
                                    <div className="flex items-center gap-2">
                                        <MessageSquare className="h-6 w-6 text-primary" />
                                        <span className="text-xl font-bold">SpeakFreely</span>
                                    </div>
                                    <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
                                        <X className="h-6 w-6" />
                                        <span className="sr-only">Close menu</span>
                                    </Button>
                                </div>


                                <nav className="flex flex-col gap-6 z-10">
                                    <Link
                                        href="#features"
                                        className="text-lg font-medium hover:text-primary transition-colors"
                                        onClick={() => setIsOpen(false)}
                                    >
                                        Features
                                    </Link>
                                    <Link
                                        href="#how-it-works"
                                        className="text-lg font-medium hover:text-primary transition-colors"
                                        onClick={() => setIsOpen(false)}
                                    >
                                        How It Works
                                    </Link>
                                    <Link
                                        href="#testimonials"
                                        className="text-lg font-medium hover:text-primary transition-colors"
                                        onClick={() => setIsOpen(false)}
                                    >
                                        Testimonials
                                    </Link>
                                    <Link
                                        href="#pricing"
                                        className="text-lg font-medium hover:text-primary transition-colors"
                                        onClick={() => setIsOpen(false)}
                                    >
                                        Pricing
                                    </Link>
                                    <Link
                                        href="#faq"
                                        className="text-lg font-medium hover:text-primary transition-colors"
                                        onClick={() => setIsOpen(false)}
                                    >
                                        FAQ
                                    </Link>
                                </nav>
                            </div>

                            <div className="mt-8 mb-12 space-y-4">
                                <Link href="/sign-in" className="block w-full">
                                    <Button variant="outline" className="transition-all duration-300 hover:shadow-md">
                                        Log in
                                    </Button>
                                </Link>
                                <Link href="/sign-up" className="block w-full">
                                    <Button className="w-full">Get Started</Button>
                                </Link>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        )
    }
    return (

        <header className={`fixed top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 ${theme === "light" ? "blue-to-white-right" : "blue-to-black-45deg"}`}>
            <AnimatedSection animation="fade-left">
                <div className="container flex h-16 items-center justify-between">
                    <div className="flex items-center gap-2">
                        <MessageSquare className={`h-6 w-6 ${theme === "light" ? "text-primary " : "text-white"}`} />
                        <span className="text-xl font-bold">SpeakFreely</span>
                    </div>

                    <nav className="hidden lg:flex gap-6">
                        <Link href="#features" className="text-sm font-medium hover:text-white transition-colors relative group">
                            Features
                            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
                        </Link>
                        <Link
                            href="#how-it-works"
                            className="text-sm font-medium hover:text-white transition-colors relative group"
                        >
                            How It Works
                            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
                        </Link>
                        <Link
                            href="#testimonials"
                            className="text-sm font-medium hover:text-white transition-colors relative group"
                        >
                            Testimonials
                            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
                        </Link>
                        <Link href="#pricing" className="text-sm font-medium hover:text-white transition-colors relative group">
                            Pricing
                            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
                        </Link>
                        <Link href="#faq" className="text-sm font-medium hover:text-white transition-colors relative group">
                            FAQ
                            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
                        </Link>
                    </nav>

                    <div className='flex items-center gap-2'>
                        <button
                            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                            className="py-2 rounded lg:hidden"
                        >
                            {theme === 'dark' ? <Sun /> : <Moon />}
                        </button>

                        <div className='overflow-y-hidden'>
                            <MobileNav />
                        </div>

                    </div>


                    <div className="hidden md:flex gap-4">
                        <button
                            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                            className="px-4 py-2 rounded"
                        >
                            {theme === 'dark' ? <Sun /> : <Moon />}
                        </button>
                        <Link href="/sign-in">
                            <Button className={` ${theme === "light" ? "border border-black text-black bg-white hover:bg-black hover:text-white" : "border text-black bg-white hover:bg-black hover:text-white hover:border-white"}`}>Log in</Button>
                        </Link>
                        <Link href="/sign-up">
                            <Button className={`bg-dark-navy-blue text-white`}>Get Started</Button>
                        </Link>
                    </div>
                </div>
            </AnimatedSection>
        </header>

    )
}

export default Header