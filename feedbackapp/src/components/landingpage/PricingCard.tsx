import Link from 'next/link'
import React from 'react'
import { Button } from '../ui/button'
import { CheckCircle2 } from 'lucide-react'

interface priceCardProps {
    title: string,
    price: string,
    period: string,
    description: string,
    features: string[],
    buttonText: string,
    popular: boolean
}

const PricingCard = ({ title, price, period, description, features, buttonText, popular }: priceCardProps) => {
    return (
        <div
            className={`bg-background rounded-lg p-6 shadow-sm border relative ${popular ? "border-primary shadow-md ring-1 ring-primary" : ""}`}
        >
            {popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-primary text-primary-foreground text-xs font-medium py-1 px-3 rounded-full">
                    Most Popular
                </div>
            )}
            <div className="text-center mb-6">
                <h3 className="text-xl font-medium mb-2">{title}</h3>
                <div className="flex items-end justify-center gap-1">
                    <span className="text-3xl font-bold">{price}</span>
                    {period && <span className="text-muted-foreground">{period}</span>}
                </div>
                <p className="text-muted-foreground mt-2">{description}</p>
            </div>
            <ul className="space-y-3 mb-6">
                {features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                        <CheckCircle2 className="h-5 w-5 text-primary mr-2 shrink-0" />
                        <span>{feature}</span>
                    </li>
                ))}
            </ul>
            <Link href="/sign-up" className="block w-full">
                <Button
                    className={`w-full ${popular ? "" : "bg-muted hover:bg-muted/80 text-foreground"}`}
                    variant={popular ? "default" : "outline"}
                >
                    {buttonText}
                </Button>
            </Link>
        </div>
    )
}

export default PricingCard