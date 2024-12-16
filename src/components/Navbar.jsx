import { Link } from "react-router-dom";
import ToggleBtn from "./ToggleDarkBtn";
import MoodTabs from "./MoodTabs.jsx";
import { useState } from "react";

function Navbar({ setLanguage, lang, setIsDark }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="py-6 bg-white text-gray-900 dark:bg-[#232936] border-b border-gray-200 dark:border-gray-700 dark:text-white sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center px-4">
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold leading-tight tracking-tight">
          <Link to="/" className="hover:opacity-80 transition-opacity flex items-center gap-2">
            <span className="text-4xl">📚</span>
            <span className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
              {lang == "en" ? "Journal" : "يومياتي"}
            </span>
          </Link>
        </h1>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <svg
            className="w-6 h-6"
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

        {/* Desktop Menu */}
        <ul className={`${isMenuOpen ? 'flex flex-col absolute top-full left-0 right-0 bg-white dark:bg-[#232936] border-b border-gray-200 dark:border-gray-700 p-4 gap-4' : 'hidden'} md:flex md:relative md:flex-row md:items-center md:gap-4 md:p-0 md:border-none`}>
          <li>
            <div className="relative group">
              <select
                className="px-4 py-2 bg-gray-50 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300 outline-none appearance-none cursor-pointer w-full hover:border-blue-500 dark:hover:border-blue-400 transition-colors pr-10"
                value={lang}
                onChange={(e) => setLanguage(e.target.value)}
              >
                <option value="en" className="flex items-center gap-2">
                  🇺🇸 English
                </option>
                <option value="ar" className="flex items-center gap-2">
                  🇸🇦 عربي
                </option>
              </select>
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                <svg
                  className="w-4 h-4 text-gray-500 dark:text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
            </div>
          </li>
          <li>
            <ToggleBtn setIsDark={setIsDark} />
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;