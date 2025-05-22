import React from 'react'
import { ReactNode } from "react";

interface FeatureCardProps{
    icon:ReactNode, title:string, description:string
}
const FeatureCard = ({ icon, title, description }:FeatureCardProps) => {
    return (
        <div className="bg-background rounded-lg p-6 shadow-sm border transition-all hover:shadow-md">
            <div className="mb-4">{icon}</div>
            <h3 className="text-xl font-medium mb-2">{title}</h3>
            <p className="text-muted-foreground">{description}</p>
        </div>
    )
}

export default FeatureCard