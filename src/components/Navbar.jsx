import { Link, useLocation } from "react-router-dom";
import ToggleBtn from "./ToggleDarkBtn";
import MoodTabs from "./MoodTabs.jsx";
import { useState } from "react";

function Navbar({ setLanguage, lang, setIsDark }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { path: "/", icon: "📝", labelEn: "Notes", labelAr: "المذكرات" },
    { path: "/add", icon: "✍️", labelEn: "Add Note", labelAr: "إضافة مذكرة" },
    { path: "/pinned", icon: "📌", labelEn: "Pinned", labelAr: "المثبتة" },
    { path: "/statistics", icon: "📊", labelEn: "Statistics", labelAr: "إحصائيات" },
    { path: "/backup", icon: "💾", labelEn: "Backup", labelAr: "نسخ احتياطي" },
  ];

  return (
    <nav className="sticky top-0 py-4 bg-white text-gray-900 dark:bg-[#232936] border-b border-gray-200 dark:border-gray-700 dark:text-white z-50">
      <div className="container mx-auto flex justify-between items-center px-4">
        {/* Logo */}
        <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-extrabold leading-tight tracking-tight">
          <Link to="/" className="hover:opacity-80 transition-opacity flex items-center gap-2">
            <span className="text-2xl sm:text-3xl">📚</span>
            <span className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
              {lang == "en" ? "Journal" : "يومياتي"}
            </span>
          </Link>
        </h1>

        {/* Desktop Menu Items - Only visible on medium and larger screens */}
        <div className="hidden md:flex items-center gap-4">
          <button
            onClick={() => setLanguage(lang === "en" ? "ar" : "en")}
            className="lang-toggle px-2 py-1.5 bg-gray-50 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300 outline-none cursor-pointer hover:border-blue-500 dark:hover:border-blue-400 transition-colors flex items-center gap-2 text-sm whitespace-nowrap"
          >
            {lang === "en" ? "🇸🇦 عربي" : "🇺🇸 English"}
          </button>
          <div className="theme-toggle">
            <ToggleBtn setIsDark={setIsDark} />
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {isMenuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>

        {/* Mobile Menu - Only visible on small screens */}
        <div className={`${
          isMenuOpen 
            ? 'block fixed top-[65px] left-0 right-0 bg-white dark:bg-[#232936] border-b border-gray-200 dark:border-gray-700 shadow-lg max-h-[calc(100vh-65px)] overflow-y-auto' 
            : 'hidden'
        } md:hidden`}>
          <ul className="p-4 space-y-2">
            {navLinks.map((link) => (
              <li key={link.path}>
                <Link 
                  to={link.path} 
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors w-full
                    ${location.pathname === link.path 
                      ? 'bg-blue-500 text-white dark:bg-blue-600' 
                      : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                    }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.icon} {lang === "en" ? link.labelEn : link.labelAr}
                </Link>
              </li>
            ))}
            <li className="pt-2 border-t border-gray-200 dark:border-gray-700">
              <div className="flex flex-col gap-3">
                <button
                  onClick={() => {
                    setLanguage(lang === "en" ? "ar" : "en");
                    setIsMenuOpen(false);
                  }}
                  className="w-full px-4 py-2 bg-gray-50 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300 outline-none cursor-pointer hover:border-blue-500 dark:hover:border-blue-400 transition-colors flex items-center gap-2"
                >
                  {lang === "en" ? "🇸🇦 عربي" : "🇺🇸 English"}
                </button>
                <div className="px-4">
                  <ToggleBtn setIsDark={setIsDark} />
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;