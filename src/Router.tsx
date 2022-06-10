import { BrowserRouter, Route, Routes } from "react-router-dom";
import Coin from "./routes/Coin";
import Coins from "./routes/Coins";
import News from "./routes/News";
import Price from "./routes/Price";

function Router() {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Routes>
        <Route path="/" element={<Coins />} />
        <Route path="/:coinId" element={<Coin />}>
          <Route path="news" element={<News />} />{" "}
          <Route path="price" element={<Price />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
