"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import React, { useEffect, useRef } from "react"
import PricingCard from "@/components/landingpage/PricingCard";
;
import publicSpeaking from "../../public/Lively Group Discussion.jpeg";
import Autoplay from "embla-carousel-autoplay"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel"
import { testimonials } from "../../data"
import Header from "@/components/landingpage/Header"
import Hero from "@/components/landingpage/hero"
import Logos from "@/components/landingpage/Logos"
import { MessageSquare } from "lucide-react"
import TestimonialCard from "@/components/landingpage/TestimonialCard"
import { AnimatedCounter } from "@/components/animatedsections/AnimatedCounter"
import AnimatedSection from "@/components/animatedsections/AnimatedSection"
import StepCard from "@/components/landingpage/StepCard"

export default function LandingPage() {
  useEffect(() => {
    document.documentElement.style.scrollBehavior = "smooth"

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      document.documentElement.style.scrollBehavior = "auto"
    }

    return () => {
      document.documentElement.style.scrollBehavior = "auto"
    }
  }, []);

  const plugin = useRef(
    Autoplay({ delay: 2000, stopOnInteraction: false, stopOnMouseEnter: false })
  );
  return (
    <div className="flex min-h-screen flex-col overflow-x-hidden">
      <Header />
      <main className="flex-1">
        <Hero />
        <Logos />

        <section className="py-16 bg-background">
          <div className="container">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <AnimatedSection animation="fade-up">
                <div className="p-6">
                  <AnimatedCounter end={98} suffix="%" className="text-4xl font-bold text-primary mb-2" />
                  <p className="text-muted-foreground">Satisfaction Rate</p>
                </div>
              </AnimatedSection>

              <AnimatedSection animation="fade-up">
                <div className="p-6">
                  <AnimatedCounter end={10000} suffix="+" className="text-4xl font-bold text-primary mb-2" />
                  <p className="text-muted-foreground">Teams Using FeedbackLoop</p>
                </div>
              </AnimatedSection>

              <AnimatedSection animation="fade-up">
                <div className="p-6">
                  <AnimatedCounter end={5} suffix="M+" className="text-4xl font-bold text-primary mb-2" />
                  <p className="text-muted-foreground">Feedback Responses Collected</p>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </section>
        {/* How It Works Section */}
        <section id="how-it-works" className="py-16 md:py-24 bg-muted">
          <div className="container space-y-16">
            <AnimatedSection animation="fade-down">
              <div className="text-center space-y-4">
                <div className="inline-block rounded-full bg-background px-3 py-1 text-sm">Simple Process</div>
                <h2 className="text-3xl md:text-4xl font-bold tracking-tighter">How SpeakFreely Works</h2>
                <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                  Our streamlined process makes it easy to start collecting valuable feedback in minutes.
                </p>
              </div>
            </AnimatedSection>

            <div className="grid md:grid-cols-4 gap-8">

              <AnimatedSection animation="fade-left">
                <StepCard
                  number="1"
                  title="Create Your Anonymous Message Board"
                  description="Instantly get a public profile link where anyone can send you anonymous messages."
                />
              </AnimatedSection>

              <AnimatedSection animation="fade-down" delay={0.2}>
                <StepCard
                  number="2"
                  title="Share Your Link Anywhere"
                  description="Share your link on social media, WhatsApp, or email. Anyone with the link can send you a message without logging in."
                />
              </AnimatedSection>

              <AnimatedSection animation="fade-up" delay={0.4}>
                <StepCard
                  number="3"
                  title="Receive & View Messages"
                  description="People can type their own message or pick from suggested questions. You get all messages on your personal dashboard — 100% anonymous."
                />
              </AnimatedSection>

              <AnimatedSection animation="fade-right" delay={0.6}>
                <StepCard
                  number="4"
                  title="Encourage Fun & Honest Conversations"
                  description="Great for getting honest feedback, fun questions, or deep conversations — without revealing identities."
                />
              </AnimatedSection>

            </div>


            <AnimatedSection animation="Zoom-in" delay={0.6}>
              <div className="relative w-full max-w-4xl mx-auto mt-12 rounded-lg overflow-hidden shadow-xl">
                <Image
                  src={publicSpeaking}
                  width={1200}
                  height={600}
                  alt="SpeakFreely process demonstration"
                  className="w-full h-auto"
                />

              </div>
            </AnimatedSection>

          </div>
        </section >

        {/* Testimonials Section */}
        < section id="testimonials" className="py-16 md:py-24" >
          <div className="container space-y-16">

            <AnimatedSection animation="fade-down">
              <div className="text-center space-y-4">
                <div className="inline-block rounded-full bg-muted px-3 py-1 text-sm">Success Stories</div>
                <h2 className="text-3xl md:text-4xl font-bold tracking-tighter">What Our Customers Say</h2>
                <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                  See how SpeakFreely has transformed communication and culture for teams worldwide.
                </p>
              </div>

            </AnimatedSection>

            <Carousel
              plugins={[plugin.current]}
              className="w-full"
              onMouseEnter={plugin.current.stop}
              onMouseLeave={plugin.current.reset}
              opts={{
                loop: true
              }}
            >
              <CarouselContent className="-ml-4">
                {testimonials.map((testimonial, index) => (
                  <CarouselItem
                    key={index}
                    className="pl-4 w-full sm:basis-full md:basis-1/2 lg:basis-1/3"
                  >
                    <TestimonialCard
                      quote={testimonial.quote}
                      author={testimonial.author}
                      role={testimonial.role}
                    />
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>


          </div>
        </section >

        {/* Pricing Section */}
        < section id="pricing" className="py-16 md:py-24 bg-muted" >
          <div className="container space-y-16">
            <AnimatedSection animation="fade-up">
              <div className="text-center space-y-4">
                <div className="inline-block rounded-full bg-background px-3 py-1 text-sm">Pricing Plans</div>
                <h2 className="text-3xl md:text-4xl font-bold tracking-tighter">Simple, Transparent Pricing</h2>
                <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                  Choose the plan that works best for your team&apos;s feedback needs.
                </p>
              </div>
            </AnimatedSection>

            <div className="grid md:grid-cols-3 gap-8">
              <AnimatedSection animation="Zoom-in">
                <PricingCard
                  period=""
                  title="Starter"
                  price="$0"
                  description="Perfect for small teams just getting started with feedback."
                  features={["Up to 10 team members", "3 feedback forms", "Basic analytics", "Email support"]}
                  buttonText="Start for Free"
                  popular={false}
                />
              </AnimatedSection>
              <AnimatedSection animation="Zoom-in" delay={0.6}>
                <PricingCard
                  title="Professional"
                  price="$29"
                  period="per month"
                  description="Ideal for growing teams that need more advanced features."
                  features={[
                    "Up to 50 team members",
                    "Unlimited feedback forms",
                    "Advanced analytics",
                    "Priority support",
                    "Custom branding",
                  ]}
                  buttonText="Get Started"
                  popular={true}
                />
              </AnimatedSection>
              <AnimatedSection animation="Zoom-in" delay={0.8}>
                <PricingCard
                  title="Enterprise"
                  price="Custom"
                  period=""
                  description="For large organizations with specific requirements."
                  features={[
                    "Unlimited team members",
                    "Unlimited feedback forms",
                    "Advanced analytics & reporting",
                    "Dedicated account manager",
                    "Custom integrations",
                    "SSO & advanced security",
                  ]}
                  buttonText="Contact Sales"
                  popular={false}
                />
              </AnimatedSection>
            </div>
          </div>
        </section >

        {/* FAQ Section */}
        <AnimatedSection animation="fade-right">
          < section id="faq" className="py-16 md:py-24" >
            <div className="container space-y-16">
              <div className="text-center space-y-4">
                <div className="inline-block rounded-full bg-muted px-3 py-1 text-sm">Common Questions</div>
                <h2 className="text-3xl md:text-4xl font-bold tracking-tighter">Frequently Asked Questions</h2>
                <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                  Find answers to common questions about SpeakFreely.
                </p>
              </div>

              <div className="max-w-3xl mx-auto">
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="item-1">
                    <AccordionTrigger>How do you ensure feedback is truly anonymous?</AccordionTrigger>
                    <AccordionContent>
                      We use advanced encryption and privacy protocols to ensure all feedback is completely anonymous. We
                      don&apos;t track IP addresses, and all identifying information is stripped from submissions. Even
                      administrators cannot see who submitted what feedback.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-2">
                    <AccordionTrigger>Can I customize the feedback forms?</AccordionTrigger>
                    <AccordionContent>
                      Yes, SpeakFreely offers a flexible form builder that allows you to create custom questions, use
                      different question types (multiple choice, rating scales, open-ended), and brand your forms with
                      your company colors and logo.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-3">
                    <AccordionTrigger>How quickly can I get started?</AccordionTrigger>
                    <AccordionContent>
                      You can sign up and create your first feedback form in less than 5 minutes. Our intuitive interface
                      and pre-built templates make it easy to get started quickly, even if you have no technical
                      experience.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-4">
                    <AccordionTrigger>Can I integrate SpeakFreely with other tools?</AccordionTrigger>
                    <AccordionContent>
                      Yes, SpeakFreely integrates with popular tools like Slack, Microsoft Teams, Jira, and more. Our
                      Enterprise plan also offers custom integrations to fit your specific workflow needs.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-5">
                    <AccordionTrigger>Is there a limit to how many responses I can collect?</AccordionTrigger>
                    <AccordionContent>
                      No, all of our plans allow for unlimited responses. The difference between plans is in the number of
                      team members, forms, and additional features available.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
            </div>
          </section >
        </AnimatedSection>


        {/* CTA Section */}
        <AnimatedSection animation="fade-left" delay={0.6}>
          < section className="py-16 md:py-24 bg-primary text-primary-foreground" >
            <div className="container text-center space-y-8">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tighter">
                Ready to Transform Your Feedback Culture?
              </h2>
              <p className="text-primary-foreground/80 text-lg max-w-2xl mx-auto">
                Join thousands of teams already using SpeakFreely to build better products and stronger teams.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/signup">
                  <Button size="lg" variant="secondary" className="px-8">
                    Start Your Free Trial
                  </Button>
                </Link>
                <Link href="/demo">
                  <Button
                    size="lg"
                    variant="outline"
                    className="px-8 bg-transparent text-primary-foreground border-primary-foreground hover:bg-primary-foreground/10"
                  >
                    Request a Demo
                  </Button>
                </Link>
              </div>
            </div>
          </section >
        </AnimatedSection>

      </main >


      <footer className="border-t py-12 bg-muted/30">
        <div className="container grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <MessageSquare className="h-6 w-6 text-primary" />
              <span className="text-xl font-bold">SpeakFreely</span>
            </div>
            <p className="text-muted-foreground">
              Honest feedback made simple. Build better products and stronger teams with anonymous feedback.
            </p>
          </div>

          <div>
            <h3 className="font-medium mb-4">Product</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#features" className="text-muted-foreground hover:text-foreground transition-colors">
                  Features
                </Link>
              </li>
              <li>
                <Link href="#pricing" className="text-muted-foreground hover:text-foreground transition-colors">
                  Pricing
                </Link>
              </li>
              <li>
                <Link href="/integrations" className="text-muted-foreground hover:text-foreground transition-colors">
                  Integrations
                </Link>
              </li>
              <li>
                <Link href="/roadmap" className="text-muted-foreground hover:text-foreground transition-colors">
                  Roadmap
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-medium mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/blog" className="text-muted-foreground hover:text-foreground transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/guides" className="text-muted-foreground hover:text-foreground transition-colors">
                  Guides
                </Link>
              </li>
              <li>
                <Link href="/help" className="text-muted-foreground hover:text-foreground transition-colors">
                  Help Center
                </Link>
              </li>
              <li>
                <Link href="/webinars" className="text-muted-foreground hover:text-foreground transition-colors">
                  Webinars
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-medium mb-4">Company</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-muted-foreground hover:text-foreground transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/careers" className="text-muted-foreground hover:text-foreground transition-colors">
                  Careers
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-muted-foreground hover:text-foreground transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/legal" className="text-muted-foreground hover:text-foreground transition-colors">
                  Legal
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="container mt-12 pt-8 border-t flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} SpeakFreely. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link href="/privacy" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Terms of Service
            </Link>
            <Link href="/cookies" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Cookies
            </Link>
          </div>
        </div>
      </footer>
    </div >
  )
}






