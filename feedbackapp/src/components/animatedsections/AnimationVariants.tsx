// animationVariants.js
export const animationVariants = {
    'fade-left': {
        hidden: { opacity: 0, x: -50 },
        visible: {
            opacity: 1,
            x: 0,
        },
    },
    'fade-right': {
        hidden: { opacity: 0, x: 50 },
        visible: {
            opacity: 1,
            x: 0,
        },
    },
    'fade-down': {
        hidden: { opacity: 0, y: -40 },
        visible: {
            opacity: 1,
            y: 0,
        },
    },
    'fade-up': {
        hidden: { opacity: 0, y: 40 },
        visible: {
            opacity: 1,
            y: 0,
        },
    },
    'Zoom-in': {
        hidden: { opacity: 0, scale: 0 },
        visible: {
            opacity: 1, scale: 1
        },
    }
};
