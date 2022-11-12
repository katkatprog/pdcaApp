import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Cycle from "./pages/Cycle";
import Home from "./pages/home/Home";
import Trash from "./pages/trash/Trash";
import "./App.css";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home></Home>}></Route>
          <Route path="/trash" element={<Trash></Trash>}></Route>
          <Route path="/:cycleId" element={<Cycle></Cycle>}></Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
