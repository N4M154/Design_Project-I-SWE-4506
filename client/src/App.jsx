import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import PrivateRoute from "./components/PrivateRoute";
import Compiler from "./components/Workspace/CodeEditor";
import Home from "./Main/Home";
import About from "./pages/About";
import CLanguagePage from "./pages/CLanguagePage";
import CLearningMaterial from "./pages/CLearningMaterial";
import LandingPage from "./pages/Landing";
import Profile from "./pages/Profile";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route element={<Layout />}>
          <Route path="/home" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/compiler" element={<Compiler />} />

          <Route path="/courses/c" element={<CLanguagePage />} />
          <Route path="/courses/c/:lessonId" element={<CLearningMaterial />} />

          <Route element={<PrivateRoute />}>
            <Route path="/profile" element={<Profile />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
