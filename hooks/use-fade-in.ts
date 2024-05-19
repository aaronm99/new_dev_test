import { MotionProps } from "framer-motion";

const useFadeInAnimation = (delay = 0): MotionProps => {
  return {
    initial: { opacity: 0, y: "-15%", x: "0%" },
    viewport: { once: true, margin: "0px 0px -50px" },
    whileInView: { opacity: 1, y: "0%", x: "0%" },
    transition: { duration: 0.4, damping: 500, stiffness: 10, delay },
  };
};

export default useFadeInAnimation;
