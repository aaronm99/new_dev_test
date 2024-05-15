import style from "./style.module.scss";
import Image from "next/image";

const Hero = () => (
  <div className={style.hero}>
    <Image src="/background.jpg" alt="Earth from ISS" fill />
  </div>
);

export default Hero;
