import React from "react";
// We use Route in order to define the different routes of our application
import { Route, Routes } from "react-router-dom";

// We import all the components we need in our app
import Navbar from "./components/navbar";
import LandingPage from "./components/pages/landingPage";
import ProfilePage from "./components/pages/profilePage";
import About from "./components/pages/AboutUs";
import Login from "./components/pages/loginPage";
import Signup from "./components/pages/registerPage";
import MBTAAlerts from "./components/pages/mbtaAlerts";
import RoutePatternsPage from "./components/pages/routePatterns";
import EditUserPage from "./components/pages/editUserPage";
import AddCommentPage from "./components/pages/AddCommentPage";
import { createContext, useState, useEffect } from "react";
import getUserInfo from "./utilities/decodeJwt";

export const UserContext = createContext();
//test change
//test again
const App = () => {
  const [user, setUser] = useState();

  useEffect(() => {
    setUser(getUserInfo());
  }, []);

  return (
    <>
      <Navbar />
      <UserContext.Provider value={user}>
        <Routes>
          <Route exact path="/" element={<LandingPage />} />
          <Route exact path="/profile" element={<ProfilePage />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/signup" element={<Signup />} />
          <Route path="/mbtaAlerts" element={<MBTAAlerts />} />
          <Route path="/routePatterns" element={<RoutePatternsPage />} />
          <Route path="/About" element={<About />} />
          <Route path="/editUserPage" element={<EditUserPage />} />
          <Route path="/addCommentPage" element={<AddCommentPage />} />
        </Routes>
      </UserContext.Provider>
    </>
  );
};



export default App
