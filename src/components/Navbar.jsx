import { Link } from "react-router-dom";
import ToggleBtn from "./ToggleDarkBtn";
import MoodTabs from "./MoodTabs.jsx";

function Navbar({ setLanguage, lang, setIsDark }) {
  return (
    <nav className="py-7 bg-white text-gray-900 dark:bg-[#232936] border-b border-gray-200 dark:border-gray-700 dark:text-white">
      <div className="container mx-auto flex justify-between items-center px-4">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-extrabold leading-tight tracking-tight">
          <Link to="/">📚 {lang == "en" ? "Journal" : " يوميات"}</Link>
        </h1>
        <ul className="flex items-center gap-2">
          <li>
            <select
              className="px-2 bg-gray-50 rounded-md py-2 bg-slate-150 border border-gray-400 dark:bg-slate-700 dark:text-slate-50 outline-none"
              value={lang}
              onChange={(e) => setLanguage(e.target.value)}
            >
              <option value="en">English</option>
              <option value="ar">عربي</option>
            </select>
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
