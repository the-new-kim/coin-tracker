import { BrowserRouter, Route, Routes } from "react-router-dom";

import Layout from "./Layout";

import Home from "./routes/Home";

import Detail from "./routes/Detail";

// import Chart from "./components/Chart";
import Details from "./routes/Details";
import Events from "./routes/Events";
import Twitter from "./routes/Twitter";
import Team from "./routes/Team";

import Search from "./routes/Search";
import NotFound from "./routes/NotFound";

function Router() {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path=":id" element={<Detail />}>
            <Route path="details" element={<Details />} />
            <Route path="events" element={<Events />} />
            <Route path="twitter" element={<Twitter />} />
            <Route path="team" element={<Team />} />
          </Route>
          <Route path="search" element={<Search />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
