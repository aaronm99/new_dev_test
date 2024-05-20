import useFadeInAnimation from "@/hooks/use-fade-in";
import style from "./style.module.scss";
import { motion } from "framer-motion";
import { ModeToggle } from "@/components/theme";
import Particles from "@/components/ui/particles";
import { useTheme } from "next-themes";

const Intro = () => {
  const fadeInAnimation = useFadeInAnimation();
  const fadeInAnimationParagraph = useFadeInAnimation(0.3);
  const { theme } = useTheme();

  return (
    <div className={style.intro}>
      <div className="relative">
        <div className="flex items-center justify-between mt-1 md:mb-1">
          <motion.h1 {...fadeInAnimation} id="cosmos">
            Cosmos
          </motion.h1>
          <ModeToggle />
        </div>
        <motion.p {...fadeInAnimationParagraph}>
          {`Once you have an innovation culture, even those who are not scientists
          or engineers - poets, actors, journalists - they, as communities,
          embrace the meaning of what it is to be scientifically literate. They
          embrace the concept of an innovation culture. They vote in ways that
          promote it. They don't fight science and they don't fight technology.`}
        </motion.p>
        <motion.p {...fadeInAnimationParagraph}>
          {` Private enterprise in the history of civilization has never led large,
          expensive, dangerous projects with unknown risks. That has never
          happened because when you combine all these factors, you cannot create
          a capital market valuation of that activity.`}
        </motion.p>
        <motion.p {...fadeInAnimationParagraph}>
          {` In science, if you don't do it, somebody else will. Whereas in art, if
          Beethoven didn't compose the 'Ninth Symphony,' no one else before or
          after is going to compose the 'Ninth Symphony' that he composed; no
          one else is going to paint 'Starry Night' by van Gogh.`}
        </motion.p>
      </div>
      {theme === "dark" && (
        <div className="absolute top-0 left-1/2 -z-10  h-full w-full -translate-x-1/2">
          <Particles
            className="absolute inset-0 -z-10"
            quantity={35}
            staticity={30}
          />
        </div>
      )}
    </div>
  );
};

export default Intro;
