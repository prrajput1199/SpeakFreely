import { useTheme } from 'next-themes'
import React from 'react'

interface testiMonialCardprops {
  quote: string, author: string, role: string
}

const TestimonialCard = ({ quote, author, role }: testiMonialCardprops) => {
  const { theme } = useTheme();
  return (
    <div className={`relative rounded-lg p-6 mt-4 mb-4 ml-2  ${theme === "light" ? "bg-white" : "bg-black"} shadow-[0px_4px_5px_rgba(50,133,255,0.2)] border-[#3285FF]`}>
      <div className="pointer-events-none absolute inset-0 z-50 bg-[linear-gradient(to_right,rgba(0,0,0,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.02)_1px,transparent_1px)] bg-[size:10px_10px]" />
      <div className="mb-4 text-primary">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M11.6 4C7.2 4 4 7.2 4 11.6C4 16 7.2 19.2 11.6 19.2C16 19.2 19.2 16 19.2 11.6C19.2 7.2 16 4 11.6 4ZM14.4 13.2L10.8 15.2C10.4 15.4 10 15.2 10 14.8V10.8C10 10.4 10.4 10.2 10.8 10.4L14.4 12.4C14.8 12.6 14.8 13 14.4 13.2Z"
            fill="currentColor"
          />
        </svg>
      </div>
      <p className="italic mb-4">{quote}</p>
      <div>
        <p className="font-medium">{author}</p>
        <p className="text-sm text-muted-foreground">{role}</p>
      </div>
    </div>
  )
}

export default TestimonialCard