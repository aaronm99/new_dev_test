import { Meteors } from "@/components/ui/meteors";
import { ArrowUp } from "lucide-react";
import Link from "next/link";
import style from "./style.module.scss";
import { motion } from "framer-motion";
import React, { useState } from "react";

const Footer = () => {
  const [isHovered, setIsHovered] = useState(false);

  const animationProps = {
    initial: "hidden",
    animate: isHovered ? "visible" : "hidden",
    variants: {
      hidden: {
        opacity: 0,
        display: "block",
        y: -10,
        transition: {
          opacity: { duration: 0.25, ease: "easeOut" },
          display: { delay: 0 },
        },
      },
      visible: {
        opacity: 1,
        y: 0,
        display: "block",
        transition: {
          opacity: { duration: 0.25, ease: "easeIn", delay: 0.1 },
          y: { duration: 0.25, ease: "easeIn" },
          display: { delay: 0 },
        },
      },
    },
  };

  return (
    <div className={style.footer}>
      <div className={style.content}>
        <div className={style.main__row}>
          <h2 className="">Cosmos</h2>
          <p>
            Embrace innovation and scientific literacy to shape a future where
            creativity and progress thrive together
          </p>
        </div>
        <div className={style.row}>
          <h2 className="">Info</h2>
          <Link
            scroll={false}
            href="#cosmos"
            className="block hover:text-blue-500 transition-all duration-300"
          >
            Cosmos Information
          </Link>
          <Link
            href="#planets"
            className="block hover:text-blue-500 transition-all duration-300"
          >
            Planet Information
          </Link>
        </div>{" "}
        <div className={style.row}>
          <h2 className="">Legal</h2>
          <div className={style.not__allowed} aria-disabled tabIndex={-1}>
            Terms and conditions
          </div>
          <div className={style.not__allowed} aria-disabled tabIndex={-1}>
            Privacy Policy
          </div>
        </div>
        <div>
          <motion.a
            href="#top"
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
            className="absolute right-5 md:right-16 bottom-0 w-10 h-20 cursor-pointer"
          >
            <ArrowUp className="w-10 h-10" />

            <motion.span
              {...animationProps}
              className="absolute top-8 w-[65px] -left-[8.5px] text-sm mt-2"
            >
              Go to Top
            </motion.span>
          </motion.a>
        </div>
        <h3 className={style.trademark}>
          © 2024 Cosmos, Inc. All rights reserved.
        </h3>
      </div>

      <Meteors number={20} />
    </div>
  );
};

export default Footer;
