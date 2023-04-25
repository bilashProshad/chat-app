import { BrowserRouter, Routes, Route } from "react-router-dom";
import Authenticate from "./pages/Authenticate/Authenticate";
import Activate from "./pages/Activate/Activate";
import Messenger from "./pages/Messenger/Messenger";
import { Toaster } from "react-hot-toast";
import PublicRoute from "./components/Route/PublicRoute";
import SemiProtectedRoute from "./components/Route/SemiProtectedRoute";
import ProtectedRoute from "./components/Route/ProtectedRoute";
import store from "./redux/store";
import { useEffect } from "react";
import { loadUser } from "./redux/actions/authAction";

function App() {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

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
          <Route path="/messages" element={<Messenger />} />
        </Route>
      </Routes>

      <Toaster position="bottom-center" />
    </BrowserRouter>
  );
}

export default App;
