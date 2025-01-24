//----------------------------------------------------------------------------------------------

import axios from "axios";
import {
  BookOpen,
  Brain,
  Code2,
  Cpu,
  PenTool,
  Terminal,
  Timer,
  Trophy,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SideButtons from "../components/SideButtons";

export default function Home() {
  const [problems, setProblems] = useState([]);
  const [isExpanded, setIsExpanded] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(1);
  const { currentUser } = useSelector((state) => state.user);

  const languages = [
    {
      name: "C",
      route: "/courses/c",
      image:
        "https://images.unsplash.com/photo-1629654297299-c8506221ca97?ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80",
      description: "Master the fundamentals of programming with C language.",
      progress: 45,
      features: [
        "System Programming",
        "Memory Management",
        "Algorithms",
        "DSA",
      ],
    },
    {
      name: "Python",
      route: "/courses/python",
      image:
        "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80",
      description:
        "Perfect for beginners. Learn Python's simple syntax and powerful libraries.",
      progress: 65,
      features: ["Data Science", "Web Development", "AI & ML", "Automation"],
    },
    {
      name: "JavaScript",
      route: "/courses/javascript",
      image:
        "https://images.unsplash.com/photo-1627398242454-45a1465c2479?ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80",
      description:
        "Master web development with JavaScript, the language of the browser.",
      progress: 35,
      features: ["Frontend Dev", "Node.js", "React", "Full Stack"],
    },
    {
      name: "Java",
      route: "/courses/java",
      image:
        "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80",
      description:
        "Build robust applications with Java's object-oriented approach.",
      progress: 20,
      features: ["Android Dev", "Enterprise", "Spring Boot", "Microservices"],
    },
  ];

  const stats = [
    { icon: Trophy, label: "Completed Courses", value: "12" },
    { icon: Timer, label: "Learning Hours", value: "156" },
    { icon: Brain, label: "Solved Problems", value: "483" },
    { icon: Code2, label: "Lines of Code", value: "15,234" },
  ];

  const features = [
    {
      icon: Terminal,
      title: "Code Editor",
      description: "Write and test code in browser",
    },
    {
      icon: Brain,
      title: "AI Assistant",
      description: "Get personalized help",
    },
    {
      icon: BookOpen,
      title: "Courses",
      description: "Structured learning paths",
    },
    { icon: PenTool, title: "Practice", description: "Hands-on exercises" },
    { icon: Cpu, title: "Compilation", description: "Instant code results" },
    { icon: Trophy, title: "Achievements", description: "Track your progress" },
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === languages.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? languages.length - 1 : prev - 1));
  };

  useEffect(() => {
    async function fetchProblems() {
      try {
        const response = await axios.get("http://localhost:3000/problemsTable");
        setProblems(response.data.data);
        toast.success("Data loaded successfully");
      } catch (error) {
        console.error("Error fetching problems:", error);
      }
    }

    fetchProblems();
  }, []);

  return (
    <div className="flex min-h-screen bg-white font-['Poppins']">
      <SideButtons />
      <div
        id="main-content"
        className="flex-1 transition-all duration-300"
        style={{ marginLeft: isExpanded ? "260px" : "80px" }}
      >
        {/* Hero Section */}
        <div className="relative h-[400px] bg-gradient-to-r from-yellow-50 via-yellow-100 to-yellow-50">
          <img
            src="https://images.unsplash.com/photo-1623479322729-28b25c16b011?ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80"
            alt="Hero"
            className="absolute inset-0 w-full h-full object-cover object-center rounded-2xl opacity-90"
          />
          <div className="relative container mx-auto px-6 h-full flex items-center">
            <div className="max-w-3xl">
              <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">
                Welcome back,{" "}
                <span className="text-yellow-600">{currentUser.username}</span>
              </h1>
              <p className="text-xl md:text-2xl mb-6 text-white leading-relaxed">
                Ready to continue your coding journey?
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/learning-path">
                  <button className="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-2 rounded-xl font-bold text-base transition duration-300 transform hover:scale-105 hover:shadow-lg">
                    Continue Learning
                  </button>
                </Link>
                <Link to="/practice">
                  <button className="bg-white/80 backdrop-blur border-2 border-yellow-500 text-yellow-600 hover:bg-yellow-50 px-6 py-2 rounded-xl font-bold text-base transition duration-300 transform hover:scale-105 hover:shadow-lg">
                    Practice Now
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Language Cards Section - Replace the existing Language Cards section with this code */}
        <div className="py-32 bg-white">
          <div className="container mx-auto px-12">
            <h2 className="text-2xl md:text-5xl font-bold text-center text-gray-900 mb-12">
              Choose Your Path
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {languages.map((language, index) => (
                <Link
                  key={index}
                  to={language.route}
                  className="group relative overflow-hidden rounded-2xl transition-all duration-500 hover:shadow-2xl"
                >
                  <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-black/80 z-10" />
                  <img
                    src={language.image}
                    alt={language.name}
                    className="w-full h-[400px] object-cover transform transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 z-20 p-6 flex flex-col justify-between">
                    {/* Top Content */}
                    <div>
                      <h3 className="text-3xl font-bold text-white mb-2">
                        {language.name}
                      </h3>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {language.features.map((feature, i) => (
                          <span
                            key={i}
                            className="bg-white/20 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-medium"
                          >
                            {feature}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Bottom Content */}
                    <div className="transform translate-y-8 transition-transform duration-500 group-hover:translate-y-0">
                      <p className="text-white/90 mb-4 line-clamp-2">
                        {language.description}
                      </p>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between text-white">
                          <span className="text-sm font-semibold">
                            Progress
                          </span>
                          <span className="text-sm">{language.progress}%</span>
                        </div>
                        <div className="h-2 bg-white/30 rounded-full overflow-hidden">
                          <div
                            style={{ width: `${language.progress}%` }}
                            className="h-2 bg-yellow-500 rounded-full transform origin-left transition-transform duration-500 group-hover:scale-x-105"
                          />
                        </div>
                        <button className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-semibold py-2 rounded-xl transition-all duration-300 transform group-hover:scale-200">
                          Continue Learning
                        </button>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
        {/* Stats Section */}
        <div className="bg-gradient-to-b from-white to-yellow-50 py-12">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <div
                    key={index}
                    className="bg-gradient-to-br from-yellow-50 to-white rounded-xl p-6 transform hover:scale-105 transition duration-300 shadow-md border border-yellow-200/50"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <Icon className="text-yellow-600" size={32} />
                      <span className="text-3xl font-bold text-gray-900">
                        {stat.value}
                      </span>
                    </div>
                    <h3 className="text-base text-gray-700 font-medium">
                      {stat.label}
                    </h3>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="py-12 bg-yellow-50">
          <div className="container mx-auto px-6">
            <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-900 mb-8">
              Everything You Need
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <div
                    key={index}
                    className="group bg-white p-6 rounded-xl transform transition-all duration-300 hover:scale-105 hover:shadow-lg border border-yellow-200/50"
                  >
                    <div className="mb-4 transform transition-all duration-300 group-hover:scale-110">
                      <Icon className="w-10 h-10 text-yellow-600" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-gray-700">
                      {feature.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Progress Section */}
        <div className="bg-white py-12">
          <div className="container mx-auto px-6">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8 text-center">
              Your Progress
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gradient-to-br from-yellow-50 to-white rounded-xl p-6 shadow-md border border-yellow-200/50">
                <h3 className="text-lg font-bold text-gray-900 mb-4">
                  Latest Achievements
                </h3>
                <div className="space-y-3">
                  {[
                    "Completed Python Basics",
                    "Solved 50 Problems",
                    "7-Day Streak",
                    "First Place in Weekly Challenge",
                    "Completed Advanced JavaScript",
                  ].map((achievement, index) => (
                    <div
                      key={index}
                      className="flex items-center space-x-3 p-3 bg-white rounded-lg transform hover:scale-102 transition duration-300 shadow-sm"
                    >
                      <Trophy className="text-yellow-600" size={20} />
                      <span className="text-sm text-gray-800">
                        {achievement}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-gradient-to-br from-yellow-50 to-white rounded-xl p-6 shadow-md border border-yellow-200/50">
                <h3 className="text-lg font-bold text-gray-900 mb-4">
                  Learning Streak
                </h3>
                <div className="grid grid-cols-7 gap-2">
                  {[...Array(7)].map((_, index) => (
                    <div
                      key={index}
                      className={`h-20 rounded-lg ${
                        index < 5
                          ? "bg-gradient-to-br from-yellow-400 to-yellow-500"
                          : "bg-yellow-100"
                      } transition-all duration-300 hover:scale-105 cursor-pointer relative group shadow-sm`}
                      title={`Day ${index + 1}`}
                    >
                      <div className="absolute inset-0 bg-yellow-600 opacity-0 group-hover:opacity-20 rounded-lg transition-opacity duration-300"></div>
                    </div>
                  ))}
                </div>
                <p className="text-base text-gray-700 mt-4 text-center font-medium">
                  🔥 Keep up the 5-day streak!
                </p>
              </div>
            </div>
          </div>
        </div>

        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </div>
    </div>
  );
}
