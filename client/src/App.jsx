import { BrowserRouter, Route, Routes } from "react-router-dom";
import FloatingChatbot from "./components/Chatbot";
import Layout from "./components/Layout";
import PrivateRoute from "./components/PrivateRoute";
//import Compiler from "./components/Workspace/CodeEditor";
import Home from "./Main/Home";
import About from "./pages/About";
import Chello from "./pages/Chello.jsx";
import CLanguagePage from "./pages/CLanguagePage";
import Community from "./pages/CommunityPage.jsx";
import Compiler from "./pages/Compiler.jsx";
import Content from "./pages/Content.jsx";
import Cpy from "./pages/Cpy.jsx";
import CQuizPage from "./pages/CQuizPage.jsx";
import Java from "./pages/Java.jsx";
import Javascript from "./pages/Javascript.jsx";
import LandingPage from "./pages/Landing.jsx";
import Notes from "./pages/Notes.tsx";
import Problems from "./pages/Problems.tsx";
import Profile from "./pages/Profile";
import ProfileAnalytics from "./pages/ProfileAnalytics";
import Progress from "./pages/Progress.tsx";
import RoadmapForm from "./pages/RoadMap.jsx";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";

import CodeRoom from "./coderoom/Room.jsx"
import CodeLobby from "./coderoom/Lobby.jsx"
import {SocketProvider} from "./context/SocketProvider.jsx"
export default function App() {
  return (
    <BrowserRouter>
      {/* header */}
      <SocketProvider>
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
          <Route path="/mock" element={<RoadmapForm />} />
          <Route path="/courses/c" element={<CLanguagePage />} />
          <Route path="/courses/python" element={<Cpy />} />
          <Route path="/courses/java" element={<Java />} />
          <Route path="/courses/javascript" element={<Javascript />} />
        <Route path="/codeLobby" element={<CodeLobby />} />
        <Route path="/codeRoom/:roomId" element={<CodeRoom />} />

          <Route path="/courses/c/:lessonId" element={<Chello />} />
          

          <Route path="/courses/c/:lessonId/quiz" element={<CQuizPage />} />
          <Route path="/news" element={<Content />} />

          <Route element={<PrivateRoute />}>
            <Route path="/profile-analytics" element={<ProfileAnalytics />} />
            <Route path="/profile" element={<Profile />} />
          </Route>
        </Route>
      </Routes>
      <FloatingChatbot iconSrc="/chatbot.png" />
      </SocketProvider>
    </BrowserRouter>
  );
}
