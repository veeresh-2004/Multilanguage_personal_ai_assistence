// AnimatedOnScroll.jsx
import { useInView } from 'react-intersection-observer';
import { Fade } from '@mui/material';

const AnimatedOnScroll = ({ children, animation = Fade, ...props }) => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });
  const AnimationComponent = animation;
  return (
    <div ref={ref}>
      <AnimationComponent in={inView} {...props}>
        {children}
      </AnimationComponent>
    </div>
  );
};

export default AnimatedOnScroll;