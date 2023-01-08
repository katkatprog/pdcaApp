import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/cycles/Home";
import Trash from "./pages/trash/TrashPage";
import CyclePage from "./pages/cycle_detail/CyclePage";
import "./App.css";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home></Home>}></Route>
          <Route path="/trash" element={<Trash></Trash>}></Route>
          <Route path="/:cycleId" element={<CyclePage></CyclePage>}></Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
