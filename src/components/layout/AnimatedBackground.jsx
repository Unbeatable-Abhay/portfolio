import {motion, useReducedMotion} from "framer-motion";

export default function AnimatedBackground() {
    const shouldReduceMotion = useReducedMotion();

    const blobOneAnimation = shouldReduceMotion
        ? {}
        : {x: [0, 60, -30, 0], y: [0, -40, 50, 0], scale: [1, 1.15, 0.9, 1]};

    const blobTwoAnimation = shouldReduceMotion
        ? {}
        : {x: [0, -70, 40, 0], y: [0, 50, -40, 0], scale: [1, 0.85, 1.1, 1]};

    const blobThreeAnimation = shouldReduceMotion
        ? {}
        : {x: [0, -40, 40, 0], y: [0, 40, -40, 0]};

    const blobOneTransition = {duration: 25, repeat: Infinity, ease: "easeInOut"};
    const blobTwoTransition = {duration: 32, repeat: Infinity, ease: "easeInOut"};
    const blobThreeTransition = {duration: 20, repeat: Infinity, ease: "easeInOut"};

    return (
        <div
            className="fixed inset-0 z-0 overflow-hidden bg-background transition-colors duration-300 pointer-events-none"
            aria-hidden="true"
        >
            <motion.div
                className="absolute top-[-5%] left-[-5%] w-[40vw] h-[40vw] rounded-full bg-accent/10 dark:bg-accent/20 blur-[120px] md:blur-[150px]"
                animate={blobOneAnimation}
                transition={blobOneTransition}
            />

            <motion.div
                className="absolute top-[20%] right-[-10%] w-[40vw] h-[40vw] rounded-full bg-accent/15 dark:bg-accent/20 blur-[130px] md:blur-[160px]"
                animate={blobTwoAnimation}
                transition={blobTwoTransition}
            />

            <motion.div
                className="absolute bottom-[-10%] left-[25%] w-[35vw] h-[35vw] rounded-full bg-accent/15 dark:bg-accent/15 blur-[120px] md:blur-[150px]"
                animate={blobThreeAnimation}
                transition={blobThreeTransition}
            />
        </div>
    );
}