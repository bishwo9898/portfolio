"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useTheme } from "./theme-context";

export default function Home() {
  const { theme } = useTheme();
  const [activeSection, setActiveSection] = useState("home");
  const [isVisible] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [formStatus, setFormStatus] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["home", "skills", "projects", "contact"];
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
    } catch {
      setFormStatus("error");
    }
  };

  return (
    <div
      className={`min-h-screen ${
        theme === "light"
          ? "bg-gradient-to-br from-amber-50 via-yellow-50 to-orange-50 text-gray-900"
          : "bg-black text-white"
      }`}
    >
      {/* Navigation */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 backdrop-blur-md border-b ${
          theme === "light"
            ? "bg-amber-50/80 border-yellow-200/50"
            : "bg-black/80 border-white/5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <button
              onClick={() => scrollToSection("home")}
              className="flex items-center gap-3 hover:opacity-70 transition-opacity"
            >
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  theme === "light" ? "bg-gray-900" : "bg-white"
                }`}
              >
                <span
                  className={`font-semibold text-sm ${
                    theme === "light" ? "text-white" : "text-black"
                  }`}
                >
                  BB
                </span>
              </div>
              <span
                className={`text-sm font-medium hidden sm:block ${
                  theme === "light" ? "text-gray-900" : "text-white"
                }`}
              >
                Bishwo Biraj
              </span>
            </button>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              {["Home", "Skills", "Projects", "Contact"].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item.toLowerCase())}
                  className={`text-sm font-medium transition-all ${
                    activeSection === item.toLowerCase()
                      ? theme === "light"
                        ? "text-gray-900"
                        : "text-white"
                      : theme === "light"
                        ? "text-gray-500 hover:text-gray-900"
                        : "text-gray-400 hover:text-white"
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button
              className={`md:hidden ${
                theme === "light" ? "text-gray-900" : "text-white"
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
        className="min-h-screen flex items-center justify-center pt-16 px-6 lg:px-8 relative overflow-hidden"
      >
        {/* Subtle Background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div
            className={`absolute top-20 left-10 w-64 h-64 rounded-full blur-3xl ${
              theme === "light" ? "bg-gray-900/5" : "bg-white/5"
            }`}
            style={{ animation: "float 8s ease-in-out infinite" }}
          ></div>
          <div
            className={`absolute bottom-20 right-10 w-96 h-96 rounded-full blur-3xl ${
              theme === "light" ? "bg-gray-900/3" : "bg-white/3"
            }`}
            style={{
              animation: "float 10s ease-in-out infinite",
              animationDelay: "2s",
            }}
          ></div>
        </div>

        <div className="max-w-6xl mx-auto w-full relative z-10">
          <div
            className={`transition-all duration-1000 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            <div className="flex flex-col lg:flex-row items-center gap-16">
              {/* Profile Image */}
              <div className="flex-shrink-0">
                <div className="relative group">
                  <div
                    className={`absolute -inset-1 rounded-full blur opacity-20 group-hover:opacity-30 transition duration-500 ${
                      theme === "light" ? "bg-gray-900" : "bg-white"
                    }`}
                  ></div>
                  <div
                    className={`relative w-64 h-64 lg:w-80 lg:h-80 rounded-full overflow-hidden border-2 transform group-hover:scale-[1.02] transition-transform duration-500 ${
                      theme === "light" ? "border-gray-200" : "border-gray-800"
                    }`}
                  >
                    <Image
                      src={theme === "light" ? "/me.jpeg" : "/white_cap.png"}
                      alt="Bishwo Biraj Dallakoti"
                      fill
                      className="object-cover transition-transform duration-500"
                      priority
                      quality={95}
                      sizes="(max-width: 1024px) 256px, 320px"
                    />
                  </div>
                </div>
              </div>

              {/* Bio Content */}
              <div className="flex-1 text-center lg:text-left space-y-8">
                <div className="space-y-6">
                  <h1
                    className={`text-5xl sm:text-6xl lg:text-7xl font-bold ${
                      theme === "light" ? "text-gray-900" : "text-white"
                    }`}
                  >
                    Hi, I&apos;m Bishwo
                  </h1>

                  <div className="flex flex-wrap gap-3 justify-center lg:justify-start">
                    {[
                      "Full Stack Developer",
                      "CS Student",
                      "Problem Solver",
                    ].map((badge) => (
                      <span
                        key={badge}
                        className={`px-5 py-2 rounded-full text-sm font-medium border ${
                          theme === "light"
                            ? "bg-white border-gray-200 text-gray-800"
                            : "bg-zinc-900 border-zinc-800 text-gray-200"
                        }`}
                      >
                        {badge}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  <p
                    className={`text-xl ${
                      theme === "light" ? "text-gray-700" : "text-gray-300"
                    }`}
                  >
                    I&apos;m a passionate Computer Science student with a deep
                    love for technology and innovation. My journey in tech has
                    been driven by curiosity and a desire to create solutions
                    that make a difference.
                  </p>
                  <p
                    className={`text-lg ${
                      theme === "light" ? "text-gray-600" : "text-gray-400"
                    }`}
                  >
                    I specialize in full-stack development, with experience in
                    building scalable web applications, mobile apps, and
                    exploring emerging technologies.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-4">
                  <button
                    onClick={() => scrollToSection("projects")}
                    className={`px-8 py-3 rounded-full font-medium hover:scale-[1.02] transition-all duration-200 flex items-center justify-center gap-2 ${
                      theme === "light"
                        ? "bg-gray-900 text-white hover:bg-gray-800"
                        : "bg-white text-black hover:bg-gray-100"
                    }`}
                  >
                    View My Work
                    <span>→</span>
                  </button>
                  <button
                    onClick={() => scrollToSection("contact")}
                    className={`px-8 py-3 border rounded-full font-medium hover:scale-[1.02] transition-all duration-200 flex items-center justify-center gap-2 ${
                      theme === "light"
                        ? "border-gray-300 text-gray-900 hover:border-gray-400 hover:bg-gray-50"
                        : "border-gray-700 text-white hover:border-gray-600 hover:bg-zinc-900"
                    }`}
                  >
                    Get In Touch
                    <span>→</span>
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
        className={`min-h-screen flex items-center py-20 px-6 lg:px-8 ${
          theme === "light" ? "bg-amber-50" : "bg-zinc-950"
        }`}
      >
        <div className="max-w-6xl mx-auto w-full">
          <h2
            className={`text-4xl sm:text-5xl font-bold text-center mb-16 ${
              theme === "light" ? "text-gray-900" : "text-white"
            }`}
          >
            Skills & Technologies
          </h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: "Frontend",
                icon: "💻",
                skills: [
                  "React",
                  "Next.js",
                  "TypeScript",
                  "Tailwind CSS",
                  "HTML/CSS",
                ],
              },
              {
                title: "Backend",
                icon: "⚙️",
                skills: [
                  "Node.js",
                  "Python",
                  "Express",
                  "PostgreSQL",
                  "MongoDB",
                ],
              },
              {
                title: "Tools & DevOps",
                icon: "🛠️",
                skills: ["Git", "Docker", "AWS", "CI/CD", "Linux"],
              },
              {
                title: "Languages",
                icon: "🔤",
                skills: ["JavaScript", "Python", "Java", "C++", "SQL"],
              },
              {
                title: "Mobile",
                icon: "📱",
                skills: ["React Native", "Flutter", "Expo", "Firebase", "APIs"],
              },
              {
                title: "Design",
                icon: "🎨",
                skills: [
                  "UI/UX",
                  "Figma",
                  "Adobe XD",
                  "Responsive Design",
                  "CSS Animations",
                ],
              },
            ].map((category, idx) => (
              <div
                key={idx}
                className={`rounded-2xl p-6 hover:scale-[1.02] transition-all duration-200 border ${
                  theme === "light"
                    ? "bg-white border-gray-200 hover:border-gray-300"
                    : "bg-zinc-900 border-zinc-800 hover:border-zinc-700"
                }`}
              >
                <div className="text-4xl mb-4">{category.icon}</div>
                <h3
                  className={`text-xl font-semibold mb-4 ${
                    theme === "light" ? "text-gray-900" : "text-white"
                  }`}
                >
                  {category.title}
                </h3>
                <div className="space-y-2">
                  {category.skills.map((skill) => (
                    <div
                      key={skill}
                      className={`flex items-center ${
                        theme === "light" ? "text-gray-600" : "text-gray-400"
                      }`}
                    >
                      <span
                        className={`w-1.5 h-1.5 rounded-full mr-3 ${
                          theme === "light" ? "bg-gray-400" : "bg-gray-600"
                        }`}
                      ></span>
                      {skill}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section
        id="projects"
        className={`min-h-screen flex items-center py-20 px-6 lg:px-8 ${
          theme === "light"
            ? "bg-gradient-to-br from-amber-50 to-yellow-50"
            : "bg-black"
        }`}
      >
        <div className="max-w-6xl mx-auto w-full">
          <h2
            className={`text-4xl sm:text-5xl font-bold text-center mb-16 ${
              theme === "light" ? "text-gray-900" : "text-white"
            }`}
          >
            Featured Projects
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                title: "Project Name 1",
                icon: "🚀",
                description:
                  "A full-stack web application built with React, Node.js, and MongoDB. Features include user authentication, real-time updates, and responsive design.",
                tags: ["React", "Node.js", "MongoDB"],
              },
              {
                title: "Project Name 2",
                icon: "📱",
                description:
                  "A mobile application developed using React Native. Includes features like geolocation, push notifications, and offline functionality.",
                tags: ["React Native", "Firebase", "TypeScript"],
              },
              {
                title: "Project Name 3",
                icon: "🤖",
                description:
                  "An AI-powered application using machine learning to solve real-world problems. Built with Python, TensorFlow, and deployed on AWS.",
                tags: ["Python", "TensorFlow", "AWS"],
              },
              {
                title: "Project Name 4",
                icon: "🎮",
                description:
                  "An interactive web-based game developed with JavaScript and Canvas API. Features multiplayer support and real-time gameplay.",
                tags: ["JavaScript", "WebSocket", "Canvas"],
              },
            ].map((project, idx) => (
              <div
                key={idx}
                className={`group rounded-2xl overflow-hidden border hover:scale-[1.02] transition-all duration-200 ${
                  theme === "light"
                    ? "bg-white border-gray-200 hover:border-gray-300"
                    : "bg-zinc-900 border-zinc-800 hover:border-zinc-700"
                }`}
              >
                <div
                  className={`h-48 flex items-center justify-center text-6xl ${
                    theme === "light" ? "bg-gray-100" : "bg-zinc-800"
                  }`}
                >
                  {project.icon}
                </div>
                <div className="p-6">
                  <h3
                    className={`text-2xl font-semibold mb-3 ${
                      theme === "light" ? "text-gray-900" : "text-white"
                    }`}
                  >
                    {project.title}
                  </h3>
                  <p
                    className={`mb-4 ${
                      theme === "light" ? "text-gray-600" : "text-gray-400"
                    }`}
                  >
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className={`px-3 py-1 rounded-full text-sm ${
                          theme === "light"
                            ? "bg-gray-100 text-gray-700"
                            : "bg-zinc-800 text-gray-300"
                        }`}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-4">
                    <a
                      href="#"
                      className={`text-sm font-medium hover:underline ${
                        theme === "light" ? "text-gray-900" : "text-white"
                      }`}
                    >
                      View Demo →
                    </a>
                    <a
                      href="#"
                      className={`text-sm font-medium hover:underline ${
                        theme === "light" ? "text-gray-600" : "text-gray-400"
                      }`}
                    >
                      GitHub →
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section
        id="contact"
        className={`min-h-screen flex items-center py-20 px-6 lg:px-8 ${
          theme === "light" ? "bg-amber-50" : "bg-zinc-950"
        }`}
      >
        <div className="max-w-6xl mx-auto w-full">
          <div className="text-center mb-12">
            <h2
              className={`text-4xl sm:text-5xl font-bold mb-4 ${
                theme === "light" ? "text-gray-900" : "text-white"
              }`}
            >
              Let&apos;s Create Something Amazing
            </h2>
            <p
              className={`text-xl ${
                theme === "light" ? "text-gray-600" : "text-gray-400"
              }`}
            >
              Have a project in mind? I&apos;d love to hear from you!
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Contact Form */}
            <div
              className={`rounded-2xl p-8 border ${
                theme === "light"
                  ? "bg-white border-gray-200"
                  : "bg-zinc-900 border-zinc-800"
              }`}
            >
              <h3
                className={`text-2xl font-semibold mb-6 ${
                  theme === "light" ? "text-gray-900" : "text-white"
                }`}
              >
                Send Me a Message
              </h3>
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label
                    htmlFor="name"
                    className={`block text-sm font-medium mb-2 ${
                      theme === "light" ? "text-gray-900" : "text-white"
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
                    className={`w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-offset-0 transition-all ${
                      theme === "light"
                        ? "bg-white border-gray-300 text-gray-900 placeholder-gray-400 focus:border-gray-900 focus:ring-gray-900"
                        : "bg-zinc-800 border-zinc-700 text-white placeholder-gray-500 focus:border-white focus:ring-white"
                    }`}
                    placeholder="John Doe"
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className={`block text-sm font-medium mb-2 ${
                      theme === "light" ? "text-gray-900" : "text-white"
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
                    className={`w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-offset-0 transition-all ${
                      theme === "light"
                        ? "bg-white border-gray-300 text-gray-900 placeholder-gray-400 focus:border-gray-900 focus:ring-gray-900"
                        : "bg-zinc-800 border-zinc-700 text-white placeholder-gray-500 focus:border-white focus:ring-white"
                    }`}
                    placeholder="john@example.com"
                  />
                </div>

                <div>
                  <label
                    htmlFor="subject"
                    className={`block text-sm font-medium mb-2 ${
                      theme === "light" ? "text-gray-900" : "text-white"
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
                    className={`w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-offset-0 transition-all ${
                      theme === "light"
                        ? "bg-white border-gray-300 text-gray-900 placeholder-gray-400 focus:border-gray-900 focus:ring-gray-900"
                        : "bg-zinc-800 border-zinc-700 text-white placeholder-gray-500 focus:border-white focus:ring-white"
                    }`}
                    placeholder="Project Collaboration"
                  />
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className={`block text-sm font-medium mb-2 ${
                      theme === "light" ? "text-gray-900" : "text-white"
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
                    className={`w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-offset-0 transition-all resize-none ${
                      theme === "light"
                        ? "bg-white border-gray-300 text-gray-900 placeholder-gray-400 focus:border-gray-900 focus:ring-gray-900"
                        : "bg-zinc-800 border-zinc-700 text-white placeholder-gray-500 focus:border-white focus:ring-white"
                    }`}
                    placeholder="Tell me about your project or opportunity..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={formStatus === "sending"}
                  className={`w-full px-8 py-3 rounded-lg font-medium hover:scale-[1.02] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 ${
                    theme === "light"
                      ? "bg-gray-900 text-white hover:bg-gray-800"
                      : "bg-white text-black hover:bg-gray-100"
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
                      <span>→</span>
                    </>
                  )}
                </button>

                {formStatus === "success" && (
                  <div className="p-4 bg-green-50 border border-green-200 rounded-lg text-green-700 text-center">
                    ✓ Message sent successfully! I&apos;ll get back to you soon.
                  </div>
                )}

                {formStatus === "error" && (
                  <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-center">
                    × Something went wrong. Please try again or email me
                    directly.
                  </div>
                )}
              </form>
            </div>

            {/* Contact Info & Social Links */}
            <div className="space-y-6">
              {/* Contact Info Card */}
              <div
                className={`rounded-2xl p-8 border ${
                  theme === "light"
                    ? "bg-white border-gray-200"
                    : "bg-zinc-900 border-zinc-800"
                }`}
              >
                <h3
                  className={`text-2xl font-semibold mb-6 ${
                    theme === "light" ? "text-gray-900" : "text-white"
                  }`}
                >
                  Contact Information
                </h3>
                <div className="space-y-4">
                  {["bishwo9898@gmail.com", "bishwo.dallakoti@centre.edu"].map(
                    (contactEmail) => (
                      <a
                        key={contactEmail}
                        href={`mailto:${contactEmail}`}
                        className="flex items-center space-x-4 group"
                      >
                        <div
                          className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                            theme === "light" ? "bg-gray-100" : "bg-zinc-800"
                          }`}
                        >
                          <span className="text-xl">✉</span>
                        </div>
                        <div>
                          <div
                            className={`text-sm ${
                              theme === "light"
                                ? "text-gray-500"
                                : "text-gray-400"
                            }`}
                          >
                            Email
                          </div>
                          <div
                            className={`font-medium ${
                              theme === "light" ? "text-gray-900" : "text-white"
                            }`}
                          >
                            {contactEmail}
                          </div>
                        </div>
                      </a>
                    ),
                  )}
                </div>
              </div>

              {/* Quick Links Card */}
              <div
                className={`rounded-2xl p-8 border ${
                  theme === "light"
                    ? "bg-white border-gray-200"
                    : "bg-zinc-900 border-zinc-800"
                }`}
              >
                <h3
                  className={`text-2xl font-semibold mb-6 ${
                    theme === "light" ? "text-gray-900" : "text-white"
                  }`}
                >
                  Quick Links
                </h3>
                <div className="space-y-3">
                  <a
                    href="#"
                    className={`block px-4 py-3 rounded-lg text-center font-medium transition-all hover:scale-[1.02] ${
                      theme === "light"
                        ? "bg-gray-900 text-white hover:bg-gray-800"
                        : "bg-white text-black hover:bg-gray-100"
                    }`}
                  >
                    Download Resume 📄
                  </a>
                  <a
                    href="/blog"
                    className={`block px-4 py-3 rounded-lg text-center font-medium border transition-all hover:scale-[1.02] ${
                      theme === "light"
                        ? "border-gray-300 text-gray-900 hover:bg-gray-50"
                        : "border-zinc-700 text-white hover:bg-zinc-800"
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
        className={`py-8 px-6 text-center border-t ${
          theme === "light"
            ? "bg-white border-gray-200 text-gray-600"
            : "bg-black border-white/5 text-gray-400"
        }`}
      >
        <div className="max-w-6xl mx-auto">
          <p className="text-sm">
            © 2024 All rights reserved. Always learning, always building.
          </p>
        </div>
      </footer>
    </div>
  );
}
