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
import Calendar from "./screens/Calendar.jsx";
import Footer from "./components/Footer.jsx";
import TradesInDay from "./screens/TradesInDay.jsx";
import AccountSubscription from "./screens/AccountSubscription.jsx";
import Chart2 from "./charts2/Chart2.jsx";

function App() {
  const [count, setCount] = useState(0);
  const { user, authLoaded } = useAuthContext();
  // console.log(user);
  return (
    <>
      <BrowserRouter>
        <div className="container">
          <div>
            <Header />
            <Routes>
              {user && (
                <>
                  {!user.activeAccount?.unAveilable && (
                    <>
                      {" "}
                      <Route
                        path="/order/:index"
                        element={<OrderBreakdown />}
                      />
                      <Route path="/dashboard" element={<UserMain />} />
                      <Route path="/calendar" element={<Calendar />} />
                      <Route
                        path="/tradesinday/:date"
                        element={<TradesInDay />}
                      />
                      <Route
                        path="/subscription"
                        element={<AccountSubscription />}
                      />
                      <Route path="/c2" element={<Chart2 />} />
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

          {/* <Footer /> */}
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
