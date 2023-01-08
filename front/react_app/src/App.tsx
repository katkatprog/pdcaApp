import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { CyclesPage } from "./pages/cycles/CyclesPage";
import { TrashPage } from "./pages/trash/TrashPage";
import { CycleDetailPage } from "./pages/cycle_detail/CycleDetailPage";
import "./App.css";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<CyclesPage></CyclesPage>}></Route>
          <Route path="/trash" element={<TrashPage></TrashPage>}></Route>
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
