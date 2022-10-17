import React from "react";
import Button from "../../components/ui/button";
import Space from "../../components/ui/space";
import { useInView } from "react-intersection-observer";
import './styles.scss';

const HomePage = () => {
  const {ref: sectionRef1, inView: inView1} = useInView();
  const {ref: sectionRef2, inView: inView2} = useInView();
  const {ref: sectionRef3, inView: inView3} = useInView();

  return (
    <div>
      <h1>Welcome to the Gym App</h1>
      <div>
        <Button text="Login" link="/login" />
      </div>
      <div>
        <Button text="Sign Up" link="/signup" />
      </div>

      <Space height={50} />
      
      <section ref={sectionRef1} className={inView1 ? 'show' : 'hidden'}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque incidunt explicabo tenetur! Repudiandae numquam minus molestiae provident totam vero quos laudantium nihil accusamus est. Repudiandae mollitia architecto dolorem voluptatum ea!
      </section>
      
      <Space height={50} />

      <section ref={sectionRef2} className={inView2 ? 'show' : 'hidden'}>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Vero explicabo assumenda fuga saepe, earum ex, sunt doloremque esse quas, laudantium necessitatibus optio impedit quam harum. Iste ipsam dignissimos doloribus quod.
      </section>

      <Space height={50} />

      <section ref={sectionRef3} className={inView3 ? 'show' : 'hidden'}>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Vero explicabo assumenda fuga saepe, earum ex, sunt doloremque esse quas, laudantium necessitatibus optio impedit quam harum. Iste ipsam dignissimos doloribus quod.
      </section>
    </div>
  );
};

export default HomePage;
