import { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuthContext } from "./hooks/useAuthContext.jsx";

import Header from "./components/Header.jsx";
import SignUp from "./screens/SignUp.jsx";
import Login from "./screens/Login.jsx";
import Home from "./screens/Home.jsx";
import UserMain from "./screens/UserMain.jsx";
// import OrderBreakdown from "./screens/OrderBreakdown.jsx";
import OrderBreakdown from "./screens/OrderBreakdown.jsx";
import Blanc from "./components/Blanc.jsx";
import Profile from "./screens/Profile.jsx";

function App() {
  const [count, setCount] = useState(0);
  const { user, authLoaded } = useAuthContext();
  // console.log(user);
  return (
    <>
      <BrowserRouter>
        <div className="container">
          <Header />
          <Routes>
            {user && (
              <>
                {!user.activeAccount?.unAveilable && (
                  <>
                    {" "}
                    <Route path="/order/:index" element={<OrderBreakdown />} />
                    <Route path="/order/:index" element={<OrderBreakdown />} />
                    <Route path="/dashboard" element={<UserMain />} />
                  </>
                )}

                <Route path="*" element={<Profile />} />
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
