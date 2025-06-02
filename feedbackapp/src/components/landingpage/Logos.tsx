'use client'

import Image from 'next/image'
import React from 'react'
import snapchat from "../../../public/snapchat-logo.svg"
import BMW from "../../../public/bmw-logo.svg"
import etherum from "../../../public/ethereum-logo.svg"
import xbox from "../../../public/xbox-one-logo.svg"
import slack from "../../../public/slack-logo.svg"
import AnimatedSection from '../animatedsections/AnimatedSection'
import { useTheme } from 'next-themes'

const Logos = () => {
    const { theme } = useTheme()
    const images = [snapchat, BMW, etherum, xbox, slack];
    return (
        <section className={`py-12 ${theme ==="light" ? "blue-to-white-bottom" : "blue-to-black-45deg"}`}>
            <div className="container">
                <p className="text-center text-muted-foreground-800 mb-8 text-">Trusted by innovative teams worldwide</p>
                <AnimatedSection animation="fade-left" delay={0.6}>
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 items-center justify-items-center">
                        {images.map((el, index) => (
                            <Image
                                key={index}
                                src={el}
                                width={80}
                                height={40}
                                alt={`Company logo ${ index } `}
                                className="opacity-70 hover:opacity-100 transition-opacity text-white"
                            />
                        ))}
                    </div>
                </AnimatedSection>
            </div>
        </section>

    )
}

export default Logos