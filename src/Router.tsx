import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./Layout";
import Detail from "./routes/Detail";
import Home from "./routes/Home";
import Info from "./routes/Info";

import Search from "./routes/Search";

function Router() {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path=":id" element={<Detail />}>
            <Route path="info" element={<Info />} />
          </Route>
          <Route path="search" element={<Search />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
