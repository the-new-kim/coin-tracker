import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import styled from "styled-components";

const Wrapper = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${(props) => props.theme.bgColor};
  z-index: 100;
`;

interface ILoaderProps {
  isLoading: boolean;
}

function Loader({ isLoading }: ILoaderProps) {
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (!isAnimating) return;

    const handleWheel = (event: MouseEvent) => {
      event.preventDefault();
    };

    document.body.addEventListener("wheel", handleWheel, { passive: false });

    return () => document.body.removeEventListener("wheel", handleWheel);
  }, [isAnimating]);

  return (
    <AnimatePresence>
      {isLoading ? (
        <Wrapper
          onAnimationStart={() => setIsAnimating(true)}
          onAnimationComplete={() => {
            setIsAnimating(false);
          }}
          exit={{ opacity: 0, transition: { delay: 0.1 } }}
        >
          <h2>Loading...</h2>
        </Wrapper>
      ) : null}
    </AnimatePresence>
  );
}

export default Loader;
