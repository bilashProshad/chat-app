import { BrowserRouter, Routes, Route } from "react-router-dom";
import Authenticate from "./pages/Authenticate/Authenticate";
import Activate from "./pages/Activate/Activate";
import Chats from "./pages/Chats/Chats";
import { Toaster } from "react-hot-toast";
import PublicRoute from "./components/Route/PublicRoute";
import SemiProtectedRoute from "./components/Route/SemiProtectedRoute";
import ProtectedRoute from "./components/Route/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PublicRoute />}>
          <Route path="/" element={<Authenticate />} />
        </Route>

        <Route element={<SemiProtectedRoute />}>
          <Route path="/activate" element={<Activate />} />
        </Route>

        <Route element={<ProtectedRoute />}>
          <Route path="/messages" element={<Chats />} />
        </Route>
      </Routes>

      <Toaster position="bottom-center" />
    </BrowserRouter>
  );
}

export default App;
