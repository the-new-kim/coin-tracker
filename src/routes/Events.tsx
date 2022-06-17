import { useQuery } from "react-query";
import { useOutletContext } from "react-router-dom";
import styled from "styled-components";
import { fetchEvents, IEventsData } from "../api";

const Category = styled.div`
  position: sticky;
  top: 0;
  background-color: ${(props) => props.theme.bgColor};
  > div {
    display: grid;
    grid-template-columns: 1fr 1fr;
    background-color: ${(props) => props.theme.boardBgColor};
    border-radius: 15px 15px 0 0;
    overflow: hidden;
    border: 2px solid ${(props) => props.theme.boardBgColor};
    gap: 2px;
    > div {
      padding: 15px;
      background-color: rgb(20, 20, 20);
    }
  }
`;

const List = styled.div`
  display: flex;
  flex-direction: column;

  > div {
    display: grid;
    grid-template-columns: 1fr 1fr;
    background-color: ${(props) => props.theme.boardBgColor};
    gap: 2px;
    border: 2px solid ${(props) => props.theme.boardBgColor};
    border-top: none;
    overflow: hidden;
    :last-child {
      border-radius: 0 0 15px 15px;
    }

    > div {
      padding: 15px;
      background-color: ${(props) => props.theme.bgColor};
    }
  }
`;

interface IOutletContext {
  id: string;
}

function Events() {
  const { id } = useOutletContext<IOutletContext>();
  const { data } = useQuery<IEventsData[]>(
    ["events", id],
    () => fetchEvents(id),
    { suspense: false }
  );

  return (
    <>
      <Category>
        <div>
          <div>Date</div>
          <div>Event description</div>
        </div>
      </Category>
      <List>
        {!data || !data.length ? (
          <div>
            <div>-</div>
            <div>-</div>
          </div>
        ) : (
          data.map(({ id, date, description }) => (
            <div key={id}>
              <div>
                {date
                  ? new Date(date + "").toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })
                  : "-"}
              </div>
              <div>{description ? description : "-"}</div>
            </div>
          ))
        )}
      </List>
    </>
  );
}

export default Events;