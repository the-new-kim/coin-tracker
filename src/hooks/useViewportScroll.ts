import { useEffect, useState } from "react";

const useViewportScroll = () => {
  const [state, setState] = useState({
    scrollX: 0,
    scrollY: 0,
    scrollXProgress: 0,
    scrollYProgress: 0,
  });

  useEffect(() => {
    const handleScroll = () => {
      const getProgress = (
        currentPos: number,
        scrollLength: number,
        innerLength: number
      ) => {
        if (scrollLength <= innerLength) return 0;

        const progressPos = currentPos / (scrollLength - innerLength);

        return parseFloat(progressPos.toFixed(2));
      };

      const scrollX = window.scrollX;
      const scrollY = window.scrollY;

      const scrollXProgress = getProgress(
        scrollX,
        document.body.scrollWidth,
        window.innerWidth
      );
      const scrollYProgress = getProgress(
        scrollY,
        document.body.scrollHeight,
        window.innerHeight
      );

      setState({
        scrollX,
        scrollY,
        scrollXProgress,
        scrollYProgress,
      });
    };
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return state;
};

export default useViewportScroll;
