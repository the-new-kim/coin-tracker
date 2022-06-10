import { motion } from "framer-motion";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { fetchEvents } from "../api";
interface IEvents {
  id: string;
  date: string;
  date_to: string | null;
  name: string;
  description: string;
  is_conference: boolean;
  link: string;
  proof_image_link: string | null;
}

const Board = styled(motion.div)`
  width: 100%;
  min-height: 80px;
  background-color: ${(props) => props.theme.boardBgColor};
  color: ${(props) => props.theme.textColor};
  border-radius: 20px;
  margin-bottom: 10px;
  padding: 20px;
  display: grid;
  grid-template-columns: 1fr 3fr;
  gap: 10px;
`;

const Image = styled.div<{ $bgImg: string }>`
  width: 100%;
  background: url(${(props) => (props.$bgImg ? props.$bgImg : "none")});
  background-size: cover;
  background-position: center center;
  aspect-ratio: 1.6 / 1;
`;
const Text = styled.div`
  width: 100px;
`;

function News() {
  const { coinId } = useParams();
  const { isLoading, data } = useQuery<IEvents[]>(["news", coinId], () =>
    fetchEvents(coinId!)
  );

  const loading = isLoading || !data;

  return (
    <>
      {loading
        ? null
        : data.map(({ description, id, name, link, proof_image_link }) => (
            <Board key={id}>
              <Image
                $bgImg={
                  proof_image_link ||
                  "https://i1.wp.com/fremontgurdwara.org/wp-content/uploads/2020/06/no-image-icon-2.png?w=640"
                }
              ></Image>
              <div>{name}</div>
            </Board>
          ))}
    </>
  );
}

export default News;
