import { Home } from "./page/home";
import { SinglePage } from "./page/single-page";
import { Routes, Route } from "react-router-dom";
import { Link } from "react-router-dom";
import { UserPage } from "./page/user-page/user-page";
function App() {
  return (
    <>

      <Routes>
        <Route path="/">
          <Route index element={<Home />} />
          <Route path="single/:id" element={<SinglePage />} />
          <Route path="user" element={<UserPage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
