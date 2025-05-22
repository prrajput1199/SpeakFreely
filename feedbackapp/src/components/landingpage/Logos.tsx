import Image from 'next/image'
import React from 'react'
import snapchat from "../../../public/snapchat-logo.svg"
import BMW from "../../../public/bmw-logo.svg"
import etherum from "../../../public/ethereum-logo.svg"
import xbox from "../../../public/xbox-one-logo.svg"
import slack from "../../../public/slack-logo.svg"
import AnimatedSection from '../animatedsections/AnimatedSection'

const Logos = () => {
    const images = [snapchat, BMW, etherum, xbox, slack];
    return (
        <section className="py-12 border-y bg-muted/50">
            <div className="container">
                <p className="text-center text-muted-foreground mb-8">Trusted by innovative teams worldwide</p>
                <AnimatedSection animation="Zoom-in" delay={0.6}>
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 items-center justify-items-center">
                        {images.map((el, index) => (
                            <Image
                                key={index}
                                src={el}
                                width={80}
                                height={40}
                                alt={`Company logo ${index}`}
                                className="opacity-70 hover:opacity-100 transition-opacity"
                            />
                        ))}
                    </div>
                </AnimatedSection>
            </div>
        </section>

    )
}

export default Logos