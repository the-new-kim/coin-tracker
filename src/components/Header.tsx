import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import styled from "styled-components";
import { isDarkModeAtom, saveDarkMode, siteTitleAtom } from "../atoms";
import useOutsideClick from "../hooks/useOutsiteClick";

const Wrapper = styled.header`
  position: relative;
  width: 100%;
  margin: 30px 0;
  display: grid;
  grid-template-columns: 2fr 6fr 1fr 1fr;
  > * {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const BackBtn = styled.div`
  width: 100%;
  min-width: 80px;
  /* height: 100%; */
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const BackBtnInnerWrapper = styled(motion.div)`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50%;
  margin: auto 0;
  height: auto;

  a {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    padding: 10px 0;
  }
`;

const TitleAndSearch = styled.div`
  position: relative;
  > * {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const Title = styled(motion.div)`
  h1 {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

const Search = styled(motion.form)`
  width: 100%;
  transition: opacity ease-out 300ms;
`;

const SearchInput = styled(motion.input)`
  text-align: center;
  width: 100%;
  /* padding: 10px; */
  background: ${(props) => props.theme.bgColor};
  border: none;
  border-bottom: 1px solid rgb(60, 63, 68);
  border-radius: 0;
  color: ${(props) => props.theme.textColor};
  appearance: none;
  font-size: 1.7em;
  padding: 0;
  margin: 0;
  :focus {
    outline: none;
    box-shadow: none;
    border-color: rgb(255, 255, 255);
  }
`;

const Icon = styled.div`
  margin: auto;
  height: auto;
  min-width: 40px;
  padding: 15px 0;

  cursor: pointer;
  svg {
    width: 50%;
    transition: fill ease-out 300ms;
    fill: ${(props) => props.theme.textColor};
  }

  :hover svg {
    fill: ${(props) => props.theme.hoverColor};
  }
`;
const SearchIcon = styled(Icon)``;
const DarkModeIcons = styled(Icon)`
  position: relative;
  overflow: hidden;
`;

const DarkModeIcon = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  margin: auto;
  display: flex;
  justify-content: center;
`;

interface IForm {
  keyword: string;
}

function Header() {
  const location = useLocation();

  const [isHome, setIsHome] = useState(true);
  const [isDarkMode, setIsDarkMode] = useRecoilState(isDarkModeAtom);
  const siteTitle = useRecoilValue(siteTitleAtom);
  const [searchOpen, setSearchOpen] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    setIsHome(location.pathname === "/");
  }, [location]);

  const toggleDarkMode = () => {
    setIsDarkMode((prev) => !prev);
  };

  const toggleSearchOpen = () => {
    setSearchOpen((prev) => !prev);
  };

  const searchIconRef = useRef<HTMLDivElement>(null);
  const formRef = useOutsideClick<HTMLFormElement, HTMLDivElement>(
    searchOpen,
    toggleSearchOpen,
    searchIconRef
  );
  const { register, handleSubmit, setValue, setFocus, unregister } =
    useForm<IForm>();

  const onValid = ({ keyword }: IForm) => {
    navigate(`/search?keyword=${keyword}`);
    setValue("keyword", "");
    toggleSearchOpen();
  };

  useEffect(() => {
    searchOpen
      ? setFocus("keyword", { shouldSelect: searchOpen })
      : unregister("keyword");
  }, [searchOpen, setFocus, unregister]);

  useEffect(() => {
    saveDarkMode(isDarkMode);
  }, [isDarkMode]);

  return (
    <Wrapper>
      <BackBtn>
        <AnimatePresence>
          {isHome ? null : (
            <BackBtnInnerWrapper
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <Link to="/">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
                  <path d="M224 480c-8.188 0-16.38-3.125-22.62-9.375l-192-192c-12.5-12.5-12.5-32.75 0-45.25l192-192c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25L77.25 256l169.4 169.4c12.5 12.5 12.5 32.75 0 45.25C240.4 476.9 232.2 480 224 480z" />
                </svg>
              </Link>
            </BackBtnInnerWrapper>
          )}
        </AnimatePresence>
      </BackBtn>
      <TitleAndSearch>
        <AnimatePresence>
          {searchOpen ? (
            <Search
              key="search"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              ref={formRef}
              onSubmit={handleSubmit(onValid)}
            >
              <SearchInput
                {...register("keyword", { required: true })}
                placeholder="Search"
              ></SearchInput>
            </Search>
          ) : (
            <Title
              key="title"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <h1>{siteTitle}</h1>
            </Title>
          )}
        </AnimatePresence>
      </TitleAndSearch>
      <SearchIcon ref={searchIconRef} onClick={toggleSearchOpen}>
        <svg
          version="1.1"
          id="Capa_1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 183.792 183.792"
        >
          <path
            d="M54.734,9.053C39.12,18.067,27.95,32.624,23.284,50.039c-4.667,17.415-2.271,35.606,6.743,51.22
	c12.023,20.823,34.441,33.759,58.508,33.759c7.599,0,15.139-1.308,22.287-3.818l30.364,52.592l21.65-12.5l-30.359-52.583
	c10.255-8.774,17.638-20.411,21.207-33.73c4.666-17.415,2.27-35.605-6.744-51.22C134.918,12.936,112.499,0,88.433,0
	C76.645,0,64.992,3.13,54.734,9.053z M125.29,46.259c5.676,9.831,7.184,21.285,4.246,32.25c-2.938,10.965-9.971,20.13-19.802,25.806
	c-6.462,3.731-13.793,5.703-21.199,5.703c-15.163,0-29.286-8.146-36.857-21.259c-5.676-9.831-7.184-21.284-4.245-32.25
	c2.938-10.965,9.971-20.13,19.802-25.807C73.696,26.972,81.027,25,88.433,25C103.597,25,117.719,33.146,125.29,46.259z"
          />
        </svg>
      </SearchIcon>
      <DarkModeIcons onClick={toggleDarkMode}>
        <AnimatePresence initial={false}>
          {isDarkMode ? (
            <DarkModeIcon
              key="sun"
              initial={{ y: "100%" }}
              animate={{ y: "0%", transition: { delay: 0.3, duration: 0.5 } }}
              exit={{ y: "100%", transition: { duration: 0.5 } }}
            >
              <svg
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
              >
                <g>
                  <g>
                    <path d="m256,105.5c-83.9,0-152.2,68.3-152.2,152.2 0,83.9 68.3,152.2 152.2,152.2 83.9,0 152.2-68.3 152.2-152.2 0-84-68.3-152.2-152.2-152.2zm0,263.5c-61.4,0-111.4-50-111.4-111.4 0-61.4 50-111.4 111.4-111.4 61.4,0 111.4,50 111.4,111.4 0,61.4-50,111.4-111.4,111.4z" />
                    <path d="m256,74.8c11.3,0 20.4-9.1 20.4-20.4v-23c0-11.3-9.1-20.4-20.4-20.4-11.3,0-20.4,9.1-20.4,20.4v23c2.84217e-14,11.3 9.1,20.4 20.4,20.4z" />
                    <path d="m256,437.2c-11.3,0-20.4,9.1-20.4,20.4v22.9c0,11.3 9.1,20.4 20.4,20.4 11.3,0 20.4-9.1 20.4-20.4v-22.9c0-11.2-9.1-20.4-20.4-20.4z" />
                    <path d="m480.6,235.6h-23c-11.3,0-20.4,9.1-20.4,20.4 0,11.3 9.1,20.4 20.4,20.4h23c11.3,0 20.4-9.1 20.4-20.4 0-11.3-9.1-20.4-20.4-20.4z" />
                    <path d="m54.4,235.6h-23c-11.3,0-20.4,9.1-20.4,20.4 0,11.3 9.1,20.4 20.4,20.4h22.9c11.3,0 20.4-9.1 20.4-20.4 0.1-11.3-9.1-20.4-20.3-20.4z" />
                    <path d="M400.4,82.8L384.1,99c-8,8-8,20.9,0,28.9s20.9,8,28.9,0l16.2-16.2c8-8,8-20.9,0-28.9S408.3,74.8,400.4,82.8z" />
                    <path d="m99,384.1l-16.2,16.2c-8,8-8,20.9 0,28.9 8,8 20.9,8 28.9,0l16.2-16.2c8-8 8-20.9 0-28.9s-20.9-7.9-28.9,0z" />
                    <path d="m413,384.1c-8-8-20.9-8-28.9,0-8,8-8,20.9 0,28.9l16.2,16.2c8,8 20.9,8 28.9,0 8-8 8-20.9 0-28.9l-16.2-16.2z" />
                    <path d="m99,127.9c8,8 20.9,8 28.9,0 8-8 8-20.9 0-28.9l-16.2-16.2c-8-8-20.9-8-28.9,0-8,8-8,20.9 0,28.9l16.2,16.2z" />
                  </g>
                </g>
              </svg>
            </DarkModeIcon>
          ) : (
            <DarkModeIcon
              key="moon"
              initial={{ y: "100%" }}
              animate={{ y: "0%", transition: { delay: 0.3, duration: 0.5 } }}
              exit={{ y: "100%", transition: { duration: 0.5 } }}
            >
              <svg
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
              >
                <g>
                  <g>
                    <path d="m275.4,500.7c-135,0-244.7-109.8-244.7-244.7 1.06581e-14-134.9 109.8-244.7 244.7-244.7 8.2,0 16.4,0.4 24.6,1.2 7.2,0.7 13.5,5.2 16.5,11.7s2.4,14.2-1.6,20.2c-23,33.8-35.2,73.3-35.2,114.2 0,105 78.7,192.2 183.2,202.6 7.2,0.7 13.5,5.2 16.5,11.7 3.1,6.5 2.4,14.2-1.6,20.2-45.8,67.4-121.4,107.6-202.4,107.6zm-12.5-448c-106.5,6.5-191.2,95.2-191.2,203.3 1.42109e-14,112.3 91.4,203.7 203.7,203.7 56.4,0 109.6-23.4 147.8-63.7-46.2-11.7-88.1-36.8-120.8-72.6-41.1-45.2-63.8-103.6-63.8-164.6 0.1-37.1 8.4-73.2 24.3-106.1z" />
                  </g>
                </g>
              </svg>
            </DarkModeIcon>
          )}
        </AnimatePresence>
      </DarkModeIcons>
    </Wrapper>
  );
}

export default Header;
