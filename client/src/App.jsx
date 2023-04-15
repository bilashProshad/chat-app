import { BrowserRouter, Routes, Route } from "react-router-dom";
import Authenticate from "./pages/Authenticate/Authenticate";
import Activate from "./pages/Activate/Activate";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Authenticate />} />
        <Route path="/activate" element={<Activate />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
