import { useState, Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuthContext } from "./hooks/useAuthContext.jsx";
import Footer from "./components/Footer.jsx";
import Loading from "./components/Loading.js";

// import Header from "./components/Header.jsx";
// import SignUp from "./screens/SignUp.jsx";
// import Login from "./screens/Login.jsx";
// import Home from "./screens/Home.jsx";
// import UserMain from "./screens/UserMain.jsx";
// import OrderBreakdown from "./screens/OrderBreakdown.jsx";
// import Blanc from "./components/Blanc.jsx";
// import Profile from "./screens/Profile.jsx";
// import Calendar from "./screens/Calendar.jsx";
// import Footer from "./components/Footer.jsx";
// import TradesInDay from "./screens/TradesInDay.jsx";
// import AccountSubscription from "./screens/AccountSubscription.jsx";
// import Chart2 from "./charts2/Chart2.jsx";
// import SideNavigator from "./components/SideNavigator.jsx";

// import Loading from "./components/Loading.js";

// Public (unauthenticated) routes
const Header = lazy(() => import("./components/Header.jsx"));
const SignUp = lazy(() => import("./screens/SignUp.jsx"));
const Login = lazy(() => import("./screens/Login.jsx"));
const Home = lazy(() => import("./screens/Home.jsx"));
const FrequentlyAsked = lazy(() => import("./screens/FrequentlyAsked.jsx"));

// Private (authenticated) routes
const UserMain = lazy(() => import("./screens/UserMain.jsx"));
const OrderBreakdown = lazy(() => import("./screens/OrderBreakdown.jsx"));
const Profile = lazy(() => import("./screens/Profile.jsx"));
const Calendar = lazy(() => import("./screens/Calendar.jsx"));
const TradesInDay = lazy(() => import("./screens/TradesInDay.jsx"));
const Signals = lazy(() => import("./screens/Signals.jsx"));
const AccountSubscription = lazy(() =>
  import("./screens/AccountSubscription.jsx")
);
const Chart2 = lazy(() => import("./charts2/Chart2.jsx"));
const SideNavigator = lazy(() => import("./components/SideNavigator.jsx"));
const Blanc = lazy(() => import("./components/Blanc.jsx"));
const TradesImport = lazy(() => import("./screens/TradesImport.jsx"));

function App() {
  const [count, setCount] = useState(0);
  const { user, authLoaded } = useAuthContext();
  // (user);
  return (
    <Suspense fallback={<Loading />}>
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
                    <Route path="/faq" element={<FrequentlyAsked />} />
                    <Route path="/" element={<Home />} />
                    <Route path="*" element={<Navigate to="/" replace />} />
                  </>
                </Routes>
                <Footer />
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
                            path="/order/:orderid"
                            element={<OrderBreakdown />}
                          />
                          <Route path="/dashboard" element={<UserMain />} />
                          <Route path="/calendar" element={<Calendar />} />
                          <Route
                            path="/tradesinday/:date"
                            element={<TradesInDay />}
                          />
                          <Route path="/loading" element={<Loading />} />
                          <Route
                            path="/subscription"
                            element={<AccountSubscription />}
                          />
                          <Route
                            path="/import-trades"
                            element={<TradesImport />}
                          />
                          <Route path="/signals" element={<Signals />} />
                          <Route path="/c2" element={<Chart2 />} />
                        </>
                      )}

                      <Route path="*" element={<Profile />} />
                    </Routes>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* <Footer /> */}
        </div>
      </BrowserRouter>
    </Suspense>
  );
}

export default App;
