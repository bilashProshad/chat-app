import { BrowserRouter, Routes, Route } from "react-router-dom";
import Authenticate from "./pages/Authenticate/Authenticate";
import Activate from "./pages/Activate/Activate";
import Chats from "./pages/Chats/Chats";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Authenticate />} />
        <Route path="/activate" element={<Activate />} />
        <Route path="/messages" element={<Chats />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
