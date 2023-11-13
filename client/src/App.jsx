import { Routes, Route, BrowserRouter } from "react-router-dom";

import Feed from "./pages/Feed";
import Home from "./pages/Home";
import Profile from "./pages/Profile";

import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/home" element={<Home />} />
        <Route path="/feed" element={<Feed />} />
        <Route path="/profile" element={<Profile />} />

        <Route path="*" element={<h1>Not Found!</h1>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
