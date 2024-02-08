import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useAuthContext } from "./hooks/useAuthContext.jsx";

import Header from "./components/Header.jsx";
import SignUp from "./screens/SignUp.jsx";
import Login from "./screens/Login.jsx";
import Home from "./screens/Home.jsx";
import UserMain from "./screens/UserMain.jsx";
import OrderBreakdown from "./screens/OrderBreakdown.jsx";
import Blanc from "./components/Blanc.jsx";
function App() {
  const [count, setCount] = useState(0);
  const { user, authLoaded } = useAuthContext();

  return (
    <>
      <BrowserRouter>
        <div className="container">
          <Header />
          <Routes>
            {user && (
              <>
                <Route path="/order/:index" element={<OrderBreakdown />} />
                <Route path="/order/:index" element={<OrderBreakdown />} />
                <Route path="*" element={<UserMain />} />
              </>
            )}
            {!user && authLoaded && (
              <>
                <Route path="/signup" element={<SignUp />} />
                <Route path="/login" element={<Login />} />
                <Route path="*" element={<Home />} />
              </>
            )}
            <Route path="*" element={<Blanc />} />
          </Routes>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
