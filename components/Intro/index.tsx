import useFadeInAnimation from "@/hooks/use-fade-in";
import style from "./style.module.scss";
import { motion } from "framer-motion";

const Intro = () => {
  const fadeInAnimation = useFadeInAnimation();
  const fadeInAnimationTwo = useFadeInAnimation(0.3);

  return (
    <div className={style.intro}>
      <div className="relative">
        <motion.h1 {...fadeInAnimation} id="cosmos">
          Cosmos
        </motion.h1>
        <motion.p {...fadeInAnimationTwo}>
          {`Once you have an innovation culture, even those who are not scientists
          or engineers - poets, actors, journalists - they, as communities,
          embrace the meaning of what it is to be scientifically literate. They
          embrace the concept of an innovation culture. They vote in ways that
          promote it. They don't fight science and they don't fight technology.`}
        </motion.p>
        <motion.p {...fadeInAnimationTwo}>
          {` Private enterprise in the history of civilization has never led large,
          expensive, dangerous projects with unknown risks. That has never
          happened because when you combine all these factors, you cannot create
          a capital market valuation of that activity.`}
        </motion.p>
        <motion.p {...fadeInAnimationTwo}>
          {` In science, if you don't do it, somebody else will. Whereas in art, if
          Beethoven didn't compose the 'Ninth Symphony,' no one else before or
          after is going to compose the 'Ninth Symphony' that he composed; no
          one else is going to paint 'Starry Night' by van Gogh.`}
        </motion.p>
      </div>
    </div>
  );
};

export default Intro;
