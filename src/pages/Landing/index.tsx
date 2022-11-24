import React from "react";
import OutlinedButton from "../../components/ui/OutlinedButton/outlinedButton";
import FilledButton from "../../components/ui/FilledButton/filledButton";
import Space from "../../components/ui/Space/space";
import { useInView } from "react-intersection-observer";
import "./styles.scss";

const LandingPage = () => {
  const { ref: sectionRef1, inView: section1_inView } = useInView();
  const { ref: sectionRef2, inView: section2_inView } = useInView();
  const { ref: sectionRef3, inView: section3_inView } = useInView();

  return (
    <div className="mt-48">
      <h1 className="text-4xl">Welcome to the Fitness App</h1>
      {/* <div className="mt-3">
        <FilledButton text={"Login"} />
      </div>
      <div className="mt-3">
        <OutlinedButton text={"Sign Up"} />
      </div> */}

      <Space height={50} />

      <section ref={sectionRef1} className={section1_inView ? "show-section" : "hide"}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque incidunt
        explicabo tenetur! Repudiandae numquam minus molestiae provident totam
        vero quos laudantium nihil accusamus est. Repudiandae mollitia
        architecto dolorem voluptatum ea!
      </section>

      <Space height={50} />

      <section ref={sectionRef2} className={section2_inView ? "show-section" : "hide"}>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Vero explicabo
        assumenda fuga saepe, earum ex, sunt doloremque esse quas, laudantium
        necessitatibus optio impedit quam harum. Iste ipsam dignissimos
        doloribus quod.
      </section>

      <Space height={50} />

      <section ref={sectionRef3} className={section3_inView ? "show-section" : "hide"}>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Vero explicabo
        assumenda fuga saepe, earum ex, sunt doloremque esse quas, laudantium
        necessitatibus optio impedit quam harum. Iste ipsam dignissimos
        doloribus quod.
      </section>
    </div>
  );
};

export default LandingPage;
