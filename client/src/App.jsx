import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Main/Home";
import About from "./pages/About";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Profile from "./pages/Profile";
import Header from "./components/Header";
import PrivateRoute from "./components/PrivateRoute";
import Layout from "./components/Layout";
import Compiler from "./components/Workspace/CodeEditor";
import LandingPage from "./pages/Landing";
import CLanguagePage from "./pages/CLanguagePage";
import CLearningMaterial from "./pages/CLearningMaterial";
import FloatingChatbot from "./components/Chatbot";
export default function App() {
  return (
    <BrowserRouter>
      {/* header */}

      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />\
        <Route element={<Layout />}>
          <Route path="/home" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/compiler" element={<Compiler />} />
          <Route path="/about" element={<About />} />
          <Route path="/courses/c" element={<CLanguagePage />} />
          <Route path="/courses/c/:lessonId" element={<CLearningMaterial />} />

          <Route element={<PrivateRoute />}>
            <Route path="/profile" element={<Profile />} />
          </Route>
        </Route>
      </Routes>
      <FloatingChatbot iconSrc="/chatbot.png" />
    </BrowserRouter>
  );
}
