import { useQuery } from "react-query";
import { useOutletContext } from "react-router-dom";
import styled from "styled-components";
import { fetchEvents, IEventsData } from "../api";
import Loader, { LoaderType } from "../components/Loader";

const Category = styled.div`
  position: sticky;
  top: 0;
  background-color: ${(props) => props.theme.bgColor};
  > div {
    display: grid;
    grid-template-columns: 1fr 2fr;
    background-color: ${(props) => props.theme.boardBgColor};
    border-radius: 15px 15px 0 0;
    overflow: hidden;
    border: 2px solid ${(props) => props.theme.boardBgColor};
    gap: 2px;
    > div {
      padding: 15px;
      background-color: ${(props) => props.theme.boardTitleBg};
      white-space: break-spaces;
      line-break: anywhere;
    }
  }
`;

const List = styled.div`
  display: flex;
  flex-direction: column;
  > div {
    display: grid;
    grid-template-columns: 1fr 2fr;
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
      white-space: break-spaces;
      line-break: anywhere;
    }
  }
`;

interface IOutletContext {
  id: string;
}

function Events() {
  const { id } = useOutletContext<IOutletContext>();
  const { data, isLoading } = useQuery<IEventsData[]>(
    ["events", id],
    () => fetchEvents(id),
    { suspense: false }
  );

  return (
    <>
      {isLoading ? (
        <Loader loaderType={LoaderType.DETAIL} />
      ) : (
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
      )}
    </>
  );
}

export default Events;
