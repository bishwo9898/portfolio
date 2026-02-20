"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useTheme } from "./theme-context";
import { getThemeConfig } from "./theme-config";
import { getThemeClasses } from "./theme-utils";

export default function Home() {
  const { theme } = useTheme();
  const themeConfig = getThemeConfig(theme);
  const themeClasses = getThemeClasses(theme);
  const [activeSection, setActiveSection] = useState("home");
  const [isVisible, setIsVisible] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [formStatus, setFormStatus] = useState("");

  useEffect(() => {
    setIsVisible(true);

    const handleScroll = () => {
      const sections = ["home", "about", "skills", "projects", "contact"];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const height = element.offsetHeight;

          if (
            scrollPosition >= offsetTop &&
            scrollPosition < offsetTop + height
          ) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: "smooth" });
  };

  const handleFormChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus("sending");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setFormStatus("success");
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        setFormStatus("error");
      }
    } catch (error) {
      setFormStatus("error");
    }
  };

  // Theme-specific navigation styling
  const navLogoGradient =
    theme === "colorful"
      ? "bg-gradient-to-br from-pink-400 to-purple-500"
      : theme === "light"
        ? "bg-gradient-to-br from-blue-400 to-cyan-400"
        : theme === "dark"
          ? "bg-gradient-to-br from-cyan-500 to-blue-600"
          : "bg-gradient-to-br from-amber-600 to-yellow-700";

  const navLogoText =
    theme === "colorful"
      ? "from-pink-600 to-purple-600"
      : theme === "light"
        ? "from-blue-600 to-cyan-600"
        : theme === "dark"
          ? "from-cyan-300 to-blue-300"
          : "from-amber-800 to-yellow-800";

  const navBtn =
    theme === "colorful"
      ? "bg-gradient-to-r from-pink-300 to-purple-300 text-white"
      : theme === "light"
        ? "bg-gradient-to-r from-blue-200 to-cyan-200 text-blue-700"
        : theme === "dark"
          ? "bg-cyan-500/20 text-cyan-300"
          : "bg-gradient-to-r from-amber-200 to-yellow-200 text-amber-900";

  return (
    <div className={`min-h-screen ${themeClasses.mainBg}`}>
      {/* Navigation */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 ${themeClasses.navBg} backdrop-blur-sm shadow-lg ${themeClasses.navBorder}`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            {/* Logo */}
            <button
              onClick={() => scrollToSection("home")}
              className="flex items-center gap-2 hover:scale-110 transition-transform duration-300"
            >
              <div
                className={`w-12 h-12 rounded-2xl ${navLogoGradient} flex items-center justify-center shadow-lg transform hover:rotate-12 transition-transform`}
              >
                <span className="text-white font-black text-lg">BB</span>
              </div>
              <div className="hidden sm:block">
                <p
                  className={`text-sm font-black text-transparent bg-gradient-to-r ${navLogoText} bg-clip-text leading-tight`}
                >
                  Bishwo Biraj
                </p>
              </div>
            </button>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-3">
              {["Home", "About", "Skills", "Projects", "Contact"].map(
                (item) => (
                  <button
                    key={item}
                    onClick={() => scrollToSection(item.toLowerCase())}
                    className={`px-5 py-2 text-sm font-bold rounded-2xl transition-all duration-300 transform hover:scale-105 ${
                      activeSection === item.toLowerCase()
                        ? navBtn
                        : theme === "colorful"
                          ? "text-gray-700 hover:bg-yellow-100/60"
                          : theme === "light"
                            ? "text-blue-700 hover:bg-blue-100"
                            : theme === "dark"
                              ? "text-gray-300 hover:bg-slate-700/50"
                              : "text-amber-700 hover:bg-amber-100"
                    }`}
                  >
                    {item}
                  </button>
                ),
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              className={`md:hidden p-2 transition-colors rounded-xl ${
                theme === "colorful"
                  ? "text-purple-600 hover:text-purple-800 hover:bg-purple-100"
                  : theme === "light"
                    ? "text-blue-600 hover:text-blue-800 hover:bg-blue-100"
                    : theme === "dark"
                      ? "text-cyan-400 hover:text-cyan-300 hover:bg-slate-700/50"
                      : "text-amber-700 hover:text-amber-900 hover:bg-amber-100"
              }`}
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section
        id="home"
        className={`min-h-screen flex items-center justify-center pt-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden ${themeClasses.mainBg}`}
      >
        {/* Animated Background Elements - Theme Aware */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {theme === "colorful" && (
            <>
              <div
                className="absolute top-10 left-5 w-40 h-40 bg-yellow-300/20 rounded-full blur-2xl"
                style={{ animation: "bounce 4s ease-in-out infinite" }}
              ></div>
              <div
                className="absolute top-32 right-10 w-52 h-52 bg-pink-300/15 rounded-full blur-2xl"
                style={{
                  animation: "pulse 3s ease-in-out infinite",
                  animationDelay: "0.5s",
                }}
              ></div>
              <div
                className="absolute bottom-10 left-1/4 w-48 h-48 bg-purple-300/15 rounded-full blur-2xl"
                style={{
                  animation: "bounce 5s ease-in-out infinite",
                  animationDelay: "1s",
                }}
              ></div>
            </>
          )}
          {theme === "light" && (
            <>
              <div
                className="absolute top-10 left-5 w-40 h-40 bg-blue-300/20 rounded-full blur-2xl"
                style={{ animation: "bounce 4s ease-in-out infinite" }}
              ></div>
              <div
                className="absolute top-32 right-10 w-52 h-52 bg-cyan-300/15 rounded-full blur-2xl"
                style={{
                  animation: "pulse 3s ease-in-out infinite",
                  animationDelay: "0.5s",
                }}
              ></div>
            </>
          )}
          {theme === "dark" && (
            <>
              <div
                className="absolute top-10 left-5 w-40 h-40 bg-cyan-500/10 rounded-full blur-2xl"
                style={{ animation: "bounce 4s ease-in-out infinite" }}
              ></div>
              <div
                className="absolute top-32 right-10 w-52 h-52 bg-blue-500/10 rounded-full blur-2xl"
                style={{
                  animation: "pulse 3s ease-in-out infinite",
                  animationDelay: "0.5s",
                }}
              ></div>
            </>
          )}
          {theme === "elegant" && (
            <>
              <div
                className="absolute top-10 left-5 w-40 h-40 bg-amber-300/20 rounded-full blur-2xl"
                style={{ animation: "bounce 4s ease-in-out infinite" }}
              ></div>
              <div
                className="absolute top-32 right-10 w-52 h-52 bg-yellow-300/15 rounded-full blur-2xl"
                style={{
                  animation: "pulse 3s ease-in-out infinite",
                  animationDelay: "0.5s",
                }}
              ></div>
            </>
          )}
        </div>

        <div className="max-w-7xl mx-auto w-full relative z-10">
          <div
            className={`transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
          >
            <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
              {/* Profile Image */}
              <div className="flex-shrink-0">
                <div className="relative group">
                  <div
                    className={`absolute -inset-2 rounded-full blur-lg opacity-60 group-hover:opacity-100 transition duration-500 ${
                      theme === "colorful"
                        ? "bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400"
                        : theme === "light"
                          ? "bg-gradient-to-r from-blue-400 to-cyan-400"
                          : theme === "dark"
                            ? "bg-gradient-to-r from-cyan-500 to-blue-600"
                            : "bg-gradient-to-r from-amber-500 to-yellow-600"
                    }`}
                    style={{ animationDuration: "3s" }}
                  ></div>
                  <div
                    className={`relative w-48 h-48 sm:w-64 sm:h-64 lg:w-80 lg:h-80 rounded-full overflow-hidden border-8 shadow-2xl flex items-center justify-center transform group-hover:scale-105 transition-transform duration-300 ${
                      theme === "colorful"
                        ? "border-white"
                        : theme === "light"
                          ? "border-blue-100"
                          : theme === "dark"
                            ? "border-slate-700"
                            : "border-amber-100"
                    }`}
                    style={{
                      boxShadow:
                        theme === "colorful"
                          ? "0 0 30px rgba(236, 72, 153, 0.3)"
                          : theme === "light"
                            ? "0 0 30px rgba(59, 130, 246, 0.3)"
                            : theme === "dark"
                              ? "0 0 30px rgba(34, 197, 246, 0.3)"
                              : "0 0 30px rgba(217, 119, 6, 0.3)",
                    }}
                  >
                    <Image
                      src="/me.jpeg"
                      alt="Bishwo Biraj Dallakoti"
                      fill
                      className="object-cover"
                      priority
                      quality={95}
                      unoptimized={false}
                      sizes="(max-width: 640px) 192px, (max-width: 1024px) 256px, 320px"
                    />
                  </div>
                </div>
              </div>

              {/* Bio Content */}
              <div className="flex-1 text-center lg:text-left space-y-6">
                <div className="space-y-4">
                  <h1
                    className={`text-5xl sm:text-6xl lg:text-7xl font-black bg-clip-text text-transparent drop-shadow-lg ${
                      theme === "colorful"
                        ? "bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600"
                        : theme === "light"
                          ? "bg-gradient-to-r from-blue-600 to-cyan-600"
                          : theme === "dark"
                            ? "bg-gradient-to-r from-cyan-400 to-blue-400"
                            : "bg-gradient-to-r from-amber-700 to-yellow-700"
                    }`}
                  >
                    Hi, I'm Bishwo! 👋
                  </h1>
                  {/* Badges */}
                  <div className="flex flex-wrap gap-3 justify-center lg:justify-start">
                    {theme === "colorful" && (
                      <>
                        <span className="px-6 py-3 bg-gradient-to-r from-yellow-300 to-orange-400 text-white rounded-3xl text-sm font-bold shadow-lg hover:shadow-xl hover:scale-105 transition-all transform duration-300 active:scale-95">
                          Full Stack Developer
                        </span>
                        <span className="px-6 py-3 bg-gradient-to-r from-pink-400 to-rose-400 text-white rounded-3xl text-sm font-bold shadow-lg hover:shadow-xl hover:scale-105 transition-all transform duration-300 active:scale-95">
                          CS Student
                        </span>
                        <span className="px-6 py-3 bg-gradient-to-r from-purple-400 to-indigo-500 text-white rounded-3xl text-sm font-bold shadow-lg hover:shadow-xl hover:scale-105 transition-all transform duration-300 active:scale-95">
                          Problem Solver
                        </span>
                      </>
                    )}
                    {theme === "light" && (
                      <>
                        <span className="px-6 py-3 bg-gradient-to-r from-blue-300 to-cyan-400 text-white rounded-3xl text-sm font-bold shadow-lg hover:shadow-xl hover:scale-105 transition-all transform duration-300 active:scale-95">
                          Full Stack Developer
                        </span>
                        <span className="px-6 py-3 bg-gradient-to-r from-cyan-400 to-blue-500 text-white rounded-3xl text-sm font-bold shadow-lg hover:shadow-xl hover:scale-105 transition-all transform duration-300 active:scale-95">
                          CS Student
                        </span>
                        <span className="px-6 py-3 bg-gradient-to-r from-blue-400 to-cyan-500 text-white rounded-3xl text-sm font-bold shadow-lg hover:shadow-xl hover:scale-105 transition-all transform duration-300 active:scale-95">
                          Problem Solver
                        </span>
                      </>
                    )}
                    {theme === "dark" && (
                      <>
                        <span className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-3xl text-sm font-bold shadow-lg hover:shadow-xl hover:scale-105 transition-all transform duration-300 active:scale-95">
                          Full Stack Developer
                        </span>
                        <span className="px-6 py-3 bg-gradient-to-r from-blue-600 to-slate-700 text-cyan-300 rounded-3xl text-sm font-bold shadow-lg hover:shadow-xl hover:scale-105 transition-all transform duration-300 active:scale-95">
                          CS Student
                        </span>
                        <span className="px-6 py-3 bg-slate-700 text-cyan-400 rounded-3xl text-sm font-bold shadow-lg hover:shadow-xl hover:scale-105 transition-all transform duration-300 active:scale-95">
                          Problem Solver
                        </span>
                      </>
                    )}
                    {theme === "elegant" && (
                      <>
                        <span className="px-6 py-3 bg-gradient-to-r from-amber-500 to-yellow-600 text-white rounded-3xl text-sm font-bold shadow-lg hover:shadow-xl hover:scale-105 transition-all transform duration-300 active:scale-95">
                          Full Stack Developer
                        </span>
                        <span className="px-6 py-3 bg-gradient-to-r from-yellow-600 to-amber-700 text-white rounded-3xl text-sm font-bold shadow-lg hover:shadow-xl hover:scale-105 transition-all transform duration-300 active:scale-95">
                          CS Student
                        </span>
                        <span className="px-6 py-3 bg-gradient-to-r from-amber-700 to-yellow-700 text-white rounded-3xl text-sm font-bold shadow-lg hover:shadow-xl hover:scale-105 transition-all transform duration-300 active:scale-95">
                          Problem Solver
                        </span>
                      </>
                    )}
                  </div>
                </div>

                <div className="space-y-4">
                  <p
                    className={`text-xl leading-relaxed font-semibold ${
                      theme === "colorful"
                        ? "text-purple-900"
                        : theme === "light"
                          ? "text-blue-700"
                          : theme === "dark"
                            ? "text-cyan-200"
                            : "text-amber-900"
                    }`}
                  >
                    I'm a passionate Computer Science student with a deep love
                    for technology and innovation. My journey in tech has been
                    driven by curiosity and a desire to create solutions that
                    make a difference.
                  </p>
                  <p
                    className={`text-lg leading-relaxed ${
                      theme === "colorful"
                        ? "text-purple-800"
                        : theme === "light"
                          ? "text-blue-600"
                          : theme === "dark"
                            ? "text-cyan-300"
                            : "text-amber-800"
                    }`}
                  >
                    I specialize in full-stack development, with experience in
                    building scalable web applications, mobile apps, and
                    exploring emerging technologies. Always eager to learn new
                    skills and tackle challenging projects!
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-6">
                  <button
                    onClick={() => scrollToSection("projects")}
                    className={`group px-8 py-4 text-white rounded-full font-bold hover:shadow-2xl hover:scale-110 transition-all duration-300 flex items-center justify-center gap-2 transform active:scale-95 shadow-lg ${
                      theme === "colorful"
                        ? "bg-gradient-to-r from-pink-500 to-purple-600"
                        : theme === "light"
                          ? "bg-gradient-to-r from-blue-500 to-cyan-500"
                          : theme === "dark"
                            ? "bg-gradient-to-r from-cyan-500 to-blue-600"
                            : "bg-gradient-to-r from-amber-600 to-yellow-700"
                    }`}
                  >
                    View My Work
                    <span className="group-hover:translate-x-1 transition-transform text-xl">
                      →
                    </span>
                  </button>
                  <button
                    onClick={() => scrollToSection("contact")}
                    className={`group px-8 py-4 border-4 rounded-full font-bold hover:scale-110 transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transform active:scale-95 ${
                      theme === "colorful"
                        ? "border-purple-500 bg-white text-purple-600 hover:bg-purple-50"
                        : theme === "light"
                          ? "border-blue-500 bg-blue-50 text-blue-600 hover:bg-blue-100"
                          : theme === "dark"
                            ? "border-cyan-500 bg-slate-800 text-cyan-400 hover:bg-slate-700"
                            : "border-amber-600 bg-amber-50 text-amber-700 hover:bg-amber-100"
                    }`}
                  >
                    Get In Touch
                    <span className="group-hover:translate-x-1 transition-transform text-xl">
                      ✉️
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section - Quick Facts Stats */}
      <section
        id="about"
        className={`py-20 px-4 sm:px-6 lg:px-8 ${
          theme === "colorful"
            ? "bg-white"
            : theme === "light"
              ? "bg-blue-50"
              : theme === "dark"
                ? "bg-slate-800"
                : "bg-amber-50"
        }`}
      >
        <div className="max-w-6xl mx-auto w-full">
          <h2
            className={`text-4xl sm:text-5xl font-bold text-center mb-4 ${
              theme === "colorful"
                ? "text-gray-900"
                : theme === "light"
                  ? "text-blue-900"
                  : theme === "dark"
                    ? "text-cyan-300"
                    : "text-amber-900"
            }`}
          >
            Why Work With Me?
          </h2>
          <p
            className={`text-center mb-16 text-lg ${
              theme === "colorful"
                ? "text-gray-600"
                : theme === "light"
                  ? "text-blue-700"
                  : theme === "dark"
                    ? "text-slate-400"
                    : "text-amber-700"
            }`}
          >
            Combining technical expertise with creative problem-solving
          </p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Stat Cards - Theme Aware */}
            {theme === "colorful" && (
              <>
                <div className="group relative bg-gradient-to-br from-yellow-50 to-orange-50 rounded-3xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 border-4 border-yellow-300">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-yellow-300/20 rounded-bl-full"></div>
                  <div className="relative">
                    <div className="text-5xl font-black text-orange-500 mb-2">
                      CS
                    </div>
                    <div className="text-sm font-bold text-orange-900 mb-1">
                      Computer Science
                    </div>
                    <div className="text-xs text-orange-700">
                      Major & Passion
                    </div>
                  </div>
                </div>
                <div className="group relative bg-gradient-to-br from-pink-50 to-rose-50 rounded-3xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 border-4 border-pink-300">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-pink-300/20 rounded-bl-full"></div>
                  <div className="relative">
                    <div className="text-5xl font-black text-pink-600 mb-2">
                      FS
                    </div>
                    <div className="text-sm font-bold text-pink-900 mb-1">
                      Full Stack
                    </div>
                    <div className="text-xs text-pink-700">
                      Frontend + Backend
                    </div>
                  </div>
                </div>
                <div className="group relative bg-gradient-to-br from-purple-50 to-indigo-50 rounded-3xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 border-4 border-purple-300">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-purple-300/20 rounded-bl-full"></div>
                  <div className="relative">
                    <div className="text-5xl font-black text-purple-600 mb-2">
                      ⚡
                    </div>
                    <div className="text-sm font-bold text-purple-900 mb-1">
                      Performance
                    </div>
                    <div className="text-xs text-purple-700">
                      Optimized & Fast
                    </div>
                  </div>
                </div>
                <div className="group relative bg-gradient-to-br from-blue-50 to-cyan-50 rounded-3xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 border-4 border-blue-300">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-blue-300/20 rounded-bl-full"></div>
                  <div className="relative">
                    <div className="text-5xl font-black text-blue-600 mb-2">
                      🚀
                    </div>
                    <div className="text-sm font-bold text-blue-900 mb-1">
                      Innovation
                    </div>
                    <div className="text-xs text-blue-700">Always Learning</div>
                  </div>
                </div>
              </>
            )}
            {theme === "light" && (
              <>
                <div className="group relative bg-gradient-to-br from-blue-100 to-cyan-100 rounded-3xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 border-4 border-blue-400">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-blue-300/20 rounded-bl-full"></div>
                  <div className="relative">
                    <div className="text-5xl font-black text-blue-600 mb-2">
                      CS
                    </div>
                    <div className="text-sm font-bold text-blue-900 mb-1">
                      Computer Science
                    </div>
                    <div className="text-xs text-blue-700">Major & Passion</div>
                  </div>
                </div>
                <div className="group relative bg-gradient-to-br from-cyan-100 to-blue-100 rounded-3xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 border-4 border-cyan-400">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-cyan-300/20 rounded-bl-full"></div>
                  <div className="relative">
                    <div className="text-5xl font-black text-cyan-600 mb-2">
                      FS
                    </div>
                    <div className="text-sm font-bold text-cyan-900 mb-1">
                      Full Stack
                    </div>
                    <div className="text-xs text-cyan-700">
                      Frontend + Backend
                    </div>
                  </div>
                </div>
                <div className="group relative bg-gradient-to-br from-blue-100 to-cyan-100 rounded-3xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 border-4 border-blue-400">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-blue-300/20 rounded-bl-full"></div>
                  <div className="relative">
                    <div className="text-5xl font-black text-blue-600 mb-2">
                      ⚡
                    </div>
                    <div className="text-sm font-bold text-blue-900 mb-1">
                      Performance
                    </div>
                    <div className="text-xs text-blue-700">
                      Optimized & Fast
                    </div>
                  </div>
                </div>
                <div className="group relative bg-gradient-to-br from-cyan-100 to-blue-100 rounded-3xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 border-4 border-cyan-400">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-cyan-300/20 rounded-bl-full"></div>
                  <div className="relative">
                    <div className="text-5xl font-black text-cyan-600 mb-2">
                      🚀
                    </div>
                    <div className="text-sm font-bold text-cyan-900 mb-1">
                      Innovation
                    </div>
                    <div className="text-xs text-cyan-700">Always Learning</div>
                  </div>
                </div>
              </>
            )}
            {theme === "dark" && (
              <>
                <div className="group relative bg-gradient-to-br from-slate-700 to-slate-800 rounded-3xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 border-4 border-cyan-500">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-cyan-500/10 rounded-bl-full"></div>
                  <div className="relative">
                    <div className="text-5xl font-black text-cyan-400 mb-2">
                      CS
                    </div>
                    <div className="text-sm font-bold text-cyan-300 mb-1">
                      Computer Science
                    </div>
                    <div className="text-xs text-cyan-400">Major & Passion</div>
                  </div>
                </div>
                <div className="group relative bg-gradient-to-br from-slate-700 to-slate-800 rounded-3xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 border-4 border-blue-500">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/10 rounded-bl-full"></div>
                  <div className="relative">
                    <div className="text-5xl font-black text-blue-400 mb-2">
                      FS
                    </div>
                    <div className="text-sm font-bold text-blue-300 mb-1">
                      Full Stack
                    </div>
                    <div className="text-xs text-blue-400">
                      Frontend + Backend
                    </div>
                  </div>
                </div>
                <div className="group relative bg-gradient-to-br from-slate-700 to-slate-800 rounded-3xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 border-4 border-cyan-500">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-cyan-500/10 rounded-bl-full"></div>
                  <div className="relative">
                    <div className="text-5xl font-black text-cyan-400 mb-2">
                      ⚡
                    </div>
                    <div className="text-sm font-bold text-cyan-300 mb-1">
                      Performance
                    </div>
                    <div className="text-xs text-cyan-400">
                      Optimized & Fast
                    </div>
                  </div>
                </div>
                <div className="group relative bg-gradient-to-br from-slate-700 to-slate-800 rounded-3xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 border-4 border-blue-500">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/10 rounded-bl-full"></div>
                  <div className="relative">
                    <div className="text-5xl font-black text-blue-400 mb-2">
                      🚀
                    </div>
                    <div className="text-sm font-bold text-blue-300 mb-1">
                      Innovation
                    </div>
                    <div className="text-xs text-blue-400">Always Learning</div>
                  </div>
                </div>
              </>
            )}
            {theme === "elegant" && (
              <>
                <div className="group relative bg-gradient-to-br from-amber-100 to-yellow-100 rounded-3xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 border-4 border-amber-400">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-amber-300/20 rounded-bl-full"></div>
                  <div className="relative">
                    <div className="text-5xl font-black text-amber-700 mb-2">
                      CS
                    </div>
                    <div className="text-sm font-bold text-amber-900 mb-1">
                      Computer Science
                    </div>
                    <div className="text-xs text-amber-800">
                      Major & Passion
                    </div>
                  </div>
                </div>
                <div className="group relative bg-gradient-to-br from-yellow-100 to-amber-100 rounded-3xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 border-4 border-yellow-400">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-yellow-300/20 rounded-bl-full"></div>
                  <div className="relative">
                    <div className="text-5xl font-black text-yellow-700 mb-2">
                      FS
                    </div>
                    <div className="text-sm font-bold text-yellow-900 mb-1">
                      Full Stack
                    </div>
                    <div className="text-xs text-yellow-800">
                      Frontend + Backend
                    </div>
                  </div>
                </div>
                <div className="group relative bg-gradient-to-br from-amber-100 to-yellow-100 rounded-3xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 border-4 border-amber-400">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-amber-300/20 rounded-bl-full"></div>
                  <div className="relative">
                    <div className="text-5xl font-black text-amber-700 mb-2">
                      ⚡
                    </div>
                    <div className="text-sm font-bold text-amber-900 mb-1">
                      Performance
                    </div>
                    <div className="text-xs text-amber-800">
                      Optimized & Fast
                    </div>
                  </div>
                </div>
                <div className="group relative bg-gradient-to-br from-yellow-100 to-amber-100 rounded-3xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 border-4 border-yellow-400">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-yellow-300/20 rounded-bl-full"></div>
                  <div className="relative">
                    <div className="text-5xl font-black text-yellow-700 mb-2">
                      🚀
                    </div>
                    <div className="text-sm font-bold text-yellow-900 mb-1">
                      Innovation
                    </div>
                    <div className="text-xs text-yellow-800">
                      Always Learning
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section
        id="skills"
        className={`min-h-screen flex items-center py-20 px-4 sm:px-6 lg:px-8 ${
          theme === "colorful"
            ? "bg-gradient-to-br from-white to-pink-50"
            : theme === "light"
              ? "bg-gradient-to-br from-cyan-50 to-blue-100"
              : theme === "dark"
                ? "bg-slate-900"
                : "bg-gradient-to-br from-amber-50 to-yellow-100"
        }`}
      >
        <div className="max-w-6xl mx-auto w-full">
          <h2
            className={`text-4xl sm:text-5xl font-black text-center mb-16 text-transparent bg-clip-text ${
              theme === "colorful"
                ? "bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600"
                : theme === "light"
                  ? "bg-gradient-to-r from-blue-600 to-cyan-600"
                  : theme === "dark"
                    ? "bg-gradient-to-r from-cyan-400 to-blue-400"
                    : "bg-gradient-to-r from-amber-700 to-yellow-700"
            }`}
          >
            Skills & Technologies
          </h2>

          {/* Theme-Specific Skills Grid */}
          {theme === "colorful" && (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-gradient-to-br from-yellow-100 to-orange-100 rounded-3xl p-6 hover:shadow-xl hover:scale-105 transition-all duration-300 border-4 border-yellow-300 shadow-lg">
                <div className="text-5xl mb-4">💻</div>
                <h3 className="text-xl font-black text-orange-900 mb-3">
                  Frontend
                </h3>
                <div className="space-y-2">
                  {[
                    "React",
                    "Next.js",
                    "TypeScript",
                    "Tailwind CSS",
                    "HTML/CSS",
                  ].map((skill) => (
                    <div
                      key={skill}
                      className="flex items-center text-orange-800 font-semibold"
                    >
                      <span className="w-3 h-3 bg-orange-500 rounded-full mr-2"></span>
                      {skill}
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-gradient-to-br from-pink-100 to-rose-100 rounded-3xl p-6 hover:shadow-xl hover:scale-105 transition-all duration-300 border-4 border-pink-300 shadow-lg">
                <div className="text-5xl mb-4">⚙️</div>
                <h3 className="text-xl font-black text-pink-900 mb-3">
                  Backend
                </h3>
                <div className="space-y-2">
                  {[
                    "Node.js",
                    "Python",
                    "Express",
                    "PostgreSQL",
                    "MongoDB",
                  ].map((skill) => (
                    <div
                      key={skill}
                      className="flex items-center text-pink-800 font-semibold"
                    >
                      <span className="w-3 h-3 bg-pink-500 rounded-full mr-2"></span>
                      {skill}
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-gradient-to-br from-purple-100 to-indigo-100 rounded-3xl p-6 hover:shadow-xl hover:scale-105 transition-all duration-300 border-4 border-purple-300 shadow-lg">
                <div className="text-5xl mb-4">🛠️</div>
                <h3 className="text-xl font-black text-purple-900 mb-3">
                  Tools & DevOps
                </h3>
                <div className="space-y-2">
                  {["Git", "Docker", "AWS", "CI/CD", "Linux"].map((skill) => (
                    <div
                      key={skill}
                      className="flex items-center text-purple-800 font-semibold"
                    >
                      <span className="w-3 h-3 bg-purple-500 rounded-full mr-2"></span>
                      {skill}
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-gradient-to-br from-blue-100 to-cyan-100 rounded-3xl p-6 hover:shadow-xl hover:scale-105 transition-all duration-300 border-4 border-blue-300 shadow-lg">
                <div className="text-5xl mb-4">🔤</div>
                <h3 className="text-xl font-black text-blue-900 mb-3">
                  Languages
                </h3>
                <div className="space-y-2">
                  {["JavaScript", "Python", "Java", "C++", "SQL"].map(
                    (skill) => (
                      <div
                        key={skill}
                        className="flex items-center text-blue-800 font-semibold"
                      >
                        <span className="w-3 h-3 bg-blue-500 rounded-full mr-2"></span>
                        {skill}
                      </div>
                    ),
                  )}
                </div>
              </div>
              <div className="bg-gradient-to-br from-red-100 to-pink-100 rounded-3xl p-6 hover:shadow-xl hover:scale-105 transition-all duration-300 border-4 border-red-300 shadow-lg">
                <div className="text-5xl mb-4">📱</div>
                <h3 className="text-xl font-black text-red-900 mb-3">Mobile</h3>
                <div className="space-y-2">
                  {["React Native", "Flutter", "Expo", "Firebase", "APIs"].map(
                    (skill) => (
                      <div
                        key={skill}
                        className="flex items-center text-red-800 font-semibold"
                      >
                        <span className="w-3 h-3 bg-red-500 rounded-full mr-2"></span>
                        {skill}
                      </div>
                    ),
                  )}
                </div>
              </div>
              <div className="bg-gradient-to-br from-teal-100 to-green-100 rounded-3xl p-6 hover:shadow-xl hover:scale-105 transition-all duration-300 border-4 border-teal-300 shadow-lg">
                <div className="text-5xl mb-4">🎨</div>
                <h3 className="text-xl font-black text-teal-900 mb-3">
                  Design
                </h3>
                <div className="space-y-2">
                  {[
                    "UI/UX",
                    "Figma",
                    "Adobe XD",
                    "Responsive Design",
                    "CSS Animations",
                  ].map((skill) => (
                    <div
                      key={skill}
                      className="flex items-center text-teal-800 font-semibold"
                    >
                      <span className="w-3 h-3 bg-teal-500 rounded-full mr-2"></span>
                      {skill}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Light Theme Skills */}
          {theme === "light" && (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-gradient-to-br from-blue-200 to-cyan-200 rounded-3xl p-6 hover:shadow-xl hover:scale-105 transition-all duration-300 border-4 border-blue-400 shadow-lg">
                <div className="text-5xl mb-4">💻</div>
                <h3 className="text-xl font-black text-blue-900 mb-3">
                  Frontend
                </h3>
                <div className="space-y-2">
                  {[
                    "React",
                    "Next.js",
                    "TypeScript",
                    "Tailwind CSS",
                    "HTML/CSS",
                  ].map((skill) => (
                    <div
                      key={skill}
                      className="flex items-center text-blue-800 font-semibold"
                    >
                      <span className="w-3 h-3 bg-blue-600 rounded-full mr-2"></span>
                      {skill}
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-gradient-to-br from-cyan-200 to-blue-200 rounded-3xl p-6 hover:shadow-xl hover:scale-105 transition-all duration-300 border-4 border-cyan-400 shadow-lg">
                <div className="text-5xl mb-4">⚙️</div>
                <h3 className="text-xl font-black text-cyan-900 mb-3">
                  Backend
                </h3>
                <div className="space-y-2">
                  {[
                    "Node.js",
                    "Python",
                    "Express",
                    "PostgreSQL",
                    "MongoDB",
                  ].map((skill) => (
                    <div
                      key={skill}
                      className="flex items-center text-cyan-800 font-semibold"
                    >
                      <span className="w-3 h-3 bg-cyan-600 rounded-full mr-2"></span>
                      {skill}
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-gradient-to-br from-blue-200 to-cyan-200 rounded-3xl p-6 hover:shadow-xl hover:scale-105 transition-all duration-300 border-4 border-blue-400 shadow-lg">
                <div className="text-5xl mb-4">🛠️</div>
                <h3 className="text-xl font-black text-blue-900 mb-3">
                  Tools & DevOps
                </h3>
                <div className="space-y-2">
                  {["Git", "Docker", "AWS", "CI/CD", "Linux"].map((skill) => (
                    <div
                      key={skill}
                      className="flex items-center text-blue-800 font-semibold"
                    >
                      <span className="w-3 h-3 bg-blue-600 rounded-full mr-2"></span>
                      {skill}
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-gradient-to-br from-cyan-200 to-blue-200 rounded-3xl p-6 hover:shadow-xl hover:scale-105 transition-all duration-300 border-4 border-cyan-400 shadow-lg">
                <div className="text-5xl mb-4">🔤</div>
                <h3 className="text-xl font-black text-cyan-900 mb-3">
                  Languages
                </h3>
                <div className="space-y-2">
                  {["JavaScript", "Python", "Java", "C++", "SQL"].map(
                    (skill) => (
                      <div
                        key={skill}
                        className="flex items-center text-cyan-800 font-semibold"
                      >
                        <span className="w-3 h-3 bg-cyan-600 rounded-full mr-2"></span>
                        {skill}
                      </div>
                    ),
                  )}
                </div>
              </div>
              <div className="bg-gradient-to-br from-blue-200 to-cyan-200 rounded-3xl p-6 hover:shadow-xl hover:scale-105 transition-all duration-300 border-4 border-blue-400 shadow-lg">
                <div className="text-5xl mb-4">📱</div>
                <h3 className="text-xl font-black text-blue-900 mb-3">
                  Mobile
                </h3>
                <div className="space-y-2">
                  {["React Native", "Flutter", "Expo", "Firebase", "APIs"].map(
                    (skill) => (
                      <div
                        key={skill}
                        className="flex items-center text-blue-800 font-semibold"
                      >
                        <span className="w-3 h-3 bg-blue-600 rounded-full mr-2"></span>
                        {skill}
                      </div>
                    ),
                  )}
                </div>
              </div>
              <div className="bg-gradient-to-br from-cyan-200 to-blue-200 rounded-3xl p-6 hover:shadow-xl hover:scale-105 transition-all duration-300 border-4 border-cyan-400 shadow-lg">
                <div className="text-5xl mb-4">🎨</div>
                <h3 className="text-xl font-black text-cyan-900 mb-3">
                  Design
                </h3>
                <div className="space-y-2">
                  {[
                    "UI/UX",
                    "Figma",
                    "Adobe XD",
                    "Responsive Design",
                    "CSS Animations",
                  ].map((skill) => (
                    <div
                      key={skill}
                      className="flex items-center text-cyan-800 font-semibold"
                    >
                      <span className="w-3 h-3 bg-cyan-600 rounded-full mr-2"></span>
                      {skill}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Dark Theme Skills */}
          {theme === "dark" && (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-gradient-to-br from-slate-700 to-slate-800 rounded-3xl p-6 hover:shadow-xl hover:scale-105 transition-all duration-300 border-4 border-cyan-500 shadow-lg">
                <div className="text-5xl mb-4">💻</div>
                <h3 className="text-xl font-black text-cyan-400 mb-3">
                  Frontend
                </h3>
                <div className="space-y-2">
                  {[
                    "React",
                    "Next.js",
                    "TypeScript",
                    "Tailwind CSS",
                    "HTML/CSS",
                  ].map((skill) => (
                    <div
                      key={skill}
                      className="flex items-center text-cyan-300 font-semibold"
                    >
                      <span className="w-3 h-3 bg-cyan-500 rounded-full mr-2"></span>
                      {skill}
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-gradient-to-br from-slate-700 to-slate-800 rounded-3xl p-6 hover:shadow-xl hover:scale-105 transition-all duration-300 border-4 border-blue-500 shadow-lg">
                <div className="text-5xl mb-4">⚙️</div>
                <h3 className="text-xl font-black text-blue-400 mb-3">
                  Backend
                </h3>
                <div className="space-y-2">
                  {[
                    "Node.js",
                    "Python",
                    "Express",
                    "PostgreSQL",
                    "MongoDB",
                  ].map((skill) => (
                    <div
                      key={skill}
                      className="flex items-center text-blue-300 font-semibold"
                    >
                      <span className="w-3 h-3 bg-blue-500 rounded-full mr-2"></span>
                      {skill}
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-gradient-to-br from-slate-700 to-slate-800 rounded-3xl p-6 hover:shadow-xl hover:scale-105 transition-all duration-300 border-4 border-cyan-500 shadow-lg">
                <div className="text-5xl mb-4">🛠️</div>
                <h3 className="text-xl font-black text-cyan-400 mb-3">
                  Tools & DevOps
                </h3>
                <div className="space-y-2">
                  {["Git", "Docker", "AWS", "CI/CD", "Linux"].map((skill) => (
                    <div
                      key={skill}
                      className="flex items-center text-cyan-300 font-semibold"
                    >
                      <span className="w-3 h-3 bg-cyan-500 rounded-full mr-2"></span>
                      {skill}
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-gradient-to-br from-slate-700 to-slate-800 rounded-3xl p-6 hover:shadow-xl hover:scale-105 transition-all duration-300 border-4 border-blue-500 shadow-lg">
                <div className="text-5xl mb-4">🔤</div>
                <h3 className="text-xl font-black text-blue-400 mb-3">
                  Languages
                </h3>
                <div className="space-y-2">
                  {["JavaScript", "Python", "Java", "C++", "SQL"].map(
                    (skill) => (
                      <div
                        key={skill}
                        className="flex items-center text-blue-300 font-semibold"
                      >
                        <span className="w-3 h-3 bg-blue-500 rounded-full mr-2"></span>
                        {skill}
                      </div>
                    ),
                  )}
                </div>
              </div>
              <div className="bg-gradient-to-br from-slate-700 to-slate-800 rounded-3xl p-6 hover:shadow-xl hover:scale-105 transition-all duration-300 border-4 border-cyan-500 shadow-lg">
                <div className="text-5xl mb-4">📱</div>
                <h3 className="text-xl font-black text-cyan-400 mb-3">
                  Mobile
                </h3>
                <div className="space-y-2">
                  {["React Native", "Flutter", "Expo", "Firebase", "APIs"].map(
                    (skill) => (
                      <div
                        key={skill}
                        className="flex items-center text-cyan-300 font-semibold"
                      >
                        <span className="w-3 h-3 bg-cyan-500 rounded-full mr-2"></span>
                        {skill}
                      </div>
                    ),
                  )}
                </div>
              </div>
              <div className="bg-gradient-to-br from-slate-700 to-slate-800 rounded-3xl p-6 hover:shadow-xl hover:scale-105 transition-all duration-300 border-4 border-blue-500 shadow-lg">
                <div className="text-5xl mb-4">🎨</div>
                <h3 className="text-xl font-black text-blue-400 mb-3">
                  Design
                </h3>
                <div className="space-y-2">
                  {[
                    "UI/UX",
                    "Figma",
                    "Adobe XD",
                    "Responsive Design",
                    "CSS Animations",
                  ].map((skill) => (
                    <div
                      key={skill}
                      className="flex items-center text-blue-300 font-semibold"
                    >
                      <span className="w-3 h-3 bg-blue-500 rounded-full mr-2"></span>
                      {skill}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Elegant Theme Skills */}
          {theme === "elegant" && (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-gradient-to-br from-amber-200 to-yellow-200 rounded-3xl p-6 hover:shadow-xl hover:scale-105 transition-all duration-300 border-4 border-amber-400 shadow-lg">
                <div className="text-5xl mb-4">💻</div>
                <h3 className="text-xl font-black text-amber-900 mb-3">
                  Frontend
                </h3>
                <div className="space-y-2">
                  {[
                    "React",
                    "Next.js",
                    "TypeScript",
                    "Tailwind CSS",
                    "HTML/CSS",
                  ].map((skill) => (
                    <div
                      key={skill}
                      className="flex items-center text-amber-800 font-semibold"
                    >
                      <span className="w-3 h-3 bg-amber-700 rounded-full mr-2"></span>
                      {skill}
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-gradient-to-br from-yellow-200 to-amber-200 rounded-3xl p-6 hover:shadow-xl hover:scale-105 transition-all duration-300 border-4 border-yellow-400 shadow-lg">
                <div className="text-5xl mb-4">⚙️</div>
                <h3 className="text-xl font-black text-yellow-900 mb-3">
                  Backend
                </h3>
                <div className="space-y-2">
                  {[
                    "Node.js",
                    "Python",
                    "Express",
                    "PostgreSQL",
                    "MongoDB",
                  ].map((skill) => (
                    <div
                      key={skill}
                      className="flex items-center text-yellow-800 font-semibold"
                    >
                      <span className="w-3 h-3 bg-yellow-700 rounded-full mr-2"></span>
                      {skill}
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-gradient-to-br from-amber-200 to-yellow-200 rounded-3xl p-6 hover:shadow-xl hover:scale-105 transition-all duration-300 border-4 border-amber-400 shadow-lg">
                <div className="text-5xl mb-4">🛠️</div>
                <h3 className="text-xl font-black text-amber-900 mb-3">
                  Tools & DevOps
                </h3>
                <div className="space-y-2">
                  {["Git", "Docker", "AWS", "CI/CD", "Linux"].map((skill) => (
                    <div
                      key={skill}
                      className="flex items-center text-amber-800 font-semibold"
                    >
                      <span className="w-3 h-3 bg-amber-700 rounded-full mr-2"></span>
                      {skill}
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-gradient-to-br from-yellow-200 to-amber-200 rounded-3xl p-6 hover:shadow-xl hover:scale-105 transition-all duration-300 border-4 border-yellow-400 shadow-lg">
                <div className="text-5xl mb-4">🔤</div>
                <h3 className="text-xl font-black text-yellow-900 mb-3">
                  Languages
                </h3>
                <div className="space-y-2">
                  {["JavaScript", "Python", "Java", "C++", "SQL"].map(
                    (skill) => (
                      <div
                        key={skill}
                        className="flex items-center text-yellow-800 font-semibold"
                      >
                        <span className="w-3 h-3 bg-yellow-700 rounded-full mr-2"></span>
                        {skill}
                      </div>
                    ),
                  )}
                </div>
              </div>
              <div className="bg-gradient-to-br from-amber-200 to-yellow-200 rounded-3xl p-6 hover:shadow-xl hover:scale-105 transition-all duration-300 border-4 border-amber-400 shadow-lg">
                <div className="text-5xl mb-4">📱</div>
                <h3 className="text-xl font-black text-amber-900 mb-3">
                  Mobile
                </h3>
                <div className="space-y-2">
                  {["React Native", "Flutter", "Expo", "Firebase", "APIs"].map(
                    (skill) => (
                      <div
                        key={skill}
                        className="flex items-center text-amber-800 font-semibold"
                      >
                        <span className="w-3 h-3 bg-amber-700 rounded-full mr-2"></span>
                        {skill}
                      </div>
                    ),
                  )}
                </div>
              </div>
              <div className="bg-gradient-to-br from-yellow-200 to-amber-200 rounded-3xl p-6 hover:shadow-xl hover:scale-105 transition-all duration-300 border-4 border-yellow-400 shadow-lg">
                <div className="text-5xl mb-4">🎨</div>
                <h3 className="text-xl font-black text-yellow-900 mb-3">
                  Design
                </h3>
                <div className="space-y-2">
                  {[
                    "UI/UX",
                    "Figma",
                    "Adobe XD",
                    "Responsive Design",
                    "CSS Animations",
                  ].map((skill) => (
                    <div
                      key={skill}
                      className="flex items-center text-yellow-800 font-semibold"
                    >
                      <span className="w-3 h-3 bg-yellow-700 rounded-full mr-2"></span>
                      {skill}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Projects Section */}
      <section
        id="projects"
        className={`min-h-screen flex items-center py-20 px-4 sm:px-6 lg:px-8 ${
          theme === "colorful"
            ? "bg-gradient-to-br from-purple-50 to-blue-50"
            : theme === "light"
              ? "bg-gradient-to-br from-blue-100 to-cyan-100"
              : theme === "dark"
                ? "bg-slate-900"
                : "bg-gradient-to-br from-yellow-100 to-amber-100"
        }`}
      >
        <div className="max-w-6xl mx-auto w-full">
          <h2
            className={`text-4xl sm:text-5xl font-black text-center mb-16 text-transparent bg-clip-text ${
              theme === "colorful"
                ? "bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600"
                : theme === "light"
                  ? "bg-gradient-to-r from-blue-600 to-cyan-600"
                  : theme === "dark"
                    ? "bg-gradient-to-r from-cyan-400 to-blue-400"
                    : "bg-gradient-to-r from-amber-700 to-yellow-700"
            }`}
          >
            Featured Projects
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {/* Project 1 */}
            <div
              className={`group rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 border-4 ${
                theme === "colorful"
                  ? "bg-gradient-to-br from-blue-100 to-indigo-100 border-blue-300"
                  : theme === "light"
                    ? "bg-gradient-to-br from-blue-200 to-cyan-200 border-blue-400"
                    : theme === "dark"
                      ? "bg-gradient-to-br from-slate-700 to-slate-800 border-cyan-500"
                      : "bg-gradient-to-br from-amber-200 to-yellow-200 border-amber-400"
              }`}
            >
              <div
                className={`h-48 flex items-center justify-center text-white text-6xl transform group-hover:scale-110 transition-transform duration-300 ${
                  theme === "colorful"
                    ? "bg-gradient-to-br from-blue-600 to-indigo-700"
                    : theme === "light"
                      ? "bg-gradient-to-br from-blue-500 to-cyan-600"
                      : theme === "dark"
                        ? "bg-gradient-to-br from-cyan-600 to-blue-700"
                        : "bg-gradient-to-br from-amber-600 to-yellow-700"
                }`}
              >
                🚀
              </div>
              <div className="p-6">
                <h3
                  className={`text-2xl font-black mb-3 ${
                    theme === "colorful"
                      ? "text-blue-900"
                      : theme === "light"
                        ? "text-blue-900"
                        : theme === "dark"
                          ? "text-cyan-400"
                          : "text-amber-900"
                  }`}
                >
                  Project Name 1
                </h3>
                <p
                  className={`mb-4 font-semibold ${
                    theme === "colorful"
                      ? "text-blue-800"
                      : theme === "light"
                        ? "text-blue-800"
                        : theme === "dark"
                          ? "text-cyan-300"
                          : "text-amber-800"
                  }`}
                >
                  A full-stack web application built with React, Node.js, and
                  MongoDB. Features include user authentication, real-time
                  updates, and responsive design.
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {theme === "colorful" && (
                    <>
                      <span className="px-3 py-1 bg-blue-300/60 text-blue-900 rounded-full text-sm font-bold">
                        React
                      </span>
                      <span className="px-3 py-1 bg-indigo-300/60 text-indigo-900 rounded-full text-sm font-bold">
                        Node.js
                      </span>
                      <span className="px-3 py-1 bg-purple-300/60 text-purple-900 rounded-full text-sm font-bold">
                        MongoDB
                      </span>
                    </>
                  )}
                  {theme === "light" && (
                    <>
                      <span className="px-3 py-1 bg-blue-400/60 text-white rounded-full text-sm font-bold">
                        React
                      </span>
                      <span className="px-3 py-1 bg-cyan-400/60 text-white rounded-full text-sm font-bold">
                        Node.js
                      </span>
                      <span className="px-3 py-1 bg-blue-500/60 text-white rounded-full text-sm font-bold">
                        MongoDB
                      </span>
                    </>
                  )}
                  {theme === "dark" && (
                    <>
                      <span className="px-3 py-1 bg-cyan-500/60 text-white rounded-full text-sm font-bold">
                        React
                      </span>
                      <span className="px-3 py-1 bg-blue-500/60 text-white rounded-full text-sm font-bold">
                        Node.js
                      </span>
                      <span className="px-3 py-1 bg-cyan-600/60 text-white rounded-full text-sm font-bold">
                        MongoDB
                      </span>
                    </>
                  )}
                  {theme === "elegant" && (
                    <>
                      <span className="px-3 py-1 bg-amber-400/60 text-amber-900 rounded-full text-sm font-bold">
                        React
                      </span>
                      <span className="px-3 py-1 bg-yellow-400/60 text-amber-900 rounded-full text-sm font-bold">
                        Node.js
                      </span>
                      <span className="px-3 py-1 bg-amber-500/60 text-white rounded-full text-sm font-bold">
                        MongoDB
                      </span>
                    </>
                  )}
                </div>
                <div className="flex gap-4">
                  <a
                    href="#"
                    className={`font-bold text-sm transform hover:scale-110 transition-transform ${
                      theme === "colorful"
                        ? "text-blue-700 hover:text-blue-900"
                        : theme === "light"
                          ? "text-blue-700 hover:text-blue-900"
                          : theme === "dark"
                            ? "text-cyan-400 hover:text-cyan-300"
                            : "text-amber-700 hover:text-amber-900"
                    }`}
                  >
                    View Demo →
                  </a>
                  <a
                    href="#"
                    className={`font-bold text-sm transform hover:scale-110 transition-transform ${
                      theme === "colorful"
                        ? "text-blue-600 hover:text-blue-800"
                        : theme === "light"
                          ? "text-blue-600 hover:text-blue-800"
                          : theme === "dark"
                            ? "text-blue-400 hover:text-blue-300"
                            : "text-yellow-700 hover:text-yellow-900"
                    }`}
                  >
                    GitHub →
                  </a>
                </div>
              </div>
            </div>

            {/* Project 2 */}
            <div
              className={`group rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 border-4 ${
                theme === "colorful"
                  ? "bg-gradient-to-br from-pink-100 to-rose-100 border-pink-300"
                  : theme === "light"
                    ? "bg-gradient-to-br from-cyan-200 to-blue-200 border-cyan-400"
                    : theme === "dark"
                      ? "bg-gradient-to-br from-slate-700 to-slate-800 border-blue-500"
                      : "bg-gradient-to-br from-yellow-200 to-amber-200 border-yellow-400"
              }`}
            >
              <div
                className={`h-48 flex items-center justify-center text-white text-6xl transform group-hover:scale-110 transition-transform duration-300 ${
                  theme === "colorful"
                    ? "bg-gradient-to-br from-pink-600 to-rose-700"
                    : theme === "light"
                      ? "bg-gradient-to-br from-cyan-500 to-blue-600"
                      : theme === "dark"
                        ? "bg-gradient-to-br from-blue-600 to-cyan-700"
                        : "bg-gradient-to-br from-yellow-600 to-amber-700"
                }`}
              >
                📱
              </div>
              <div className="p-6">
                <h3
                  className={`text-2xl font-black mb-3 ${
                    theme === "colorful"
                      ? "text-pink-900"
                      : theme === "light"
                        ? "text-cyan-900"
                        : theme === "dark"
                          ? "text-blue-400"
                          : "text-yellow-900"
                  }`}
                >
                  Project Name 2
                </h3>
                <p
                  className={`mb-4 font-semibold ${
                    theme === "colorful"
                      ? "text-pink-800"
                      : theme === "light"
                        ? "text-cyan-800"
                        : theme === "dark"
                          ? "text-blue-300"
                          : "text-yellow-800"
                  }`}
                >
                  A mobile application developed using React Native. Includes
                  features like geolocation, push notifications, and offline
                  functionality.
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {theme === "colorful" && (
                    <>
                      <span className="px-3 py-1 bg-pink-300/60 text-pink-900 rounded-full text-sm font-bold">
                        React Native
                      </span>
                      <span className="px-3 py-1 bg-rose-300/60 text-rose-900 rounded-full text-sm font-bold">
                        Firebase
                      </span>
                      <span className="px-3 py-1 bg-orange-300/60 text-orange-900 rounded-full text-sm font-bold">
                        TypeScript
                      </span>
                    </>
                  )}
                  {theme === "light" && (
                    <>
                      <span className="px-3 py-1 bg-cyan-400/60 text-white rounded-full text-sm font-bold">
                        React Native
                      </span>
                      <span className="px-3 py-1 bg-blue-400/60 text-white rounded-full text-sm font-bold">
                        Firebase
                      </span>
                      <span className="px-3 py-1 bg-cyan-500/60 text-white rounded-full text-sm font-bold">
                        TypeScript
                      </span>
                    </>
                  )}
                  {theme === "dark" && (
                    <>
                      <span className="px-3 py-1 bg-blue-500/60 text-white rounded-full text-sm font-bold">
                        React Native
                      </span>
                      <span className="px-3 py-1 bg-cyan-500/60 text-white rounded-full text-sm font-bold">
                        Firebase
                      </span>
                      <span className="px-3 py-1 bg-blue-600/60 text-white rounded-full text-sm font-bold">
                        TypeScript
                      </span>
                    </>
                  )}
                  {theme === "elegant" && (
                    <>
                      <span className="px-3 py-1 bg-yellow-400/60 text-amber-900 rounded-full text-sm font-bold">
                        React Native
                      </span>
                      <span className="px-3 py-1 bg-amber-400/60 text-amber-900 rounded-full text-sm font-bold">
                        Firebase
                      </span>
                      <span className="px-3 py-1 bg-yellow-500/60 text-white rounded-full text-sm font-bold">
                        TypeScript
                      </span>
                    </>
                  )}
                </div>
                <div className="flex gap-4">
                  <a
                    href="#"
                    className={`font-bold text-sm transform hover:scale-110 transition-transform ${
                      theme === "colorful"
                        ? "text-pink-700 hover:text-pink-900"
                        : theme === "light"
                          ? "text-cyan-700 hover:text-cyan-900"
                          : theme === "dark"
                            ? "text-blue-400 hover:text-blue-300"
                            : "text-yellow-700 hover:text-yellow-900"
                    }`}
                  >
                    View Demo →
                  </a>
                  <a
                    href="#"
                    className={`font-bold text-sm transform hover:scale-110 transition-transform ${
                      theme === "colorful"
                        ? "text-pink-600 hover:text-pink-800"
                        : theme === "light"
                          ? "text-cyan-600 hover:text-cyan-800"
                          : theme === "dark"
                            ? "text-cyan-400 hover:text-cyan-300"
                            : "text-amber-700 hover:text-amber-900"
                    }`}
                  >
                    GitHub →
                  </a>
                </div>
              </div>
            </div>

            {/* Project 3 */}
            <div
              className={`group rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 border-4 ${
                theme === "colorful"
                  ? "bg-gradient-to-br from-purple-100 to-indigo-100 border-purple-300"
                  : theme === "light"
                    ? "bg-gradient-to-br from-blue-200 to-cyan-200 border-blue-400"
                    : theme === "dark"
                      ? "bg-gradient-to-br from-slate-700 to-slate-800 border-cyan-500"
                      : "bg-gradient-to-br from-amber-200 to-yellow-200 border-amber-400"
              }`}
            >
              <div
                className={`h-48 flex items-center justify-center text-white text-6xl transform group-hover:scale-110 transition-transform duration-300 ${
                  theme === "colorful"
                    ? "bg-gradient-to-br from-purple-600 to-indigo-700"
                    : theme === "light"
                      ? "bg-gradient-to-br from-blue-500 to-cyan-600"
                      : theme === "dark"
                        ? "bg-gradient-to-br from-cyan-600 to-blue-700"
                        : "bg-gradient-to-br from-amber-600 to-yellow-700"
                }`}
              >
                🤖
              </div>
              <div className="p-6">
                <h3
                  className={`text-2xl font-black mb-3 ${
                    theme === "colorful"
                      ? "text-purple-900"
                      : theme === "light"
                        ? "text-blue-900"
                        : theme === "dark"
                          ? "text-cyan-400"
                          : "text-amber-900"
                  }`}
                >
                  Project Name 3
                </h3>
                <p
                  className={`mb-4 font-semibold ${
                    theme === "colorful"
                      ? "text-purple-800"
                      : theme === "light"
                        ? "text-blue-800"
                        : theme === "dark"
                          ? "text-cyan-300"
                          : "text-amber-800"
                  }`}
                >
                  An AI-powered application using machine learning to solve
                  real-world problems. Built with Python, TensorFlow, and
                  deployed on AWS.
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {theme === "colorful" && (
                    <>
                      <span className="px-3 py-1 bg-purple-300/60 text-purple-900 rounded-full text-sm font-bold">
                        Python
                      </span>
                      <span className="px-3 py-1 bg-blue-300/60 text-blue-900 rounded-full text-sm font-bold">
                        TensorFlow
                      </span>
                      <span className="px-3 py-1 bg-orange-300/60 text-orange-900 rounded-full text-sm font-bold">
                        AWS
                      </span>
                    </>
                  )}
                  {theme === "light" && (
                    <>
                      <span className="px-3 py-1 bg-blue-400/60 text-white rounded-full text-sm font-bold">
                        Python
                      </span>
                      <span className="px-3 py-1 bg-cyan-400/60 text-white rounded-full text-sm font-bold">
                        TensorFlow
                      </span>
                      <span className="px-3 py-1 bg-blue-500/60 text-white rounded-full text-sm font-bold">
                        AWS
                      </span>
                    </>
                  )}
                  {theme === "dark" && (
                    <>
                      <span className="px-3 py-1 bg-cyan-500/60 text-white rounded-full text-sm font-bold">
                        Python
                      </span>
                      <span className="px-3 py-1 bg-blue-500/60 text-white rounded-full text-sm font-bold">
                        TensorFlow
                      </span>
                      <span className="px-3 py-1 bg-cyan-600/60 text-white rounded-full text-sm font-bold">
                        AWS
                      </span>
                    </>
                  )}
                  {theme === "elegant" && (
                    <>
                      <span className="px-3 py-1 bg-amber-400/60 text-amber-900 rounded-full text-sm font-bold">
                        Python
                      </span>
                      <span className="px-3 py-1 bg-yellow-400/60 text-amber-900 rounded-full text-sm font-bold">
                        TensorFlow
                      </span>
                      <span className="px-3 py-1 bg-amber-500/60 text-white rounded-full text-sm font-bold">
                        AWS
                      </span>
                    </>
                  )}
                </div>
                <div className="flex gap-4">
                  <a
                    href="#"
                    className={`font-bold text-sm transform hover:scale-110 transition-transform ${
                      theme === "colorful"
                        ? "text-purple-700 hover:text-purple-900"
                        : theme === "light"
                          ? "text-blue-700 hover:text-blue-900"
                          : theme === "dark"
                            ? "text-cyan-400 hover:text-cyan-300"
                            : "text-amber-700 hover:text-amber-900"
                    }`}
                  >
                    View Demo →
                  </a>
                  <a
                    href="#"
                    className={`font-bold text-sm transform hover:scale-110 transition-transform ${
                      theme === "colorful"
                        ? "text-purple-600 hover:text-purple-800"
                        : theme === "light"
                          ? "text-blue-600 hover:text-blue-800"
                          : theme === "dark"
                            ? "text-blue-400 hover:text-blue-300"
                            : "text-yellow-700 hover:text-yellow-900"
                    }`}
                  >
                    GitHub →
                  </a>
                </div>
              </div>
            </div>

            {/* Project 4 */}
            <div
              className={`group rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 border-4 ${
                theme === "colorful"
                  ? "bg-gradient-to-br from-yellow-100 to-orange-100 border-yellow-300"
                  : theme === "light"
                    ? "bg-gradient-to-br from-cyan-200 to-blue-200 border-cyan-400"
                    : theme === "dark"
                      ? "bg-gradient-to-br from-slate-700 to-slate-800 border-blue-500"
                      : "bg-gradient-to-br from-yellow-200 to-amber-200 border-yellow-400"
              }`}
            >
              <div
                className={`h-48 flex items-center justify-center text-white text-6xl transform group-hover:scale-110 transition-transform duration-300 ${
                  theme === "colorful"
                    ? "bg-gradient-to-br from-yellow-500 to-orange-600"
                    : theme === "light"
                      ? "bg-gradient-to-br from-cyan-500 to-blue-600"
                      : theme === "dark"
                        ? "bg-gradient-to-br from-blue-600 to-cyan-700"
                        : "bg-gradient-to-br from-yellow-600 to-amber-700"
                }`}
              >
                🎮
              </div>
              <div className="p-6">
                <h3
                  className={`text-2xl font-black mb-3 ${
                    theme === "colorful"
                      ? "text-orange-900"
                      : theme === "light"
                        ? "text-cyan-900"
                        : theme === "dark"
                          ? "text-blue-400"
                          : "text-yellow-900"
                  }`}
                >
                  Project Name 4
                </h3>
                <p
                  className={`mb-4 font-semibold ${
                    theme === "colorful"
                      ? "text-orange-800"
                      : theme === "light"
                        ? "text-cyan-800"
                        : theme === "dark"
                          ? "text-blue-300"
                          : "text-yellow-800"
                  }`}
                >
                  An interactive web-based game developed with JavaScript and
                  Canvas API. Features multiplayer support and real-time
                  gameplay.
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {theme === "colorful" && (
                    <>
                      <span className="px-3 py-1 bg-yellow-300/60 text-yellow-900 rounded-full text-sm font-bold">
                        JavaScript
                      </span>
                      <span className="px-3 py-1 bg-orange-300/60 text-orange-900 rounded-full text-sm font-bold">
                        WebSocket
                      </span>
                      <span className="px-3 py-1 bg-red-300/60 text-red-900 rounded-full text-sm font-bold">
                        Canvas
                      </span>
                    </>
                  )}
                  {theme === "light" && (
                    <>
                      <span className="px-3 py-1 bg-cyan-400/60 text-white rounded-full text-sm font-bold">
                        JavaScript
                      </span>
                      <span className="px-3 py-1 bg-blue-400/60 text-white rounded-full text-sm font-bold">
                        WebSocket
                      </span>
                      <span className="px-3 py-1 bg-cyan-500/60 text-white rounded-full text-sm font-bold">
                        Canvas
                      </span>
                    </>
                  )}
                  {theme === "dark" && (
                    <>
                      <span className="px-3 py-1 bg-blue-500/60 text-white rounded-full text-sm font-bold">
                        JavaScript
                      </span>
                      <span className="px-3 py-1 bg-cyan-500/60 text-white rounded-full text-sm font-bold">
                        WebSocket
                      </span>
                      <span className="px-3 py-1 bg-blue-600/60 text-white rounded-full text-sm font-bold">
                        Canvas
                      </span>
                    </>
                  )}
                  {theme === "elegant" && (
                    <>
                      <span className="px-3 py-1 bg-yellow-400/60 text-amber-900 rounded-full text-sm font-bold">
                        JavaScript
                      </span>
                      <span className="px-3 py-1 bg-amber-400/60 text-amber-900 rounded-full text-sm font-bold">
                        WebSocket
                      </span>
                      <span className="px-3 py-1 bg-yellow-500/60 text-white rounded-full text-sm font-bold">
                        Canvas
                      </span>
                    </>
                  )}
                </div>
                <div className="flex gap-4">
                  <a
                    href="#"
                    className={`font-bold text-sm transform hover:scale-110 transition-transform ${
                      theme === "colorful"
                        ? "text-orange-700 hover:text-orange-900"
                        : theme === "light"
                          ? "text-cyan-700 hover:text-cyan-900"
                          : theme === "dark"
                            ? "text-blue-400 hover:text-blue-300"
                            : "text-yellow-700 hover:text-yellow-900"
                    }`}
                  >
                    View Demo →
                  </a>
                  <a
                    href="#"
                    className={`font-bold text-sm transform hover:scale-110 transition-transform ${
                      theme === "colorful"
                        ? "text-orange-600 hover:text-orange-800"
                        : theme === "light"
                          ? "text-cyan-600 hover:text-cyan-800"
                          : theme === "dark"
                            ? "text-cyan-400 hover:text-cyan-300"
                            : "text-amber-700 hover:text-amber-900"
                    }`}
                  >
                    GitHub →
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section
        id="contact"
        className={`min-h-screen flex items-center py-20 px-4 sm:px-6 lg:px-8 ${
          theme === "colorful"
            ? "bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50"
            : theme === "light"
              ? "bg-gradient-to-br from-cyan-50 to-blue-100"
              : theme === "dark"
                ? "bg-slate-900"
                : "bg-gradient-to-br from-amber-50 to-yellow-100"
        }`}
      >
        <div className="max-w-6xl mx-auto w-full">
          <div className="text-center mb-12">
            <h2
              className={`text-4xl sm:text-5xl font-black mb-4 text-transparent bg-clip-text ${
                theme === "colorful"
                  ? "bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600"
                  : theme === "light"
                    ? "bg-gradient-to-r from-blue-600 to-cyan-600"
                    : theme === "dark"
                      ? "bg-gradient-to-r from-cyan-400 to-blue-400"
                      : "bg-gradient-to-r from-amber-700 to-yellow-700"
              }`}
            >
              Let's Create Something Amazing
            </h2>
            <p
              className={`text-xl font-semibold ${
                theme === "colorful"
                  ? "text-purple-800"
                  : theme === "light"
                    ? "text-blue-700"
                    : theme === "dark"
                      ? "text-cyan-300"
                      : "text-amber-800"
              }`}
            >
              Have a project in mind? I'd love to hear from you!
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Contact Form */}
            <div
              className={`rounded-3xl p-8 shadow-xl border-4 ${
                theme === "colorful"
                  ? "bg-gradient-to-br from-pink-100 to-purple-100 border-pink-300"
                  : theme === "light"
                    ? "bg-gradient-to-br from-blue-200 to-cyan-200 border-blue-400"
                    : theme === "dark"
                      ? "bg-gradient-to-br from-slate-700 to-slate-800 border-cyan-500"
                      : "bg-gradient-to-br from-amber-200 to-yellow-200 border-amber-400"
              }`}
            >
              <h3
                className={`text-2xl font-black mb-6 ${
                  theme === "colorful"
                    ? "text-pink-900"
                    : theme === "light"
                      ? "text-blue-900"
                      : theme === "dark"
                        ? "text-cyan-400"
                        : "text-amber-900"
                }`}
              >
                Send Me a Message
              </h3>
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label
                    htmlFor="name"
                    className={`block text-sm font-bold mb-2 ${
                      theme === "colorful"
                        ? "text-pink-900"
                        : theme === "light"
                          ? "text-blue-900"
                          : theme === "dark"
                            ? "text-cyan-400"
                            : "text-amber-900"
                    }`}
                  >
                    Your Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleFormChange}
                    required
                    className={`w-full px-4 py-3 rounded-2xl border-2 bg-white focus:ring-2 focus:border-transparent transition-all font-semibold ${
                      theme === "colorful"
                        ? "border-pink-300 text-pink-900 placeholder-pink-400 focus:ring-pink-500"
                        : theme === "light"
                          ? "border-blue-300 text-blue-900 placeholder-blue-400 focus:ring-blue-500"
                          : theme === "dark"
                            ? "border-cyan-400 text-slate-900 placeholder-slate-500 focus:ring-cyan-500"
                            : "border-amber-300 text-amber-900 placeholder-amber-400 focus:ring-amber-500"
                    }`}
                    placeholder="John Doe"
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className={`block text-sm font-bold mb-2 ${
                      theme === "colorful"
                        ? "text-pink-900"
                        : theme === "light"
                          ? "text-blue-900"
                          : theme === "dark"
                            ? "text-cyan-400"
                            : "text-amber-900"
                    }`}
                  >
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleFormChange}
                    required
                    className={`w-full px-4 py-3 rounded-2xl border-2 bg-white focus:ring-2 focus:border-transparent transition-all font-semibold ${
                      theme === "colorful"
                        ? "border-pink-300 text-pink-900 placeholder-pink-400 focus:ring-pink-500"
                        : theme === "light"
                          ? "border-blue-300 text-blue-900 placeholder-blue-400 focus:ring-blue-500"
                          : theme === "dark"
                            ? "border-cyan-400 text-slate-900 placeholder-slate-500 focus:ring-cyan-500"
                            : "border-amber-300 text-amber-900 placeholder-amber-400 focus:ring-amber-500"
                    }`}
                    placeholder="john@example.com"
                  />
                </div>

                <div>
                  <label
                    htmlFor="subject"
                    className={`block text-sm font-bold mb-2 ${
                      theme === "colorful"
                        ? "text-pink-900"
                        : theme === "light"
                          ? "text-blue-900"
                          : theme === "dark"
                            ? "text-cyan-400"
                            : "text-amber-900"
                    }`}
                  >
                    Subject *
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleFormChange}
                    required
                    className={`w-full px-4 py-3 rounded-2xl border-2 bg-white focus:ring-2 focus:border-transparent transition-all font-semibold ${
                      theme === "colorful"
                        ? "border-pink-300 text-pink-900 placeholder-pink-400 focus:ring-pink-500"
                        : theme === "light"
                          ? "border-blue-300 text-blue-900 placeholder-blue-400 focus:ring-blue-500"
                          : theme === "dark"
                            ? "border-cyan-400 text-slate-900 placeholder-slate-500 focus:ring-cyan-500"
                            : "border-amber-300 text-amber-900 placeholder-amber-400 focus:ring-amber-500"
                    }`}
                    placeholder="Project Collaboration"
                  />
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className={`block text-sm font-bold mb-2 ${
                      theme === "colorful"
                        ? "text-pink-900"
                        : theme === "light"
                          ? "text-blue-900"
                          : theme === "dark"
                            ? "text-cyan-400"
                            : "text-amber-900"
                    }`}
                  >
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleFormChange}
                    required
                    rows={5}
                    className={`w-full px-4 py-3 rounded-2xl border-2 bg-white focus:ring-2 focus:border-transparent transition-all resize-none font-semibold ${
                      theme === "colorful"
                        ? "border-pink-300 text-pink-900 placeholder-pink-400 focus:ring-pink-500"
                        : theme === "light"
                          ? "border-blue-300 text-blue-900 placeholder-blue-400 focus:ring-blue-500"
                          : theme === "dark"
                            ? "border-cyan-400 text-slate-900 placeholder-slate-500 focus:ring-cyan-500"
                            : "border-amber-300 text-amber-900 placeholder-amber-400 focus:ring-amber-500"
                    }`}
                    placeholder="Tell me about your project or opportunity..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={formStatus === "sending"}
                  className={`w-full px-8 py-4 text-white rounded-2xl font-bold hover:shadow-2xl hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg transform active:scale-95 ${
                    theme === "colorful"
                      ? "bg-gradient-to-r from-pink-500 to-purple-600"
                      : theme === "light"
                        ? "bg-gradient-to-r from-blue-500 to-cyan-500"
                        : theme === "dark"
                          ? "bg-gradient-to-r from-cyan-500 to-blue-600"
                          : "bg-gradient-to-r from-amber-600 to-yellow-700"
                  }`}
                >
                  {formStatus === "sending" ? (
                    <>
                      <span className="animate-spin">⟳</span>
                      Sending...
                    </>
                  ) : (
                    <>
                      Send Message
                      <span>✈️</span>
                    </>
                  )}
                </button>

                {formStatus === "success" && (
                  <div className="p-4 bg-green-100 border-2 border-green-400 rounded-2xl text-green-700 text-center font-bold">
                    ✔ Message sent successfully! I'll get back to you soon.
                  </div>
                )}

                {formStatus === "error" && (
                  <div className="p-4 bg-red-100 border-2 border-red-400 rounded-2xl text-red-700 text-center font-bold">
                    ✖ Something went wrong. Please try again or email me
                    directly.
                  </div>
                )}
              </form>
            </div>

            {/* Contact Info & Social Links */}
            <div className="space-y-6">
              {/* Contact Info Card */}
              <div
                className={`rounded-3xl p-8 shadow-xl text-white border-4 ${
                  theme === "colorful"
                    ? "bg-gradient-to-br from-purple-500 to-indigo-600 border-purple-300"
                    : theme === "light"
                      ? "bg-gradient-to-br from-blue-500 to-cyan-600 border-blue-400"
                      : theme === "dark"
                        ? "bg-gradient-to-br from-cyan-600 to-blue-700 border-cyan-500"
                        : "bg-gradient-to-br from-amber-600 to-yellow-700 border-amber-400"
                }`}
              >
                <h3 className="text-2xl font-black mb-6">
                  Contact Information
                </h3>
                <div className="space-y-5">
                  <a
                    href="mailto:your.email@example.com"
                    className="flex items-center space-x-4 group hover:translate-x-2 transition-transform"
                  >
                    <div className="w-14 h-14 bg-white/30 rounded-2xl flex items-center justify-center group-hover:bg-white/40 transition-colors shadow-lg transform group-hover:rotate-12">
                      <span className="text-2xl">✉</span>
                    </div>
                    <div>
                      <div className="text-sm font-bold text-white/70">
                        Email
                      </div>
                      <div className="font-black text-white">
                        your.email@example.com
                      </div>
                    </div>
                  </a>

                  <a
                    href="tel:+1234567890"
                    className="flex items-center space-x-4 group hover:translate-x-2 transition-transform"
                  >
                    <div className="w-14 h-14 bg-white/30 rounded-2xl flex items-center justify-center group-hover:bg-white/40 transition-colors shadow-lg transform group-hover:rotate-12">
                      <span className="text-2xl">📱</span>
                    </div>
                    <div>
                      <div className="text-sm font-bold text-white/70">
                        Phone
                      </div>
                      <div className="font-black text-white">
                        +1 (234) 567-890
                      </div>
                    </div>
                  </a>

                  <div className="flex items-center space-x-4">
                    <div className="w-14 h-14 bg-white/30 rounded-2xl flex items-center justify-center shadow-lg">
                      <span className="text-2xl">📍</span>
                    </div>
                    <div>
                      <div className="text-sm font-bold text-white/70">
                        Location
                      </div>
                      <div className="font-black text-white">New York, USA</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Social Links Card */}
              <div
                className={`rounded-3xl p-8 shadow-xl border-4 ${
                  theme === "colorful"
                    ? "bg-gradient-to-br from-blue-100 to-cyan-100 border-blue-300"
                    : theme === "light"
                      ? "bg-gradient-to-br from-blue-200 to-cyan-200 border-blue-400"
                      : theme === "dark"
                        ? "bg-gradient-to-br from-slate-700 to-slate-800 border-cyan-500"
                        : "bg-gradient-to-br from-yellow-100 to-amber-100 border-yellow-400"
                }`}
              >
                <h3
                  className={`text-2xl font-black mb-6 ${
                    theme === "colorful"
                      ? "text-blue-900"
                      : theme === "light"
                        ? "text-blue-900"
                        : theme === "dark"
                          ? "text-cyan-400"
                          : "text-amber-900"
                  }`}
                >
                  Connect With Me
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <a
                    href="#"
                    className={`flex items-center justify-center py-4 text-white rounded-2xl font-bold hover:shadow-lg hover:scale-110 transition-all transform group ${
                      theme === "colorful"
                        ? "bg-blue-500 hover:bg-blue-600"
                        : theme === "light"
                          ? "bg-blue-500 hover:bg-blue-600"
                          : theme === "dark"
                            ? "bg-cyan-600 hover:bg-cyan-500"
                            : "bg-amber-600 hover:bg-amber-700"
                    }`}
                  >
                    <span className="text-2xl group-hover:animate-bounce">
                      💻
                    </span>
                  </a>
                  <a
                    href="#"
                    className={`flex items-center justify-center py-4 text-white rounded-2xl font-bold hover:shadow-lg hover:scale-110 transition-all transform group ${
                      theme === "colorful"
                        ? "bg-blue-500 hover:bg-blue-600"
                        : theme === "light"
                          ? "bg-blue-500 hover:bg-blue-600"
                          : theme === "dark"
                            ? "bg-cyan-600 hover:bg-cyan-500"
                            : "bg-amber-600 hover:bg-amber-700"
                    }`}
                  >
                    <span className="text-2xl group-hover:animate-bounce">
                      📘
                    </span>
                  </a>
                  <a
                    href="#"
                    className={`flex items-center justify-center py-4 text-white rounded-2xl font-bold hover:shadow-lg hover:scale-110 transition-all transform group ${
                      theme === "colorful"
                        ? "bg-blue-500 hover:bg-blue-600"
                        : theme === "light"
                          ? "bg-blue-500 hover:bg-blue-600"
                          : theme === "dark"
                            ? "bg-cyan-600 hover:bg-cyan-500"
                            : "bg-amber-600 hover:bg-amber-700"
                    }`}
                  >
                    <span className="text-2xl group-hover:animate-bounce">
                      🐙
                    </span>
                  </a>
                  <a
                    href="#"
                    className={`flex items-center justify-center py-4 text-white rounded-2xl font-bold hover:shadow-lg hover:scale-110 transition-all transform group ${
                      theme === "colorful"
                        ? "bg-blue-500 hover:bg-blue-600"
                        : theme === "light"
                          ? "bg-blue-500 hover:bg-blue-600"
                          : theme === "dark"
                            ? "bg-cyan-600 hover:bg-cyan-500"
                            : "bg-amber-600 hover:bg-amber-700"
                    }`}
                  >
                    <span className="text-2xl group-hover:animate-bounce">
                      🐦
                    </span>
                  </a>
                </div>
              </div>

              {/* Quick Links Card */}
              <div
                className={`rounded-3xl p-8 shadow-xl border-4 ${
                  theme === "colorful"
                    ? "bg-gradient-to-br from-yellow-100 to-orange-100 border-yellow-300"
                    : theme === "light"
                      ? "bg-gradient-to-br from-cyan-200 to-blue-200 border-cyan-400"
                      : theme === "dark"
                        ? "bg-gradient-to-br from-slate-700 to-slate-800 border-blue-500"
                        : "bg-gradient-to-br from-amber-200 to-yellow-200 border-amber-400"
                }`}
              >
                <h3
                  className={`text-2xl font-black mb-6 ${
                    theme === "colorful"
                      ? "text-orange-900"
                      : theme === "light"
                        ? "text-cyan-900"
                        : theme === "dark"
                          ? "text-blue-400"
                          : "text-amber-900"
                  }`}
                >
                  Quick Links
                </h3>
                <div className="space-y-3">
                  <a
                    href="#"
                    className={`block px-4 py-3 rounded-2xl font-bold hover:shadow-lg hover:scale-105 transition-all text-center transform ${
                      theme === "colorful"
                        ? "bg-yellow-400 hover:bg-yellow-500 text-orange-900"
                        : theme === "light"
                          ? "bg-cyan-400 hover:bg-cyan-500 text-white"
                          : theme === "dark"
                            ? "bg-blue-600 hover:bg-blue-500 text-white"
                            : "bg-amber-400 hover:bg-amber-500 text-amber-900"
                    }`}
                  >
                    Download Resume 📄
                  </a>
                  <a
                    href="/blog"
                    className={`block px-4 py-3 rounded-2xl font-bold hover:shadow-lg hover:scale-105 transition-all text-center transform ${
                      theme === "colorful"
                        ? "bg-orange-400 hover:bg-orange-500 text-white"
                        : theme === "light"
                          ? "bg-blue-400 hover:bg-blue-500 text-white"
                          : theme === "dark"
                            ? "bg-cyan-600 hover:bg-cyan-500 text-white"
                            : "bg-yellow-400 hover:bg-yellow-500 text-amber-900"
                    }`}
                  >
                    Read My Blog 📝
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer
        className={`text-white py-8 px-4 text-center ${
          theme === "colorful"
            ? "bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600"
            : theme === "light"
              ? "bg-gradient-to-r from-blue-600 to-cyan-600"
              : theme === "dark"
                ? "bg-gradient-to-r from-slate-800 via-slate-700 to-slate-900"
                : "bg-gradient-to-r from-amber-700 via-yellow-700 to-amber-800"
        }`}
      >
        <div className="max-w-6xl mx-auto">
          <p className="font-bold text-lg mb-2">
            Made with ❤️ by Bishwo Biraj Dallakoti
          </p>
          <p className="text-white/80 text-sm">
            © 2024 All rights reserved. Always learning, always building.
          </p>
        </div>
      </footer>
    </div>
  );
}
