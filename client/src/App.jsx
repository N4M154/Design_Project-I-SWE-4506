import { BrowserRouter, Route, Routes } from "react-router-dom";
import FloatingChatbot from "./components/Chatbot";
import Layout from "./components/Layout";
import PrivateRoute from "./components/PrivateRoute";
//import Compiler from "./components/Workspace/CodeEditor";
import Home from "./Main/Home";
import About from "./pages/About";
import CLanguagePage from "./pages/CLanguagePage";
import CLearningMaterial from "./pages/CLearningMaterial";
import Compiler from "./pages/Compiler.jsx";
import LandingPage from "./pages/Landing.jsx";
import Notes from "./pages/Notes.tsx";
import Problems from "./pages/Problems.tsx";
import Profile from "./pages/Profile";
import Progress from "./pages/Progress.tsx";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Community from "./pages/CommunityPage.jsx";
import Content from "./pages/Content.jsx";

export default function App() {
  return (
    <BrowserRouter>
      {/* header */}

      <Routes>
        <Route path="/" element={<LandingPage />} />

        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route element={<Layout />}>
          <Route path="/home" element={<Home />} />
          <Route path="/practice" element={<Problems />} />
          <Route path="/notes" element={<Notes />} />
          <Route path="/progress" element={<Progress />} />
          <Route path="/about" element={<About />} />
          <Route path="/compiler" element={<Compiler />} />
          <Route path="/about" element={<About />} />
          <Route path="/community" element={<Community />} />
          <Route path="/courses/c" element={<CLanguagePage />} />
          <Route path="/courses/c/:lessonId" element={<CLearningMaterial />} />
          <Route path="/news" element={<Content />} />

          <Route element={<PrivateRoute />}>
            <Route path="/profile" element={<Profile />} />
          </Route>
        </Route>
      </Routes>
      <FloatingChatbot iconSrc="/chatbot.png" />
    </BrowserRouter>
  );
}
