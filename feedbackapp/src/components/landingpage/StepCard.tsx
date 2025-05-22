import React from 'react'

interface stepCardProps {
    number: string,
    title: string,
    description: string
}

const StepCard = ({ number, title, description }: stepCardProps) => {
    return (
        <div className="flex flex-col items-center text-center">
            <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xl font-bold mb-4">
                {number}
            </div>
            <h3 className="text-xl font-medium mb-2">{title}</h3>
            <p className="text-muted-foreground">{description}</p>
        </div>
    )
}

export default StepCard