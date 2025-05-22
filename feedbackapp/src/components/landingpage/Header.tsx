import { Menu, MessageSquare, X } from 'lucide-react'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { Button } from '../ui/button'
import AnimatedSection from '../animatedsections/AnimatedSection'

const Header = () => {
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

                            <div className="mt-8 space-y-4">
                                <Link href="/login" className="block w-full">
                                    <Button variant="outline" className="transition-all duration-300 hover:shadow-md">
                                        Log in
                                    </Button>
                                </Link>
                                <Link href="/signup" className="block w-full">
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

        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <AnimatedSection animation="fade-left">
                <div className="container flex h-16 items-center justify-between">
                    <div className="flex items-center gap-2">
                        <MessageSquare className="h-6 w-6 text-primary" />
                        <span className="text-xl font-bold">SpeakFreely</span>
                    </div>

                    <nav className="hidden lg:flex gap-6">
                        <Link href="#features" className="text-sm font-medium hover:text-primary transition-colors relative group">
                            Features
                            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
                        </Link>
                        <Link
                            href="#how-it-works"
                            className="text-sm font-medium hover:text-primary transition-colors relative group"
                        >
                            How It Works
                            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
                        </Link>
                        <Link
                            href="#testimonials"
                            className="text-sm font-medium hover:text-primary transition-colors relative group"
                        >
                            Testimonials
                            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
                        </Link>
                        <Link href="#pricing" className="text-sm font-medium hover:text-primary transition-colors relative group">
                            Pricing
                            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
                        </Link>
                        <Link href="#faq" className="text-sm font-medium hover:text-primary transition-colors relative group">
                            FAQ
                            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
                        </Link>
                    </nav>

                    <div className='overflow-y-hidden'>
                        <MobileNav />
                    </div>


                    <div className="hidden md:flex gap-4">
                        <Link href="/sign-in">
                            <Button variant="outline">Log in</Button>
                        </Link>
                        <Link href="/sign-up">
                            <Button>Get Started</Button>
                        </Link>
                    </div>
                </div>
            </AnimatedSection>
        </header>

    )
}

export default Header