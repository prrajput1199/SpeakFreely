import { MessageSquare, Shield, Zap, BarChart, CheckCircle2 } from "lucide-react"
import React from 'react'
import FeatureCard from "./FeatureCard"

const Featured = () => {
    return (
        <section id="features" className="py-16 md:py-24">
            <div className="container space-y-16">
                <div className="text-center space-y-4">
                    <div className="inline-block rounded-full bg-muted px-3 py-1 text-sm">Key Features</div>
                    <h2 className="text-3xl md:text-4xl font-bold tracking-tighter">
                        Everything You Need for Honest Feedback
                    </h2>
                    <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                        Our platform is designed to make collecting and acting on anonymous feedback simple and effective.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <FeatureCard
                        icon={<Shield className="h-10 w-10 text-primary" />}
                        title="100% Anonymous"
                        description="We ensure complete anonymity for all feedback providers, encouraging honest and open communication."
                    />
                    <FeatureCard
                        icon={<Zap className="h-10 w-10 text-primary" />}
                        title="Quick Setup"
                        description="Get started in minutes with our intuitive interface and customizable feedback forms."
                    />
                    <FeatureCard
                        icon={<BarChart className="h-10 w-10 text-primary" />}
                        title="Actionable Insights"
                        description="Transform feedback into actionable insights with our powerful analytics dashboard."
                    />
                    <FeatureCard
                        icon={<MessageSquare className="h-10 w-10 text-primary" />}
                        title="Customizable Forms"
                        description="Create tailored feedback forms that ask the right questions for your specific needs."
                    />
                    <FeatureCard
                        icon={<CheckCircle2 className="h-10 w-10 text-primary" />}
                        title="Follow-up Tools"
                        description="Track progress and follow up on feedback while maintaining anonymity."
                    />
                    <FeatureCard
                        icon={<Shield className="h-10 w-10 text-primary" />}
                        title="Enterprise Security"
                        description="Bank-level encryption and security protocols to protect all data and maintain privacy."
                    />
                </div>
            </div>
        </section>
    )
}

export default Featured