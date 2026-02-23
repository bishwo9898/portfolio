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
    theme === "light"
      ? "bg-gradient-to-br from-blue-400 to-cyan-400"
      : "bg-gradient-to-br from-cyan-500 to-blue-600";

  const navLogoText =
    theme === "light"
      ? "from-blue-600 to-cyan-600"
      : "from-cyan-300 to-blue-300";

  const navBtn =
    theme === "light"
      ? "bg-gradient-to-r from-blue-200 to-cyan-200 text-blue-700"
      : "bg-cyan-500/20 text-cyan-300";

  return (
    <div
      className={`min-h-screen ${themeClasses.mainBg} ${themeConfig.fontFamily}`}
    >
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
                        : theme === "light"
                          ? "text-blue-700 hover:bg-blue-100"
                          : "text-gray-300 hover:bg-slate-700/50"
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
                theme === "light"
                  ? "text-blue-600 hover:text-blue-800 hover:bg-blue-100"
                  : "text-cyan-400 hover:text-cyan-300 hover:bg-slate-700/50"
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
                      theme === "light"
                        ? "bg-gradient-to-r from-blue-400 to-cyan-400"
                        : "bg-gradient-to-r from-cyan-500 to-blue-600"
                    }`}
                    style={{ animationDuration: "3s" }}
                  ></div>
                  <div
                    className={`relative w-48 h-48 sm:w-64 sm:h-64 lg:w-80 lg:h-80 rounded-full overflow-hidden border-8 shadow-2xl flex items-center justify-center transform group-hover:scale-105 transition-transform duration-300 ${
                      theme === "light" ? "border-blue-100" : "border-slate-700"
                    }`}
                    style={{
                      boxShadow:
                        theme === "light"
                          ? "0 0 30px rgba(59, 130, 246, 0.3)"
                          : "0 0 30px rgba(34, 197, 246, 0.3)",
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
                      theme === "light"
                        ? "bg-gradient-to-r from-blue-600 to-cyan-600"
                        : "bg-gradient-to-r from-cyan-400 to-blue-400"
                    }`}
                  >
                    Hi, I'm Bishwo! 👋
                  </h1>
                  {/* Badges */}
                  <div className="flex flex-wrap gap-3 justify-center lg:justify-start">
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
                  </div>
                </div>

                <div className="space-y-4">
                  <p
                    className={`text-xl leading-relaxed font-semibold ${
                      theme === "light" ? "text-blue-700" : "text-cyan-200"
                    }`}
                  >
                    I'm a passionate Computer Science student with a deep love
                    for technology and innovation. My journey in tech has been
                    driven by curiosity and a desire to create solutions that
                    make a difference.
                  </p>
                  <p
                    className={`text-lg leading-relaxed ${
                      theme === "light" ? "text-blue-600" : "text-cyan-300"
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
                      theme === "light"
                        ? "bg-gradient-to-r from-blue-500 to-cyan-500"
                        : "bg-gradient-to-r from-cyan-500 to-blue-600"
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
                      theme === "light"
                        ? "border-blue-500 bg-blue-50 text-blue-600 hover:bg-blue-100"
                        : "border-cyan-500 bg-slate-800 text-cyan-400 hover:bg-slate-700"
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

      {/* Skills Section */}
      <section
        id="skills"
        className={`min-h-screen flex items-center py-20 px-4 sm:px-6 lg:px-8 ${
          theme === "light"
            ? "bg-gradient-to-br from-cyan-50 to-blue-100"
            : "bg-slate-900"
        }`}
      >
        <div className="max-w-6xl mx-auto w-full">
          <h2
            className={`text-4xl sm:text-5xl font-black text-center mb-16 text-transparent bg-clip-text ${
              theme === "light"
                ? "bg-gradient-to-r from-blue-600 to-cyan-600"
                : "bg-gradient-to-r from-cyan-400 to-blue-400"
            }`}
          >
            Skills & Technologies
          </h2>

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
        </div>
      </section>

      {/* Projects Section */}
      <section
        id="projects"
        className={`min-h-screen flex items-center py-20 px-4 sm:px-6 lg:px-8 ${
          theme === "light"
            ? "bg-gradient-to-br from-blue-100 to-cyan-100"
            : "bg-slate-900"
        }`}
      >
        <div className="max-w-6xl mx-auto w-full">
          <h2
            className={`text-4xl sm:text-5xl font-black text-center mb-16 text-transparent bg-clip-text ${
              theme === "light"
                ? "bg-gradient-to-r from-blue-600 to-cyan-600"
                : "bg-gradient-to-r from-cyan-400 to-blue-400"
            }`}
          >
            Featured Projects
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {/* Project 1 */}
            <div
              className={`group rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 border-4 ${
                theme === "light"
                  ? "bg-gradient-to-br from-blue-200 to-cyan-200 border-blue-400"
                  : "bg-gradient-to-br from-slate-700 to-slate-800 border-cyan-500"
              }`}
            >
              <div
                className={`h-48 flex items-center justify-center text-white text-6xl transform group-hover:scale-110 transition-transform duration-300 ${
                  theme === "light"
                    ? "bg-gradient-to-br from-blue-500 to-cyan-600"
                    : "bg-gradient-to-br from-cyan-600 to-blue-700"
                }`}
              >
                🚀
              </div>
              <div className="p-6">
                <h3
                  className={`text-2xl font-black mb-3 ${
                    theme === "light" ? "text-blue-900" : "text-cyan-400"
                  }`}
                >
                  Project Name 1
                </h3>
                <p
                  className={`mb-4 font-semibold ${
                    theme === "light" ? "text-blue-800" : "text-cyan-300"
                  }`}
                >
                  A full-stack web application built with React, Node.js, and
                  MongoDB. Features include user authentication, real-time
                  updates, and responsive design.
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
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
                </div>
                <div className="flex gap-4">
                  <a
                    href="#"
                    className={`font-bold text-sm transform hover:scale-110 transition-transform ${
                      theme === "light"
                        ? "text-blue-700 hover:text-blue-900"
                        : "text-cyan-400 hover:text-cyan-300"
                    }`}
                  >
                    View Demo →
                  </a>
                  <a
                    href="#"
                    className={`font-bold text-sm transform hover:scale-110 transition-transform ${
                      theme === "light"
                        ? "text-blue-600 hover:text-blue-800"
                        : "text-blue-400 hover:text-blue-300"
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
                theme === "light"
                  ? "bg-gradient-to-br from-cyan-200 to-blue-200 border-cyan-400"
                  : "bg-gradient-to-br from-slate-700 to-slate-800 border-blue-500"
              }`}
            >
              <div
                className={`h-48 flex items-center justify-center text-white text-6xl transform group-hover:scale-110 transition-transform duration-300 ${
                  theme === "light"
                    ? "bg-gradient-to-br from-cyan-500 to-blue-600"
                    : "bg-gradient-to-br from-blue-600 to-cyan-700"
                }`}
              >
                📱
              </div>
              <div className="p-6">
                <h3
                  className={`text-2xl font-black mb-3 ${
                    theme === "light" ? "text-cyan-900" : "text-blue-400"
                  }`}
                >
                  Project Name 2
                </h3>
                <p
                  className={`mb-4 font-semibold ${
                    theme === "light" ? "text-cyan-800" : "text-blue-300"
                  }`}
                >
                  A mobile application developed using React Native. Includes
                  features like geolocation, push notifications, and offline
                  functionality.
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
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
                </div>
                <div className="flex gap-4">
                  <a
                    href="#"
                    className={`font-bold text-sm transform hover:scale-110 transition-transform ${
                      theme === "light"
                        ? "text-cyan-700 hover:text-cyan-900"
                        : "text-blue-400 hover:text-blue-300"
                    }`}
                  >
                    View Demo →
                  </a>
                  <a
                    href="#"
                    className={`font-bold text-sm transform hover:scale-110 transition-transform ${
                      theme === "light"
                        ? "text-cyan-600 hover:text-cyan-800"
                        : "text-cyan-400 hover:text-cyan-300"
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
                theme === "light"
                  ? "bg-gradient-to-br from-blue-200 to-cyan-200 border-blue-400"
                  : "bg-gradient-to-br from-slate-700 to-slate-800 border-cyan-500"
              }`}
            >
              <div
                className={`h-48 flex items-center justify-center text-white text-6xl transform group-hover:scale-110 transition-transform duration-300 ${
                  theme === "light"
                    ? "bg-gradient-to-br from-blue-500 to-cyan-600"
                    : "bg-gradient-to-br from-cyan-600 to-blue-700"
                }`}
              >
                🤖
              </div>
              <div className="p-6">
                <h3
                  className={`text-2xl font-black mb-3 ${
                    theme === "light" ? "text-blue-900" : "text-cyan-400"
                  }`}
                >
                  Project Name 3
                </h3>
                <p
                  className={`mb-4 font-semibold ${
                    theme === "light" ? "text-blue-800" : "text-cyan-300"
                  }`}
                >
                  An AI-powered application using machine learning to solve
                  real-world problems. Built with Python, TensorFlow, and
                  deployed on AWS.
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
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
                </div>
                <div className="flex gap-4">
                  <a
                    href="#"
                    className={`font-bold text-sm transform hover:scale-110 transition-transform ${
                      theme === "light"
                        ? "text-blue-700 hover:text-blue-900"
                        : "text-cyan-400 hover:text-cyan-300"
                    }`}
                  >
                    View Demo →
                  </a>
                  <a
                    href="#"
                    className={`font-bold text-sm transform hover:scale-110 transition-transform ${
                      theme === "light"
                        ? "text-blue-600 hover:text-blue-800"
                        : "text-blue-400 hover:text-blue-300"
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
                theme === "light" ? "bg-gradient-to-br from-cyan-200 to-blue-200 border-cyan-400" : "bg-gradient-to-br from-slate-700 to-slate-800 border-blue-500"
              }`}
            >
              <div
                className={`h-48 flex items-center justify-center text-white text-6xl transform group-hover:scale-110 transition-transform duration-300 ${
                  theme === "light" ? "bg-gradient-to-br from-cyan-500 to-blue-600" : "bg-gradient-to-br from-blue-600 to-cyan-700"
                }`}
              >
                🎮
              </div>
              <div className="p-6">
                <h3
                  className={`text-2xl font-black mb-3 ${
                    theme === "light" ? "text-cyan-900" : "text-blue-400"
                  }`}
                >
                  Project Name 4
                </h3>
                <p
                  className={`mb-4 font-semibold ${
                    theme === "light" ? "text-cyan-800" : "text-blue-300"
                  }`}
                >
                  An interactive web-based game developed with JavaScript and
                  Canvas API. Features multiplayer support and real-time
                  gameplay.
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
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
                </div>
                <div className="flex gap-4">
                  <a
                    href="#"
                    className={`font-bold text-sm transform hover:scale-110 transition-transform ${
                      theme === "light" ? "text-cyan-700 hover:text-cyan-900" : "text-blue-400 hover:text-blue-300"
                    }`}
                  >
                    View Demo →
                  </a>
                  <a
                    href="#"
                    className={`font-bold text-sm transform hover:scale-110 transition-transform ${
                      theme === "light" ? "text-cyan-600 hover:text-cyan-800" : "text-cyan-400 hover:text-cyan-300"
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
          theme === "light" ? "bg-gradient-to-br from-cyan-50 to-blue-100" : "bg-slate-900"
        }`}
      >
        <div className="max-w-6xl mx-auto w-full">
          <div className="text-center mb-12">
            <h2
              className={`text-4xl sm:text-5xl font-black mb-4 text-transparent bg-clip-text ${
                theme === "light" ? "bg-gradient-to-r from-blue-600 to-cyan-600" : "bg-gradient-to-r from-cyan-400 to-blue-400"
              }`}
            >
              Let's Create Something Amazing
            </h2>
            <p
              className={`text-xl font-semibold ${
                theme === "light" ? "text-blue-700" : "text-cyan-300"
              }`}
            >
              Have a project in mind? I'd love to hear from you!
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Contact Form */}
            <div
              className={`rounded-3xl p-8 shadow-xl border-4 ${
                theme === "light" ? "bg-gradient-to-br from-blue-200 to-cyan-200 border-blue-400" : "bg-gradient-to-br from-slate-700 to-slate-800 border-cyan-500"
              }`}
            >
              <h3
                className={`text-2xl font-black mb-6 ${
                  theme === "light" ? "text-blue-900" : "text-cyan-400"
                }`}
              >
                Send Me a Message
              </h3>
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label
                    htmlFor="name"
                    className={`block text-sm font-bold mb-2 ${
                      theme === "light" ? "text-blue-900" : "text-cyan-400"
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
                      theme === "light" ? "border-blue-300 text-blue-900 placeholder-blue-400 focus:ring-blue-500" : "border-cyan-400 text-slate-900 placeholder-slate-500 focus:ring-cyan-500"
                    }`}
                    placeholder="John Doe"
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className={`block text-sm font-bold mb-2 ${
                      theme === "light" ? "text-blue-900" : "text-cyan-400"
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
                      theme === "light" ? "border-blue-300 text-blue-900 placeholder-blue-400 focus:ring-blue-500" : "border-cyan-400 text-slate-900 placeholder-slate-500 focus:ring-cyan-500"
                    }`}
                    placeholder="john@example.com"
                  />
                </div>

                <div>
                  <label
                    htmlFor="subject"
                    className={`block text-sm font-bold mb-2 ${
                      theme === "light" ? "text-blue-900" : "text-cyan-400"
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
                      theme === "light" ? "border-blue-300 text-blue-900 placeholder-blue-400 focus:ring-blue-500" : "border-cyan-400 text-slate-900 placeholder-slate-500 focus:ring-cyan-500"
                    }`}
                    placeholder="Project Collaboration"
                  />
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className={`block text-sm font-bold mb-2 ${
                      theme === "light" ? "text-blue-900" : "text-cyan-400"
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
                      theme === "light" ? "border-blue-300 text-blue-900 placeholder-blue-400 focus:ring-blue-500" : "border-cyan-400 text-slate-900 placeholder-slate-500 focus:ring-cyan-500"
                    }`}
                    placeholder="Tell me about your project or opportunity..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={formStatus === "sending"}
                  className={`w-full px-8 py-4 text-white rounded-2xl font-bold hover:shadow-2xl hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg transform active:scale-95 ${
                    theme === "light" ? "bg-gradient-to-r from-blue-500 to-cyan-500" : "bg-gradient-to-r from-cyan-500 to-blue-600"
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
                  theme === "light" ? "bg-gradient-to-br from-blue-500 to-cyan-600 border-blue-400" : "bg-gradient-to-br from-cyan-600 to-blue-700 border-cyan-500"
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
                  theme === "light" ? "bg-gradient-to-br from-blue-200 to-cyan-200 border-blue-400" : "bg-gradient-to-br from-slate-700 to-slate-800 border-cyan-500"
                }`}
              >
                <h3
                  className={`text-2xl font-black mb-6 ${
                    theme === "light" ? "text-blue-900" : "text-cyan-400"
                  }`}
                >
                  Connect With Me
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <a
                    href="#"
                    className={`flex items-center justify-center py-4 text-white rounded-2xl font-bold hover:shadow-lg hover:scale-110 transition-all transform group ${
                      theme === "light" ? "bg-blue-500 hover:bg-blue-600" : "bg-cyan-600 hover:bg-cyan-500"
                    }`}
                  >
                    <span className="text-2xl group-hover:animate-bounce">
                      💻
                    </span>
                  </a>
                  <a
                    href="#"
                    className={`flex items-center justify-center py-4 text-white rounded-2xl font-bold hover:shadow-lg hover:scale-110 transition-all transform group ${
                      theme === "light" ? "bg-blue-500 hover:bg-blue-600" : "bg-cyan-600 hover:bg-cyan-500"
                    }`}
                  >
                    <span className="text-2xl group-hover:animate-bounce">
                      📘
                    </span>
                  </a>
                  <a
                    href="#"
                    className={`flex items-center justify-center py-4 text-white rounded-2xl font-bold hover:shadow-lg hover:scale-110 transition-all transform group ${
                      theme === "light" ? "bg-blue-500 hover:bg-blue-600" : "bg-cyan-600 hover:bg-cyan-500"
                    }`}
                  >
                    <span className="text-2xl group-hover:animate-bounce">
                      🐙
                    </span>
                  </a>
                  <a
                    href="#"
                    className={`flex items-center justify-center py-4 text-white rounded-2xl font-bold hover:shadow-lg hover:scale-110 transition-all transform group ${
                      theme === "light" ? "bg-blue-500 hover:bg-blue-600" : "bg-cyan-600 hover:bg-cyan-500"
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
                  theme === "light" ? "bg-gradient-to-br from-cyan-200 to-blue-200 border-cyan-400" : "bg-gradient-to-br from-slate-700 to-slate-800 border-blue-500"
                }`}
              >
                <h3
                  className={`text-2xl font-black mb-6 ${
                    theme === "light" ? "text-cyan-900" : "text-blue-400"
                  }`}
                >
                  Quick Links
                </h3>
                <div className="space-y-3">
                  <a
                    href="#"
                    className={`block px-4 py-3 rounded-2xl font-bold hover:shadow-lg hover:scale-105 transition-all text-center transform ${
                      theme === "light" ? "bg-cyan-400 hover:bg-cyan-500 text-white" : "bg-blue-600 hover:bg-blue-500 text-white"
                    }`}
                  >
                    Download Resume 📄
                  </a>
                  <a
                    href="/blog"
                    className={`block px-4 py-3 rounded-2xl font-bold hover:shadow-lg hover:scale-105 transition-all text-center transform ${
                      theme === "light" ? "bg-blue-400 hover:bg-blue-500 text-white" : "bg-cyan-600 hover:bg-cyan-500 text-white"
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
          theme === "light" ? "bg-gradient-to-r from-blue-600 to-cyan-600" : "bg-gradient-to-r from-slate-800 via-slate-700 to-slate-900"
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