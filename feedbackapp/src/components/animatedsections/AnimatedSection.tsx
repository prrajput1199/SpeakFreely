// AnimatedSection.jsx or AnimatedSection.js
import {  motion } from 'framer-motion';
import { animationVariants } from './AnimationVariants';
import { ReactNode } from 'react';
type AnimatedSectionProps = {
    children: ReactNode;
    animation?: keyof typeof animationVariants;
    delay?: number
};

const AnimatedSection = ({ children, animation = 'fade-up', delay }: AnimatedSectionProps) => {
    const selectedVariant = animationVariants[animation] || animationVariants['fade-up'];
    return (
        <motion.div
            variants={selectedVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, ease: 'easeOut', delay: delay }}
        >
            {children}
        </motion.div>
    );
};

export default AnimatedSection;
