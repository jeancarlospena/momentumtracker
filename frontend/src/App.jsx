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
import SideNavigator from "./components/SideNavigator.jsx";

function App() {
  const [count, setCount] = useState(0);
  const { user, authLoaded } = useAuthContext();
  // console.log(user);
  return (
    <>
      <BrowserRouter>
        <div>
          <div>
            {!user && authLoaded && (
              <div className="container-background">
                {/* <div className="container"> */}
                <Header />
                {/* </div> */}

                <Routes>
                  <>
                    <Route path="/signup" element={<SignUp />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/" element={<Home />} />
                    <Route path="*" element={<Navigate to="/" replace />} />
                  </>
                </Routes>
              </div>
            )}
            {user && authLoaded && (
              <>
                <div className="logged-container">
                  <SideNavigator />
                  <div className="main-area">
                    <Routes>
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

                      {/* commented out. dont display navigation if user is logged in instead display sidenavigator*/}
                      {/* {!user && authLoaded && (
                <>
                  <Route path="/signup" element={<SignUp />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="*" element={<Home />} />
                </>
              )} */}
                      <Route path="*" element={<Blanc />} />
                    </Routes>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* <Footer /> */}
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
