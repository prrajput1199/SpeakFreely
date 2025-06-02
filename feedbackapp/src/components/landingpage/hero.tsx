'use client'

import Image from 'next/image'
import DashBoardImg from "../../../public/DashBoard_latest.png"
import DashBoardImgDark from "../../../public/Dashboard_dark.png"
import Link from 'next/link'
import { Button } from '../ui/button'
import { ArrowRight } from 'lucide-react'
import AnimatedSection from '../animatedsections/AnimatedSection'
import { useTheme } from 'next-themes'

const Hero = () => {
    const { theme } = useTheme()
 

    return (
        <section className={`relative overflow-hidden px-4 py-24 lg:py-32 ${theme === "light" ? "blue-to-white-bottom" : "blue-to-black-45deg"}`}>
            <div className={`hidden md:block  absolute w-[895px] h-[1145px] left-[-553px] top-0 blur-[435px] ${theme === "light" ? "gradient-bg" : "bg-navy-blue-light"}`}></div>
            <div className={`idden md:block absolute w-[895px] h-[1145px] right-[-553px] top-0 blur-[435px] ${theme === "light" ? "gradient-bg" : "bg-navy-blue-light"}`}></div>
            <div className="container flex flex-col items-center text-center space-y-8">
                <AnimatedSection animation='fade-right' >
                    <div className="inline-block rounded-full bg-muted px-3 py-1 text-sm">Honest Feedback Made Simple</div>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter max-w-3xl mt-4">
                        Collect <span className='color-dark-navy-blue'>Anonymous Feedback</span> <br />That Actually Matters
                    </h1>
                </AnimatedSection>

                <AnimatedSection animation='fade-left' delay={0.6}>
                    <p className="text-muted-foreground text-lg md:text-xl max-w-2xl dark:text-[#F5F5F5]">
                        Create a culture of open communication and continuous improvement with our anonymous feedback platform.
                    </p>
                    <div className="flex flex-col mt-8 sm:flex-row justify-center gap-4">
                        <Link href="/sign-up">
                            <Button size="lg" className="px-8 bg-dark-navy-blue ">
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

                <AnimatedSection animation='Zoom-in' delay={0.6}>
                    <div className={`relative w-full max-w-4xl mt-0 md:mt-12 rounded-lg overflow-hidden shadow-2xl ${theme === "light" ? "shadow-[0px_4px_80px_rgba(50,133,255,0.2)]" : "shadow-[0px_4px_80px_rgba(50,133,255,0.6)]"}`}>
                        <Image
                            src={theme === "light" ? DashBoardImg : DashBoardImgDark}
                            // width={1274}
                            // height={621}
                            alt="SpeakFreely dashboard preview"
                            className="w-full h-auto rounded-lg "
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
                    </div>
                </AnimatedSection>

            </div>
        </section>
    )
}

export default Hero