import { AnimatePresence, motion, useViewportScroll } from "framer-motion";
import { useEffect, useState } from "react";

import styled from "styled-components";

const Wrapper = styled(motion.div)`
  position: fixed;
  bottom: 0;
  right: 0;
  width: 70px;
  height: 70px;
  z-index: 100;
  border: 0;
  cursor: pointer;
  padding: 10px;

  svg {
    width: 100%;
    height: 100%;
    z-index: 101;

    path {
      transition: stroke ease-out 300ms;
      stroke: ${(props) => props.theme.textColor};
      stroke-width: 1.5;
      stroke-linecap: round;
      stroke-linejoin: round;
    }
  }

  :hover {
    svg {
      path {
        stroke: ${(props) => props.theme.hoverColor};
      }
    }
  }
`;

const topBtnVariants = {
  hide: {
    scale: 0,
    opacity: 0,
  },
  show: {
    scale: 1,
    opacity: 1,
  },
  bigger: {
    scale: 1.2,
  },
};

function TopBtn() {
  const [topBtnVisble, setTopBtnVisble] = useState(false);
  const { scrollY } = useViewportScroll();

  useEffect(() => {
    scrollY.onChange(() => {
      setTopBtnVisble(scrollY.get() > window.innerHeight);
    });
  }, [scrollY]);

  const scrollToTop = () => {
    window.scrollTo(0, 0);
  };

  return (
    <AnimatePresence>
      {topBtnVisble && (
        <Wrapper
          variants={topBtnVariants}
          initial="hide"
          animate="show"
          exit="hide"
          whileHover="bigger"
          onClick={scrollToTop}
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M3.35288 8.95043C4.00437 6.17301 6.17301 4.00437 8.95043 3.35288C10.9563 2.88237 13.0437 2.88237 15.0496 3.35288C17.827 4.00437 19.9956 6.17301 20.6471 8.95044C21.1176 10.9563 21.1176 13.0437 20.6471 15.0496C19.9956 17.827 17.827 19.9956 15.0496 20.6471C13.0437 21.1176 10.9563 21.1176 8.95044 20.6471C6.17301 19.9956 4.00437 17.827 3.35288 15.0496C2.88237 13.0437 2.88237 10.9563 3.35288 8.95043Z" />
            <path d="M9.5 13L12 10.5L14.5 13" />
          </svg>
        </Wrapper>
      )}
    </AnimatePresence>
  );
}

export default TopBtn;
