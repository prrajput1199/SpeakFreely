import Image from 'next/image'
import React from 'react'
import DashBoardImg from "../../../public/DashBoard.png"
import Link from 'next/link'
import { Button } from '../ui/button'
import { ArrowRight } from 'lucide-react'
import AnimatedSection from '../animatedsections/AnimatedSection'

const Hero = () => {
    return (
        <section className="relative overflow-hidden px-4 py-12 md:py-24 lg:py-32 bg-gradient-to-b from-background to-muted ">
            
            <div className="container flex flex-col items-center text-center space-y-8">
                <AnimatedSection animation='fade-right' >
                    <div className="inline-block rounded-full bg-muted px-3 py-1 text-sm">Honest Feedback Made Simple</div>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter max-w-3xl">
                        Collect Anonymous Feedback That Actually Matters
                    </h1>
                </AnimatedSection>

                <AnimatedSection animation='fade-left' delay={0.6}>
                    <p className="text-muted-foreground text-lg md:text-xl max-w-2xl">
                        Create a culture of open communication and continuous improvement with our anonymous feedback platform.
                    </p>
                    <div className="flex flex-col mt-8 sm:flex-row justify-center gap-4">
                        <Link href="/sign-up">
                            <Button size="lg" className="px-8">
                                Start for Free
                                <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>
                        </Link>
                        <Link href="#how-it-works">
                            <Button size="lg" variant="outline" className="px-8">
                                See How It Works
                            </Button>
                        </Link>
                    </div>
                </AnimatedSection>

                <AnimatedSection animation='fade-up' delay={0.6}>
                    <div className="relative w-full max-w-4xl mt-0 md:mt-12 rounded-lg overflow-hidden shadow-2xl">
                        <Image
                            src={DashBoardImg}
                            width={1280}
                            height={720}
                            alt="SpeakFreely dashboard preview"
                            className="w-full h-auto"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
                    </div>
                </AnimatedSection>

            </div>
        </section>
    )
}

export default Hero