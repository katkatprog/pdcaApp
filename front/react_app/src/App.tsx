import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/cycles/Home";
import Trash from "./pages/trash/TrashPage";
import CycleDetailPage from "./pages/cycle_detail/CycleDetailPage";
import "./App.css";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home></Home>}></Route>
          <Route path="/trash" element={<Trash></Trash>}></Route>
          <Route
            path="/:cycleId"
            element={<CycleDetailPage></CycleDetailPage>}
          ></Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
