import { Route, Routes } from "react-router-dom";
import Congratulations from "../../pages/AuthProcess/Congratulations/Congratulations";
import SignIn from "../../pages/AuthProcess/SignIn/SignIn";
import SignUp from "../../pages/AuthProcess/SignUp/SignUp";
import Verification from "../../pages/AuthProcess/Verification/Verification";
import Posts from "../../pages/Posts/posts";
import Profile from "../../pages/Profile/Profile";
import "./App.css";
import FindFirends from "../../pages/Find-Friends/find-firends";
import RouteProtection from "../HOC/RouteProtection";
import EditProfile from "../../pages/EditProfile/EditProfile";


function Home() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<RouteProtection route={<Posts />}/>} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/congratulations" element={<Congratulations />} />
        <Route path="/verification" element={<Verification />} />
        <Route path="/posts" element={<RouteProtection route={<Posts />}/>} />
        <Route path="/find-friends" element={<RouteProtection route={<FindFirends />}/>} />
        <Route path="/profile" element={<RouteProtection route={<Profile />}/>} />
        <Route path="/profile/:profileId" element={<RouteProtection route={<Profile />}/>} />
        <Route path="/edit-profile" element={<RouteProtection route={<EditProfile />}/>} />
      </Routes>
    </div>
  );
}

export default Home;
